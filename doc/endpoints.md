# SONGS

## songsRouter

- GET /songs -> `getSongs`
- GET /songs/:id -> `getSong`
- POST /songs -> `postSong`
- PATCH /songs/:id -> `patchSong`
- DELETE /songs/:id -> `deleteSong`

## songsFilesRouter

- GET /songs/:id/files -> `getSongFiles`
- DELETE /songs/:id/files -> `deleteSongFiles`

## songsFileCollectionRouter

- POST /songs/:id/file-collection -> `postSongsFileCollection`

# FILES

## filesRouter

- GET /files/:id -> `getFile`
- POST /files -> `postFile`
- PUT /files/:id -> `putFile`
- DELETE /files/:id -> `deleteFile`

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
