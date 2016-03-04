const config = require("../config.js"),
  Show = require("../models/Show"),
  util = require("../util");

/* TODO: Fix sort by trending. */
module.exports = {

  /* Get all the pages. */
  getShows: (req, res) => {
    return Show.count({}).exec().then((count) => {
      const pages = Math.round(count / config.pageSize);
      const docs = [];

      for (let i = 1; i < pages + 1; i++)
        docs.push("shows/" + i);

      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Get one page. */
  getPage: (req, res) => {
    const page = req.params.page - 1;
    const offset = page * config.pageSize;

    if (req.params.page === "all") {
      return Show.find({
        num_seasons: {
          $gt: 0
        }
      }).sort({
        title: -1
      }).exec().then((docs) => {
        return res.json(docs);
      }).catch((err) => {
        util.onError(err);
        return res.json(err);
      });
    } else {
      let query = {
        num_seasons: {
          $gt: 0
        }
      };
      const data = req.query;

      if (!data.order)
        data.order = -1;

      let sort = {
        "rating.votes": data.order,
        "rating.percentage": data.order
      };

      if (data.keywords) {
        const words = data.keywords.split(" ");
        let regex = data.keywords.toLowerCase();
        if (words.length > 1) {
          regex = "^";
          for (let w in words) {
            regex += "(?=.*\\b" + RegExp.escape(words[w].toLowerCase()) + "\\b)";
          }
          regex += ".+";
        }
        query = {
          title: new RegExp(regex, "gi"),
          num_seasons: {
            $gt: 0
          }
        };
      }

      if (data.sort) {
        if (data.sort === "year") sort = {
          year: data.order
        };
        if (data.sort === "updated") sort = {
          "episodes.first_aired": data.order
        };
        if (data.sort === "name") sort = {
          title: (data.order * -1)
        };
      }

      if (data.genre && data.genre != "All") {
        query = {
          genres: data.genre.toLowerCase(),
          num_seasons: {
            $gt: 0
          }
        }
      }

      return Show.find(query, {
        _id: 1,
        imdb_id: 1,
        tvdb_id: 1,
        title: 1,
        year: 1,
        images: 1,
        slug: 1,
        num_seasons: 1,
        last_updated: 1,
        rating: 1
      }).sort(sort).skip(offset).limit(config.pageSize).exec().then((docs) => {
        return res.json(docs);
      }).catch((err) => {
        util.onError(err);
        return res.json(err);
      });
    }
  },

  /* Get info from one show. */
  getShow: (req, res) => {
    return Show.find({
      imdb_id: req.params.id
    }).limit(1).exec().then((docs) => {
      if (Array.isArray(docs)) docs = docs[0];
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Search. */
  search: (req, res) => {
    const keywords = new RegExp(RegExp.escape(req.params.search.toLowerCase()), "gi");
    return Show.find({
      title: keywords,
      num_seasons: {
        $gt: 0
      }
    }).sort({
      title: -1
    }).limit(config.pageSize).exec().then((docs) => {
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Get search page. */
  searchPage: (req, res) => {
    const page = req.params.page - 1;
    const offset = page * config.pageSize;
    const keywords = new RegExp(RegExp.escape(req.params.search.toLowerCase()), "gi");

    return Show.find({
      title: keywords,
      num_seasons: {
        $gt: 0
      }
    }).sort({
      title: -1
    }).skip(offset).limit(config.pageSize).exec().then((docs) => {
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Get since pages. */
  getSince: (req, res) => {
    const since = req.params.since;
    if (req.query.full) {
      return Show.find({
        last_updated: {
          $gt: parseInt(since)
        },
        num_seasons: {
          $gt: 0
        }
      }).then((docs) => {
        return res.json(docs);
      }).catch((err) => {
        util.onError(err);
        return res.json(err);
      });
    } else {
      return Show.count({
        last_updated: {
          $gt: parseInt(since)
        },
        num_seasons: {
          $gt: 0
        }
      }).then((count) => {
        const pages = Math.round(count / config.pageSize);
        const docs = [];

        for (let i = 1; i < pages + 1; i++)
          docs.push("shows/update/" + since + "/" + i);

        return res.json(docs);
      }).catch((err) => {
        util.onError(err);
        return res.json(err);
      });
    }
  },

  /* Get a page, ordered by a date. */
  getSincePage: (req, res) => {
    const page = req.params.page - 1;
    const offset = page * config.pageSize;
    const since = req.params.since;

    return Show.find({
      last_updated: {
        $gt: parseInt(since)
      },
      num_seasons: {
        $gt: 0
      }
    }).sort({
      title: -1
    }).skip(offset).limit(config.pageSize).exec().then((docs) => {
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Get last updated pages. */
  getLastUpdated: (req, res) => {
    return Show.find({
      num_seasons: {
        $gt: 0
      }
    }).sort({
      last_updated: -1
    }).limit(config.pageSize).exec().then((docs) => {
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

  /* Get a page, ordered by last updated. */
  getLastUpdatedPage: (req, res) => {
    const page = req.params.page - 1;
    const offset = page * config.pageSize;

    return Show.find({
      num_seasons: {
        $gt: 0
      }
    }).sort({
      last_updated: -1
    }).skip(offset).limit(config.pageSize).exec().then((docs) => {
      return res.json(docs);
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  }

};
