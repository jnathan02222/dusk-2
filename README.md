# Dusk
A browser game based on the Spotify API. Implemented using Next.js, Express.js and Puppeteer.
Developer version hosted at [duskmusic.live](https://duskmusic.live).

# Installation
Create a new app at https://developer.spotify.com/. Make sure to add 'http://localhost:3000/' as a callback url.

In the frontend directory define, an .env file with the following variables:
```
SPOTIFY_USERNAME=dev_account_username
SPOTIFY_PASSWORD=dev_account_password
SPOTIFY_CLIENT_ID=app_client_id
SPOTIFY_CLIENT_SECRET=app_client_secret
```
Modify the dashboard_url in server.js to reflect your app's user page.
```
const dashboard_url = 'https://developer.spotify.com/dashboard/<something_different_for_your_app>/users'
```
Install dependencies and start the server.
```
npm install
npm run dev
```
