"use client"
import SearchBar from "./searchBar";
import { useRef, useState } from "react";
import Script from 'next/script'

export default function Play({signedIn} : {signedIn : boolean}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [errorText, setErrorText] = useState<string>("JavaScript may have failed to load. Please reload the page.");

  const focusCanvas = (event : React.MouseEvent<HTMLElement>) => {
    const elem : HTMLElement = event.target as HTMLElement;
    if(elem.nodeName != "MAIN" && elem.nodeName != "DIV"){
      return;
    }
    if(canvasRef.current){
      canvasRef.current.focus();
    } 
  }

  //To avoid caching of script, a random query parameter is appended
  var generateRandomString = function(length : number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return (
    <main onClick={focusCanvas} className="flex min-h-screen justify-center	items-center p-24">
      {signedIn && <script src="https://sdk.scdn.co/spotify-player.js"></script>}
      {signedIn && <Script src={`spotifyPlayer.js?random=${generateRandomString(16)}`}></Script>}
      <Script type="text/javascript" charSet="utf-8" src={signedIn ? "scenario30445.js" : "scenario30446.js"} ></Script>
      <Script type="text/javascript" charSet="utf-8" src="jszip.min.js" ></Script>
      <Script type="text/javascript" src={`app.js?random=${generateRandomString(16)}`} defer={true} onLoad={()=>{setErrorText("")}}></Script>
      
      <div className='relative text-white' style={{width: 960}}>
        <div className={signedIn ? "" : "hidden"}><SearchBar></SearchBar></div>
        <canvas ref={canvasRef} className="outline-none rounded-lg mb-4 mt-4" tabIndex={0} id="scenarioCanvas" width="972" height="662">Your browser does not support the canvas tag.</canvas>
        <div className="absolute w-full text-center text-gray-500	-z-20">Hint: Press space to start running in-game!</div>
        <button  id="playButton" className="rounded-md border-2 p-2 hover:border-fuchsia-200 text-center w-20">Run</button>
       
        <button className="hidden" disabled={true} id="resetButton" >Reset</button>
        <input className="hidden" type="range" id="speedSlider" min={0} max={99} disabled={true}></input>
            
      </div>
      <div  className="text-white absolute w-full flex min-h-screen justify-center	items-center -z-10">
        <p>{errorText}</p>
      </div>
    </main>
  );
}

