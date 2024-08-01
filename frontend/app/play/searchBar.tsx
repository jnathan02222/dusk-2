import {useState, useRef, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'

type loadingStates = 'hide' | 'loading' | 'verified' | 'failed';

export default function SearchBar(){
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<loadingStates>('hide');
  
  const latestTimestamp = useRef<number>(0);
  const songIds = useRef<Array<string>>([]);
  const selectedSongId = useRef<string>("2Ch7LmS7r2Gy2kc64wv3Bz"); 
  
  useEffect(
    () => {
      fetch('/track-id', {
        method: "PUT",
        body: JSON.stringify({
          track_id : selectedSongId.current
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  , [])

  function selectSong(songName : string, id : string){
    setQuery(songName);
    setCurrentSearchResults([], [], Date.now());
    selectedSongId.current = id;

    setLoading('loading');
    fetch('/track-id', {
      method: "PUT",
      body: JSON.stringify({
        track_id : id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (response) => {
        if(response.ok){
          fetch('/spotify-audio-analysis').then(
              (response) => {
                  if(response.ok){
                      setLoading('verified');
                  }
              }
          );
        }
      }
    );
    
  }

  //Ensures results are set in order
  function setCurrentSearchResults(results : Array<string>, ids : Array<string>, timestamp : number){
    if(timestamp > latestTimestamp.current){
      songIds.current = ids;
      latestTimestamp.current = timestamp;
      setSearchResults(results);
    }
  }

  function searchQuery(e: React.FormEvent<HTMLInputElement>){
    setQuery(e.currentTarget.value);
    setLoading('hide');
    
    var params = new URLSearchParams({q : e.currentTarget.value.trim()});
    const timestamp = Date.now();

    if( e.currentTarget.value.trim() == ""){
      setCurrentSearchResults([], [], timestamp);
      return;
    }
    
    
    fetch('/spotify-search?'+params.toString()).then(
      (response) => {
        response.json().then(
          (data) => {
            
            var results : Array<string> = [];
            var ids : Array<string> = [];

            data["tracks"]["items"].map(
              (track : Record<string, any>) => {
                var title = track["name"] + " - ";
                
                track["artists"].map(
                  (artist : Record<string, any>, index : number) => {
                    title += artist["name"] + ((index == track["artists"].length-1) ? "" : ", ");
                  }
                )
                
                ids.push(track["id"])
                results.push(title);
              }
            );
            setCurrentSearchResults(results, ids, timestamp);
          }
        );
      }
    );
  }

  return (
    <div>
        <form onSubmit={(e : React.FormEvent)=>{e.preventDefault()}} style={{marginBottom: -2}}>
          <input value={query} onChange={searchQuery}  type="text" placeholder="Enter a song!" style={{width: 960}} className=' relative z-10 bg-transparent rounded-md border-2 p-2 hover:border-fuchsia-200 focus:border-fuchsia-200 focus:outline-none'></input>
        </form>

        <div className="absolute -top-1 p-1.5 right-0">
          <ColorRing visible={loading == "loading"} height="40" width="40" ariaLabel="tail-spin-loading" colors={["#625366", "#625366", "#625366", "#625366", "#625366"]}/>
          <img className={loading == "verified" ? "" : "hidden"} style={{width: 40, height: 40}} src='/check.png' alt="This song has track data"></img>
          <img className={loading == "failed" ? "" : "hidden"} style={{width: 40, height: 40}} src='/cross.png' alt="This song has track data"></img>

        </div>

        {
          (searchResults.length != 0) && (<div  style={{width: 960}} className="absolute border-t-0 bg-black rounded-b-md border-2">
            {
              searchResults.map(
                (val, index) => { 
                  return <div onClick={()=>{selectSong(val, songIds.current[index])}} key={index} className="truncate pl-2 p-1.5 hover:cursor-pointer hover:bg-fuchsia-200/40">{val}</div>
                }
              )
            }
          </div>)
        }
    </div>
  );
}