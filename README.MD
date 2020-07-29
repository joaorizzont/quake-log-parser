# Quake Log Parser

### How to Use

<p>After run yarn install</p>

- "yarn dev": run server with ts-node-dev (Typescript)
- "yarn start": run builded server  (Javasrcript)
- "yarn test": run tests


### Endpoints

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
 