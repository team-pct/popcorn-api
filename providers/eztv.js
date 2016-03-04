const async = require("async-q"),
  eztv = require("../lib/eztv"),
  config = require("../config"),
  util = require("../util");
let helper;

/* Get a complete show. */
const getShow = function*(eztvShow) {
  if (eztvShow) {
    const imdb = yield eztv.getShowDetails(eztvShow);
    const newShow = yield helper.getTraktInfo(imdb);
    const episodes = yield eztv.getAllEpisodes(eztvShow);

    if (typeof(newShow) !== "undefined" && newShow._id && !episodes.dateBased) {
      delete episodes.dateBased;
      delete episodes[0];
      newShow.num_seasons = Object.keys(episodes).length;
      return yield helper.addEpisodes(newShow, episodes, eztvShow.slug);
    }
  }
};

const EZTV = (_name) => {

  const name = _name;
  helper = require("./helper")(name);

  return {

    name: name,

    /* Returns a list of all the inserted torrents. */
    search: function*() {
      console.log(name + ": Starting scraping...");
      const eztvShows = yield eztv.getAllShows();
      console.log(name + ": Found " + eztvShows.length + " shows.");
      return yield async.mapLimit(eztvShows, config.maxWebRequest, (eztvShow) => {
        return util.spawn(getShow(eztvShow)).catch((err) => {
          util.onError(err);
          return err;
        });
      });
    }

  };

};

module.exports = EZTV;
