const fs = require("fs"),
  config = require("../config"),
  Show = require("../models/Show"),
  util = require("../util");

module.exports = {

  /* Display server info. */
  getIndex: (req, res) => {
    const lastUpdatedJSON = JSON.parse(fs.readFileSync(config.tempDir + "/" + config.updatedFile, "utf8")),
      packageJSON = JSON.parse(fs.readFileSync("package.json", "utf8")),
      statusJSON = JSON.parse(fs.readFileSync(config.tempDir + "/" + config.statusFile, "utf8"));

    return Show.count({}).then((count) => {
      return res.json({
        server: config.serverName,
        status: statusJSON.status != null ? statusJSON.status : "Idle",
        totalShows: count,
        updated: lastUpdatedJSON.lastUpdated != null ? lastUpdatedJSON.lastUpdated : "Unknown",
        uptime: process.uptime() | 0,
        version: packageJSON.version != null ? packageJSON.version : "Unknown"
      });
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },

};
