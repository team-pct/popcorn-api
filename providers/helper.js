const async = require("async-q"),
  Show = require("../models/Show"),
  trakt = require("../lib/trakt"),
  util = require("../util");
let name;

/* Update a given show (doc) with it's associated episodes. */
const updateEpisodes = function*(doc) {
  const found = yield Show.findOne({
    _id: doc._id
  }).exec();
  if (found) {
    console.log(name + ": '" + found.title + "' is an existing show.");
    for (let i = 0; i < doc.episodes.length; i++) {
      let matching = found.episodes.filter((foundEpisode) => {
        return foundEpisode.season === doc.episodes[i].season && foundEpisode.episode === doc.episodes[i].episode
      });

      if (matching.length != 0) {
        let index = found.episodes.indexOf(matching[0]);
        if (!matching[0][doc.episodes[i].season]) matching[0][doc.episodes[i].season] = {};
        if (!matching[0][doc.episodes[i].season][doc.episodes[i].episode]) matching[0][doc.episodes[i].season][doc.episodes[i].episode] = {};

        if ((!matching[0].torrents["480p"] && doc.episodes[i].torrents["480p"]) || (matching[0].torrents["480p"] && doc.episodes[i].torrents["480p"] && matching[0].torrents["480p"].seeds < doc.episodes[i].torrents["480p"].seeds)) {
          matching[0].torrents["480p"] = doc.episodes[i].torrents["480p"];
          matching[0].torrents["0"] = doc.episodes[i].torrents["480p"];
        }
        if ((!matching[0].torrents["720p"] && doc.episodes[i].torrents["720p"]) || (matching[0].torrents["720p"] && doc.episodes[i].torrents["720p"] && matching[0].torrents["720p"].seeds < doc.episodes[i].torrents["720p"].seeds)) {
          matching[0].torrents["720p"] = doc.episodes[i].torrents["720p"];
        }
        if ((!matching[0].torrents["1080p"] && doc.episodes[i].torrents["1080p"]) || (matching[0].torrents["1080p"] && doc.episodes[i].torrents["1080p"] && matching[0].torrents["1080p"].seeds < doc.episodes[i].torrents["1080p"].seeds)) {
          matching[0].torrents["1080p"] = doc.episodes[i].torrents["1080p"];
        }

        found.episodes.splice(index, 1, matching[0]);
      } else {
        found.episodes.push(doc.episodes[i]);
      }
    }

    const saved = yield found.save();
    const distinct = yield Show.distinct("episodes.season", {
      _id: saved._id
    }).exec();
    saved.num_seasons = distinct.length;
    return yield saved.save();
  } else {
    console.log(name + ": '" + doc.title + "' is a new show!");
    return yield new Show(doc).save();
  }
};

/* Adds one season to a show. */
const addSeason = function*(doc, episodes, season_no, slug) {
  season_no = parseInt(season_no);
  if (!isNaN(season_no)) {
    const season = yield trakt.getSeason(slug, season_no)
    for (let episode_data in season) {
      episode_data = season[episode_data];
      if (typeof(episodes[season_no]) !== "undefined" && typeof(episodes[season_no][episode_data.number]) !== "undefined") {
        const episode = {
          tvdb_id: episode_data.ids["tvdb"],
          season: episode_data.season,
          episode: episode_data.number,
          title: episode_data.title,
          overview: episode_data.overview,
          date_based: false,
          first_aired: new Date(episode_data.first_aired).getTime() / 1000.0,
          watched: {
            watched: false
          },
          torrents: []
        };

        episode.torrents = episodes[season_no][episode_data.number];
        episode.torrents[0] = episodes[season_no][episode_data.number]["480p"] ? episodes[season_no][episode_data.number]["480p"] : episodes[season_no][episode_data.number]["720p"]; // Prevents breaking the app
        doc.episodes.push(episode);
      }
    }
  }
};

const Helper = (_name) => {

  name = _name;

  return {

    /* Adds episodes to a document. */
    addEpisodes: (show, episodes, slug) => {
      return async.each(Object.keys(episodes), (seasonNumber) => {
        return util.spawn(addSeason(show, episodes, seasonNumber, slug));
      }).then((value) => {
        return util.spawn(updateEpisodes(show));
      });
    },

    /* Get info from Trakt and make a new show object. */
    getTraktInfo: (slug) => {
      return trakt.getShow(slug).then((traktShow) => {
        if (traktShow.ids["imdb"]) {
          return {
            _id: traktShow.ids["imdb"],
            imdb_id: traktShow.ids["imdb"],
            tvdb_id: traktShow.ids["tvdb"],
            title: traktShow.title,
            year: traktShow.year,
            slug: slug,
            synopsis: traktShow.overview,
            runtime: traktShow.runtime,
            rating: {
              hated: 100,
              loved: 100,
              votes: traktShow.votes,
              percentage: Math.round(traktShow.rating * 10)
            },
            country: traktShow.country,
            network: traktShow.network,
            air_day: traktShow.airs.day,
            air_time: traktShow.airs.time,
            status: traktShow.status,
            num_seasons: 0,
            last_updated: Number(new Date()),
            images: {
              /* TODO: have the failed image on localhost. */
              fanart: traktShow.images.fanart.full != null ? traktShow.images.fanart.full : "https://raw.githubusercontent.com/PTCE-Public/popcorn-desktop/master/src/app/images/posterholder.png",
              poster: traktShow.images.poster.full != null ? traktShow.images.poster.full : "https://raw.githubusercontent.com/PTCE-Public/popcorn-desktop/master/src/app/images/posterholder.png",
              banner: traktShow.images.banner.full != null ? traktShow.images.banner.full : "https://raw.githubusercontent.com/PTCE-Public/popcorn-desktop/master/src/app/images/posterholder.png"
            },
            genres: traktShow.genres.length != 0 ? traktShow.genres : ["Unknown"],
            episodes: []
          }
        }
      });
    }

  };

};

module.exports = Helper;
