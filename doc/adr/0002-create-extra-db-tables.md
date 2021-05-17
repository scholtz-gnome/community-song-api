# 2. Create extra DB tables

Date: 2021-05-17

## Status

Accepted

## Context

No tables exist for communities, songs or the relationships that exist between songs/files and users/communities.

## Decision

We will create four tables in the database: song, community, song_file and user_community.

## Consequences

The API will now be able to assign routes and controllers that relate more simply to their respective resources.
