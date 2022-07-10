1. You need to copy yourself or download the archive with this repository and follow the installation instructions described in the reame of this repository https://github.com/rolling-scopes-school/node-graphql-service
2. Download the archive or clone the current repository for yourself
3. install dependencies with the command ``npm install ``
4. run graphql service with the command ``npm run start:dev``
5. the service is started by default on port 3222 from the .env file, but you can change it if you want
6. with the condition that the port is in the file .env has not changed, then we can go to the graphql workspace of the service by following the link http://localhost:3222/graphql
7. all available mutations and query can be viewed at the link https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md or in self-documentation by http://localhost:3222/graphql


The following queries should be created:
artist
artists
genre
genres
track
tracks
band
bands
album
albums
jwt
user
favourites (available only for logged in user)

The following mutation should be created:

for Artists:
createArtist
deleteArtist
updateArtist

for Genres:
createGenre
deleteGenre
updateGenre

for Bands:
createBand
deleteBand
updateBand

for Tracks:
createTrack
deleteTrack
updateTrack

for Albums:
createAlbum
deleteAlbum
updateAlbum

for Users:
register

for Favourites:
addTrackToFavourites
addBandToFavourites
addArtistToFavourites
addGenreToFavourites
removeTrackFromFavourites
removeBandFromFavourites
removeArtistFromFavourites
removeGenreFromFavourites

Mutation requests must be available only for logged in users. (except Users.register)

Service port should be configured through env variable.

Each entity must have a separate module.

- app
    -modules
        - bands
        - artists
        - tracks
        - genres
        - favourites
        - ...
