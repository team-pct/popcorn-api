const config = {
  master: true,
  port: 5000,
  workers: 2,
  scrapeTime: "0 0 */6 * * *",
  pageSize: 50,
  serverName: "serv01",
  tempDir: "./tmp",
  errorLog: "tvseries-api.log",
  statusFile: "status.json",
  updatedFile: "lastUpdated.json",
  dbHosts: [
    "localhost"
  ],
  maxWebRequest: 2,
  webRequestTimeout: 2,
  traktKey: "70c43f8f4c0de74a33ac1e66b6067f11d14ad13e33cd4ebd08860ba8be014907",
  katMap: {
    "american-crime": "american-crime-1969",
    "bachelor-live": "the-bachelor-live",
    "ballers-2015": "ballers",
    "big-brother-us": "big-brother-2000",
    "blackish": "black-ish",
    "bobs-burgers": "bob-s-burgers",
    "bordertown-2015": "bordertown-2016",
    "celebrity-big-brother": "celebrity-big-brother-2001",
    "chicago-pd": "chicago-p-d",
    "childrens-hospital-us": "childrens-hospital",
    "cooper-barretts-guide-to-surviving-life": "cooper-barrett-s-guide-to-surviving-life-2016",
    "cosmos-a-space-time-odyssey": "cosmos-a-spacetime-odyssey",
    "dcs-legends-of-tomorrow": "dc-s-legends-of-tomorrow",
    "doll-and-em": "doll-em",
    "gold-rush": "gold-rush-2010",
    "greys-anatomy": "grey-s-anatomy",
    "hawaii-five-0-2010": "hawaii-five-0",
    "heartland-ca": "heartland-2007-ca",
    "hells-kitchen-us": "hell-s-kitchen-2005",
    "how-its-made-dream-cars": "how-it-s-made-dream-cars",
    "how-its-made": "how-it-s-made",
    "its-always-sunny-in-philadelphia": "it-s-always-sunny-in-philadelphia",
    "james-mays-cars-of-the-people": "james-may-s-cars-of-the-people",
    "jericho-2016": "jericho-1969",
    "last-man-standing-us": "last-man-standing-2011",
    "law-and-order-svu": "law-order-special-victims-unit",
    "marvels-agent-carter": "marvel-s-agent-carter",
    "marvels-agents-of-s-h-i-e-l-d": "marvel-s-agents-of-s-h-i-e-l-d",
    "marvels-daredevil": "marvel-s-daredevil",
    "marvels-jessica-jones": "marvel-s-jessica-jones",
    "mike-and-molly": "mike-molly",
    "power-2014": "power",
    "prey-uk": "prey-2014",
    "rush-us": "rush-2014",
    "satisfaction-us": "satisfaction-2014",
    "scandal-us": "scandal",
    "schitts-creek": "schitt-s-creek",
    "second-chance": "second-chance-2016",
    "stan-lees-lucky-man": "stan-lee-s-lucky-man",
    "survivors-remorse": "survivor-s-remorse",
    "teen-wolf": "teen-wolf-2011",
    "the-kennedys-uk": "the-kennedys-2015",
    "the-league": "the-league-2009",
    "the-librarians-us": "the-librarians-2014",
    "the-magicians-us": "the-magicians",
    "this-is-england-90": "this-is-england-90-2015",
    "whose-line-is-it-anyway-us": "whose-line-is-it-anyway-1998",
    "young-and-hungry": "young-hungry",
    "youre-the-worst-2014": "you-re-the-worst",
    "youre-the-worst": "you-re-the-worst",
  },
  eztvMap: {
    "10-oclock-live": "10-o-clock-live",
    "battlestar-galactica": "battlestar-galactica-2003",
    "black-box": "the-black-box",
    "brooklyn-nine-nine": "brooklyn-ninenine",
    "cracked": "cracked-2013",
    "golden-boy": "golden-boy-2013",
    "hank": "hank-2009",
    "hawaii-five-0-2010": "hawaii-fiveo-2010",
    "legit": "legit-2013",
    "louie": "louie-2010",
    "marvels-agent-carter": "marvel-s-agent-carter",
    "marvels-agents-of-shield": "marvel-s-agents-of-s-h-i-e-l-d",
    "marvels-avengers-assemble": "marvel-s-avengers-assemble",
    "marvels-daredevil": "marvel-s-daredevil",
    "marvels-guardians-of-the-galaxy": "marvel-s-guardians-of-the-galaxy",
    "power-2014": "power",
    "reign": "reign-2013",
    "resurrection-us": "resurrection",
    "scandal-us": "scandal-2012",
    "the-fosters": "the-fosters-2013",
    "the-goldbergs": "the-goldbergs-2013",
    "the-good-guys": "the-good-guys-2010",
    "the-killing": "the-killing-us",
    "the-office": "the-office-us",
    "vikings-us": "vikings"
  },
  providers: [{
    name: "LOL_ETTV",
    query: {
      query: "LOL",
      uploader: "ettv"
    }
  }, {
    name: "LOL_EZTV",
    query: {
      query: "LOL",
      uploader: "eztv"
    }
  }, {
    name: "KILLERS_ETTV",
    query: {
      query: "KILLERS",
      uploader: "ettv"
    }
  }, {
    name: "KILLERS_RARTV",
    query: {
      query: "KILLERS",
      uploader: "z0n321"
    }
  }, {
    name: "2HD_ETTV",
    query: {
      query: "2HD",
      uploader: "ettv"
    }
  }, {
    name: "2HD_EZTV",
    query: {
      query: "2HD",
      uploader: "eztv"
    }
  }, {
    name: "Brasse0",
    query: {
      uploader: "brasse0"
    }
  }, {
    name: "ETHD",
    query: {
      uploader: "ethd"
    }
  }, {
    name: "Thhaque",
    query: {
      uploader: "Thhaque"
    }
  }, {
    name: "FUM",
    query: {
      query: "FUM"
    }
  }, {
    name: "CRiMSON",
    query: {
      query: "CRiMSON"
    }
  }, {
    name: "DHD",
    query: {
      query: "DHD"
    }
  }, {
    name: "BAJSKORV",
    query: {
      query: "BAJSKORV"
    }
  }, {
    name: "TLA",
    query: {
      query: "TLA"
    }
  }, {
    name: "RiVER",
    query: {
      query: "RiVER"
    }
  }, {
    name: "BATV",
    query: {
      query: "BATV"
    }
  }, {
    name: "VTV",
    query: {
      uploader: "VTV"
    }
  }]
};

module.exports = config;
