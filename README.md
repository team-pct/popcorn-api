# TV Series API
An Objectivly better TV series API for Popcorn Time.

# Installation
1. Install MongoDB
2. Install NodeJS
3. install dependencies `cd tvseries-api` and `npm install`
4. Start the API with `npm start` or `node --harmony --armony_destructuring --use_strict index.js`

# Example output

```
{
  "_id": "tt0898266",
  "imdb_id": "tt0898266",
  "tvdb_id": "80379",
  "title": "The Big Bang Theory",
  "year": "2007",
  "slug": "the-big-bang-theory",
  "synopsis": "What happens when hyperintelligent roommates Sheldon and Leonard meet Penny, a free-spirited beauty moving in next door, and realize they know next to nothing about life outside of the lab. Rounding out the crew are the smarmy Wolowitz, who thinks he's as sexy as he is brainy, and Koothrappali, who suffers from an inability to speak in the presence of a woman.",
  "runtime": "18",
  "rating": {
    "hated": ​100,
    "loved": ​100,
    "votes": ​34059,
    "percentage": ​85
  },
  "country": "us",
  "network": "CBS",
  "air_day": "Thursday",
  "air_time": "20:00",
  "status": "returning series",
  "num_seasons": ​2,
  "last_updated": ​1456869026477,
  "images": {
    "fanart": "https://walter.trakt.us/images/shows/000/001/409/fanarts/original/cff0b01ee7.jpg",
    "poster": "https://walter.trakt.us/images/shows/000/001/409/posters/original/8adfe77938.jpg",
    "banner": "https://walter.trakt.us/images/shows/000/001/409/banners/original/cfd96bef0d.jpg"
  },
  "__v": ​0,
  "episodes": [{
    "tvdb_id": ​5248007,
    "season": ​9,
    "episode": ​1,
    "title": "The Matrimonial Momentum",
    "overview": "Sheldon is confronted by a mystery of the universe he cannot unravel: when a woman wants time apart to think, exactly how much time does that mean, and is there any way to hurry the process along? In Las Vegas, Penny and Leonard march closer to marching down the aisle, but has Penny gotten over Leonard’s infidelity? And if so, will he do anything to un-get her over it?\n",
    "date_based": false,
    "first_aired": ​1442880000,
    "watched": {
      "watched": false
    },
    "torrents": {
      "0": {
        "url": "magnet:?xt=urn:btih:3139040B4287FE6DD2B3FC0A8684BC623261F381&dn=the+big+bang+theory+s09e01+hdtv+x264+lol+ettv&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce",
        "seeds": ​1509,
        "peers": ​1819,
        "provider": "LOL_ETTV"
      },
      "480p": {
        "url": "magnet:?xt=urn:btih:3139040B4287FE6DD2B3FC0A8684BC623261F381&dn=the+big+bang+theory+s09e01+hdtv+x264+lol+ettv&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce",
        "seeds": ​1509,
        "peers": ​1819,
        "provider": "LOL_ETTV"
      }
    }
  },
  ...
 ],
  "genres": [
    "comedy"
  ]
}
```

# Known Issues
The issues are listed in the code with a 'TODO'.
- In the client, sorting my trending (Go ask the .sh developers).
- Kat scraping gets stuck if kat.cr times out at getting the 'totalPages'.

# Versioning
For transparency and insight into our release cycle, and for striving to maintain backward compatibility, this project will be maintained according to the [Semantic Versioning](http://semver.org/) guidelines as much as possible.

Releases will be numbered with the following format: `<major>.<minor>.<patch>-<build>`

Constructed with the following guidelines:
- A new _major_ release indicates a large change where backwards compatibility is broken.
- A new _minor_ release indicates a normal change that maintains backwards compatibility.
- A new _patch_ release indicates a bugfix or small change which does not affect compatibility.
- A new _build_ release indicates this is a pre-release of the version.

# License
If you distribute a copy or make a fork of the project, you have to credit this project as source. This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/) .

--------------------------------------------------------------------------------

**This project and the distribution of this project is not illegal, nor does it violate _any_ DMCA laws. The use of this project, however, may be illegal in your area. Check your local laws and regulations regarding the use of torrents to watch potentially copyrighted content. The maintainers of this project do not condone the use of this project for anything illegal, in any state, region, country, or planet. _Please use at your own risk_.**

--------------------------------------------------------------------------------

Copyright (c) 2016 - TV Series API - Released under the [GPL v3 license](LICENSE.txt).
