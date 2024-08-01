var spotify_device_id;
var spotify_player;
window.onSpotifyWebPlaybackSDKReady = () => {
    fetch("/spotify-token").then(
        (response)=>{
            response.json().then( 
                (data)=>{
                    const token = data["token"];
                    console.log(token);

                    spotify_player = new window.Spotify.Player({
                        name: 'Dusk',
                        getOAuthToken: cb => { cb(token); },
                        volume: 0.5
                    });
                        
                    spotify_player.addListener('ready', ({ device_id }) => {
                        spotify_device_id = device_id;
                        console.log('Ready with Device ID', device_id);
                    });
            
                    spotify_player.addListener('not_ready', ({ device_id }) => {
                        console.log('Device ID has gone offline', device_id);
                    });
            
        
                    spotify_player.connect();
                }
            )
        }
    )
}