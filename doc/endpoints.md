# SONGS

GET /songs -> getSongs
GET /songs/:id -> getSong
POST /songs -> postSong
PATCH /songs/:id -> patchSong
DELETE /songs/:id -> deleteSong

---

GET /songs/:id/files -> getSongFiles
DELETE /songs/:id/files -> deleteSongFiles
========================

# FILES

GET /files/:id -> getFile
POST /files -> postFile
PATCH /files/:id -> patchFile
DELETE /files/:id -> deleteFile
========================

# COMMUNITIES

GET /communities -> getCommunities
GET /communities/:id -> getCommunity
POST /communities -> postCommunity
PATCH /communities/:id -> patchCommunity
DELETE /communities/:id -> deleteCommunity

---

GET /communities/:id/songs -> getCommunitySongs
GET /communities/:id/users -> getCommunityUsers
========================

# USERS

GET /users/:id -> getUser
GET /users/login/local -> getLocalLogin
GET /users/login/google -> getGoogleLogin
GET /users/login/facebook -> getFacebookLogin
PATCH /users/:id -> patchUser
DELETE /users/:id -> deleteUser

---

GET /users/:id/verify -> getUserVerification
GET /users/:id/logout -> getUserLogout
GET /users/:id/settings -> getUserSettings
PATCH /users/:id/settings -> patchUserSettings
GET /users/:id/songs -> getUserSongs
GET /users/:id -> getUserCommunities
