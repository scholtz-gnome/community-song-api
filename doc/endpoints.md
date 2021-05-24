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

- GET /communities -> `getCommunities`
- GET /communities/:id -> `getCommunity`
- POST /communities -> `postCommunity`
- PATCH /communities/:id -> `patchCommunity`
- DELETE /communities/:id -> `deleteCommunity`

## communitiesSongsRouter

- GET /communities/:id/songs -> `getCommunitySongs`

## communitiesUsersRouter

- GET /communities/:id/users -> `getCommunityUsers`

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
