
import Link from 'next/link'

export default function UnexpectedError() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center	items-center p-24">
      <div className='max-w-screen-sm'>
      
        <h1 className='leading-30	select-none	text-5xl text-white font-bold drop-shadow-[0_0_35px_rgba(255,179,212,0.75)]'>Unexpected Error!</h1>
        <h2 className='leading-30	select-none mt-3 text-xl text-white '>Something went wrong with the Spotify API.</h2>
        <div className='mt-5 flex text-white gap-4'>
          <Link href='/' className='rounded-md border-2 p-2 hover:border-fuchsia-200 text-center'>Return home</Link>
        </div>

      </div>
      <div className="relative w-full max-w-md ">
        <img src="/building2.png" alt="Building from the game" className="w-full h-auto"></img>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    
    </main>
  );
}
