"use client"
import {useState} from 'react'
import { ColorRing } from 'react-loader-spinner'
import Link from 'next/link'

type loadingStates = 'hide' | 'loading' | 'success' | 'fail';

export default function UnregisteredUser() {
  const [loading, setLoading] = useState<loadingStates>('hide');

  function addUser (formData : FormData)  {
    console.log("HI!")
    setLoading('loading');
    fetch('/add-user', {
      method: "PUT",
      body: JSON.stringify({
        email : formData.get("email")
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      response => {
        if(response.ok){
          setLoading('success');
        }else{
          setLoading('fail');
        }
      }
    );
  }


  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center	items-center p-24">
      <div className='max-w-screen-sm'>
      
        <h1 className='leading-30	select-none	text-5xl text-white font-bold drop-shadow-[0_0_35px_rgba(255,179,212,0.75)]'>We don't have you registered as a user.</h1>
        <h2 className='leading-30	select-none mt-3 text-xl text-white '>Due to API limitations, only 25 users can be registered at a time. Please enter your Spotify email to be (re)added to our list.</h2>

        
        <div className='mt-5 flex text-white gap-4'>
          <form action={addUser} >
            <input disabled={loading === 'loading'} name="email" required type="email" placeholder="Enter your email" className={'mr-5 bg-transparent rounded-md border-2 p-2  focus:outline-none'+ (loading === 'loading' ? " cursor-not-allowed":"hover:border-fuchsia-200 focus:border-fuchsia-200")}></input>
            <input disabled={loading === 'loading'} type="submit" className={"mt-5 md:mt-0 rounded-md	border-2 p-2 " + (loading === 'loading' ? " cursor-not-allowed":"hover:border-fuchsia-200 hover:cursor-pointer")}></input>
          </form>
          <div className="-ml-2 mt-1">
            <ColorRing  visible={loading == "loading"} height="40" width="40" ariaLabel="tail-spin-loading" colors={["#625366", "#625366", "#625366", "#625366", "#625366"]}/>
          </div>
        </div>
        <div className='text-xl text-white mt-5'>
          <p className={loading === "fail" ? "" : "hidden"}>Something went wrong. Please try again.</p>
          <p className={loading === "success" ? "" : "hidden"}>Success! Return to <Link className="text-fuchsia-200 underline" href="/play">game</Link>.</p>
        </div>
      </div>
      <div className="relative w-full max-w-md ">
        <img src="/tree.png" alt="Building from the game" className="w-full h-auto"></img>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
    
    </main>
  );
}
