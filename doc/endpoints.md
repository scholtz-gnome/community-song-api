# SONGS

## songsRouter

- GET /songs -> `getSongs` read ALL SONGS
- GET /songs/:id -> `getSong` read ONE SONG
- POST /songs -> `postSong` create ONE SONG
- PATCH /songs/:id -> `patchSong` update ONE SONG
- DELETE /songs/:id -> `deleteSong` delete ONE SONG

## songsFilesRouter

- GET /songs/:id/files -> `getSongsFiles` read ALL FILES of ONE SONG
- POST /songs/:id/files -> `postSongsFiles` create ONE FILE of ONE SONG

## songsFileCollectionsRouter

- POST /songs/:id/file-collections -> `postSongsFileCollections` create ONE FILE-COLLECTION of ONE SONG

## songsFileCollectionRouter

- PATCH /songs/:id/file-collection -> `patchSongsFileCollection` update ONE FILE-COLLECTION of ONE SONG
- DELETE /songs/:id/file-collection -> `deleteSongsFileCollection` delete ONE FILE-COLLECTION of ONE SONG

# FILES

## filesRouter

- GET /files/:id -> `getFile` read ONE FILE
- PUT /files/:id -> `putFile` replace ONE FILE
- DELETE /files/:id -> `deleteFile` delete ONE FILE

# COMMUNITIES

## communitiesRouter

- GET /communities -> `getCommunities` read ALL COMMUNITIES
- GET /communities/:id -> `getCommunity` read ONE COMMUNITY
- POST /communities -> `postCommunity` create ONE COMMUNITY
- PATCH /communities/:id -> `patchCommunity` update ONE COMMUNITY
- DELETE /communities/:id -> `deleteCommunity` delete ONE COMMUNITY

## communitiesSongsRouter

- GET /communities/:id/songs -> `getCommunitySongs` read ALL SONGS of ONE COMMUNITY

## communitiesUsersRouter

- GET /communities/:id/users -> `getCommunityUsers` read ALL USERS of ONE COMMUNITY

# USERS

## usersRouter

- GET /users/:id -> `getUser`
- GET /users/login/local -> `getLocalLogin`
- GET /users/login/google -> `getGoogleLogin`
- GET /users/login/facebook -> `getFacebookLogin`
- PATCH /users/:id -> `patchUser`
- DELETE /users/:id -> `deleteUser`

## usersProfileRouter

- GET /users/:id/verify -> `getUserVerification`
- GET /users/:id/logout -> `getUserLogout`
- GET /users/:id/settings -> `getUserSettings`
- PATCH /users/:id/settings -> `patchUserSettings`
- GET /users/:id/songs -> `getUserSongs`
- GET /users/:id/communities -> `getUserCommunities`
