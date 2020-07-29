# Quake Log Parser

## How it work

This program uses a <b>.log</b> file create by [Quake game](https://github.com/id-Software/Quake-III-Arena) and <b>Regex</b> to read and create a object with datails of matches.

<p>Regex used to identify line with informations of match:</p>

- "/InitGame:/g"  - <b>Used to identify a new macth</b>: '20:37 InitGame: \sv_floodProtect\1\sv_maxPing\0\sv_minPing...'
- "/Kill:/g"  - <b>Used to identify line of kills informations</b> - '23:06 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT' 
- "/ShutdownGame:/g"  - <b>Used to identify end macth</b>  - '26:00 ShutdownGame:'
- "/ClientUserinfoChanged:/g" - <b>Used to identify new players on server</b> -  '20:38 ClientUserinfoChanged: 2 n\Isgalamido\t\0\model\...'

from that, on ClientUserinfoChanged and Kill match, new regex is used to separate informations:

- "ClientUserinfoChanged": <b>/n\\(.*)\\t\\/g</b> - Get player name who entered
- "Kill": <b>/([0-9]+) ([0-9]+) ([0-9]+): (.*) killed (.*) by (.*)/g</b> - Separe the killer, the dead and the reason of death

## How to Use

<p>After run yarn install</p>

- "yarn dev": run server with ts-node-dev (Typescript)
- "yarn start": run builded server  (Javasrcript)
- "yarn test": run tests

After run server, a .txt file is generate with the log parsed on path /src/assets/parsed.txt and show result on console.

## Endpoints

#### (GET) `/:game-id` 

Entry: 
- "game-id": game id to search. ex: game-1


Return

 ```js
 {
 "total_kills": number,
  "players": <string>[],
  "kills": <kills>{},
  "kills_by_means": <killsByMeans>{}
 }
 ```
 
 "< kills >" is like:
 ```js
 {
"playerName": number
}
```

 "< killsByMeans >" is like:
 ```js
 {
 "meanOfDeath": number
 }
 
