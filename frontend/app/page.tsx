import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center	items-center p-24">
      
      <div className="relative w-full max-w-md ">
        <img src="/building.png" alt="Building from the game" className="w-full h-auto"></img>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div>
        <h1 className='select-none	text-9xl text-white font-bold drop-shadow-[0_0_35px_rgba(255,179,212,0.75)]'>DUSK</h1>
        <div className='ml-1 mt-5 flex text-white gap-4'>
          <Link href='/login' className='rounded-md	border-2 p-2 hover:border-fuchsia-200 text-center	'>Log in with Spotify Premium</Link>
          <Link href='/play-guest' className='rounded-md	border-2 p-2 hover:border-fuchsia-200 text-center	'>Play as Guest</Link>
        </div>
      </div>
    
    </main>
  );
}
