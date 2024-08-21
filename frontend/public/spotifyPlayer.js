var spotify_device_id;
var spotify_player;
fetch("/spotify-token").then(
    (response)=>{
        response.json().then( 
            (data)=>{
                const token = data["token"];
                console.log(token);

                if(window.Spotify == undefined){
                    window.location.replace(window.location.origin + "/unexpected-error");
                }

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
                    if(confirm("Spotify Player timed out. Return to home?")){
                        window.location.replace(window.location.origin);
                    }
                });

                spotify_player.addListener('authentication_error', ({ message }) => {
                    if(confirm("You've been signed out. Return to home?")){
                        window.location.replace(window.location.origin);
                    }
                });

                spotify_player.addListener('account_error', ({ message }) => {
                    window.location.replace(window.location.origin + "/unregistered-user");
                });
        
                spotify_player.connect();
            }
        )
    }
)
