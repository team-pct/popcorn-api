const fs = require("fs"),
  config = require("./config");

module.exports = {

  /* Error logger function. */
  onError: (errorMessage) => {
    fs.appendFile(config.tempDir + "/" + config.errorLog, errorMessage + "\n");
    console.error(errorMessage);
    return new Error(errorMessage);
  },

  /* Updates the 'lastUpdated' file. */
  setlastUpdate: () => {
    fs.writeFile(config.tempDir + "/" + config.updatedFile, JSON.stringify({
      lastUpdated: Math.floor(new Date().getTime() / 1000)
    }), (err) => {});
  },

  /* Updates the 'status' file. */
  setStatus: (status) => {
    fs.writeFile(config.tempDir + "/" + config.statusFile, JSON.stringify({
      "status": status
    }), (err) => {});
  },

  /* Function for resolving generators. */
  spawn: (generator) => {
    return new Promise((resolve, reject) => {
      let onResult = (lastPromiseResult) => {
        let {
          value, done
        } = generator.next(lastPromiseResult);
        if (!done) {
          value.then(onResult, reject)
        } else {
          resolve(value);
        }
      };
      onResult();
    });
  }

};
