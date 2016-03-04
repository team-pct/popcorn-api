"use strict";

const app = require("express")(),
  cluster = require("cluster"),
  CronJob = require("cron").CronJob,
  cpuCount = require("os").cpus().length,
  domain = require("domain"),
  fs = require("fs"),
  config = require("./config"),
  scraper = require("./scraper"),
  util = require("./util");

require("./setup.js")(config, app);
require("./routes.js")(app);

/* Initiates the cronjob. */
const initCron = () => {
  try {
    const job = new CronJob({
      cronTime: config.scrapeTime,
      onTick: () => {
        scraper.scrape();
      },
      onComplete: () => {
        utils.setStatus("Idle");
      },
      start: true,
      timeZone: "America/Los_Angeles"
    });
    console.log("Cron job started");
  } catch (ex) {
    util.onError("Cron pattern not valid");
  }
  scraper.scrape();
};

if (cluster.isMaster) {
  for (let i = 0; i < Math.min(cpuCount, config.workers); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    util.onError("Worker '" + worker.process.pid + "' died, spinning up another!");
    cluster.fork();
  });

  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir);
  }

  util.setStatus("Starting up");

  if (config.master) {
    const scope = domain.create();
    scope.run(() => {
      initCron();
    });
    scope.on("error", (err) => {
      util.onError(err);
    });
  }
} else {
  app.listen(config.port);
}
