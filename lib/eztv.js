const cheerio = require("cheerio"),
  Q = require("q"),
  config = require("../config");

const BASE_URL = "https://eztv.ag/",
  SHOWLIST = "showlist/",
  SHOWS = "shows/";
let request = require("request");
request = request.defaults({
  "baseUrl": BASE_URL,
  "timeout": config.webRequestTimeout * 1000
});

module.exports = {

  /* Get all the shows from eztv. */
  getAllShows: () => {
    const defer = Q.defer();
    request(SHOWLIST, (err, res, body) => {
      if (err) {
        defer.reject(err + " with link: '" + SHOWLIST + "'");
      } else if (!body || res.statusCode >= 400) {
        defer.reject("EZTV: Could not load link: '" + SHOWLIST + "'");
      } else {
        const $ = cheerio.load(body);

        const allShows = [];
        $(".thread_link").each(function() {
          const show = $(this).text();
          const id = $(this).attr("href").match(/\/shows\/(.*)\/(.*)\//)[1];
          let slug = $(this).attr("href").match(/\/shows\/(.*)\/(.*)\//)[2];
          slug = slug in config.eztvMap ? config.eztvMap[slug] : slug;
          allShows.push({
            show: show,
            id: id,
            slug: slug
          });
        });
        defer.resolve(allShows);
      }
    });
    return defer.promise;
  },

  /* Gets the imdb id from a given eztv show. */
  getShowDetails: (data) => {
    const defer = Q.defer();
    request(SHOWS + data.id + "/" + data.slug + "/", (err, res, body) => {
      if (err) {
        defer.reject(err + " with link: '" + SHOWS + "'");
      } else if (!body || res.statusCode >= 400) {
        defer.reject("EZTV: Could not find imdb for: '" + data.slug + "'");
      } else {
        const $ = cheerio.load(body);
        let imdb = $("div[itemtype='http://schema.org/AggregateRating']").find("a[target='_blank']").attr("href")
        if (imdb) {
          imdb = imdb.match(/\/title\/(.*)\//)[1];
          defer.resolve(imdb);
        } else {
          defer.reject("EZTV: Could not find imdb for: '" + data.slug + "'");
        }
      }
    });
    return defer.promise;
  },

  /* Get all the episodes from a given eztv show. */
  getAllEpisodes: (data) => {
    const defer = Q.defer();
    request(SHOWS + data.id + "/" + data.slug + "/", (err, res, body) => {
      if (err) {
        defer.reject(err + " with link: '" + SHOWS + data.id + "/" + data.slug + "/'");
      } else if (!body || res.statusCode >= 400) {
        defer.reject("EZTV: Could not find episodes for: '" + data.slug + "'");
      } else {
        const $ = cheerio.load(body);

        const episodes = {};
        $("tr.forum_header_border[name='hover']").each(function() {
          const title = $(this).children("td").eq(1).text().replace("x264", "");
          const link = $(this).children("td").eq(2).children("a");

          const magnet = $(this).children("td").eq(2).children("a.magnet").first().attr("href");
          if (magnet === null) return true;

          const seasonBased = /S?0*(\d+)?[xE]0*(\d+)/;
          const dateBased = /(\d{4}).(\d{2}.\d{2})/;
          const vtv = /(\d{1,2})[x](\d{2})/;
          const quality = title.match(/(\d{3,4})p/) ? title.match(/(\d{3,4})p/)[0] : "480p";

          let season, episode;
          const torrent = {
            url: magnet,
            seeds: 0,
            peers: 0,
            provider: "EZTV"
          };

          if (title.match(seasonBased) || title.match(vtv)) {
            season = parseInt(title.match(seasonBased)[1], 10);
            episode = parseInt(title.match(seasonBased)[2], 10);
            episodes.dateBased = false;
          } else if (title.match(dateBased)) {
            season = title.match(dateBased)[1];
            episode = title.match(dateBased)[2].replace(/\s/g, "-");
            episodes.dateBased = true;
          } else {
            defer.reject("EZTV: Could not find episodes for: '" + data.slug + "'");
          }

          if (season && episode) {
            if (!episodes[season]) episodes[season] = {};
            if (!episodes[season][episode]) episodes[season][episode] = {};
            if (!episodes[season][episode][quality] || title.toLowerCase().indexOf("repack") > -1)
              episodes[season][episode][quality] = torrent;
          }
        });
        defer.resolve(episodes);
      }
    });
    return defer.promise;
  }

};
