import React from 'react';
import './landing.css'

const Landing = () => {
  return (
    <section className='landing'>
      <p><img src='/assets/images/WaveStreamerLogo.png'/></p>
      <p><span className='hugetext'>Turn the music up!</span></p>
      <p id='paragraph'><span className='smalltext'>Get the</span> <span className='bigtext'>first streamer</span> <span className='smalltext'>that has </span><span className='bigtext'>unlimited</span> <span className='smalltext'>streaming and is</span> <span className='bigtext'>ad-free</span>. <span className='smalltext'>There are </span><span className='bigtext'>no limits</span><span className='smalltext'>. There are </span><span className='bigtext'>no distractions</span><span className='smalltext'>. Listen at your desk or</span> <span className='bigtext'>on the go</span><span className='smalltext'>. Wave Streamr is available on </span><span className='bigtext'>all platforms</span><span className='smalltext'>.</span></p>
      </section>
  )
}

export default Landing;
