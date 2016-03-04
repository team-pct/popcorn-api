const Q = require("q"),
  config = require("../config");

const BASE_URL = "https://api-v2launch.trakt.tv/";
let request = require("request");
request = request.defaults({
  "headers": {
    "Content-Type": "application/json",
    "trakt-api-version": 2,
    "trakt-api-key": config.traktKey
  },
  "baseUrl": BASE_URL,
  "timeout": config.webRequestTimeout * 1000
});

module.exports = {

  /* Get a single show. */
  getShow: (slug) => {
    const defer = Q.defer();
    request("shows/" + slug + "?extended=full,images", (err, res, body) => {
      if (err) {
        defer.reject(err + " with link: 'shows/" + slug + "?extended=full,images'");
      } else if (!body || res.statusCode >= 400) {
        defer.reject("Trakt: Could not find info on show: '" + slug + "'");
      } else {
        defer.resolve(JSON.parse(body));
      }
    });
    return defer.promise;
  },

  /* Get a single season of a show. */
  getSeason: (slug, season) => {
    const defer = Q.defer();
    request("shows/" + slug + "/seasons/" + season + "/?extended=full,images", (err, res, body) => {
      if (err) {
        defer.reject(err + " with link: 'shows/" + slug + "/seasons/" + season + "/?extended=full,images'");
      } else if (!body || res.statusCode >= 400) {
        defer.reject("Trakt: Could not find info on show: '" + slug + "', season: '" + season + "'");
      } else {
        defer.resolve(JSON.parse(body));
      }
    });
    return defer.promise;
  }

};
