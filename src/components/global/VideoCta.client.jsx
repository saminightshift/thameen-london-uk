import React, {useEffect, useRef} from 'react';
import {Link, useEmbeddedVideoUrl} from '@shopify/hydrogen';

export function VideoCta() {
  return (
    <Link to="/products/fanfare-100ml-cologne-elixir">
      <div className="relative isolate h-full max-h-[1080px] bg-[#d6d5c8] mb-0">
        <div className="">
          <AutoPlayVideo />
        </div>
      </div>
    </Link>
  );
}

function AutoPlayVideo(...props) {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl && videoEl.current && videoEl.current.play();
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className=""
        alt="Introducing Fanfare"
        src="https://cdn.shopify.com/videos/c/o/v/5450f3291ff1447e8656426286b6d2a1.mp4"
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          display: 'block',
          height: '100%',
          padding: '0, 0, 10px, 0',
          objectFit: 'contain',
        }}
        ref={videoEl}
      />
    </div>
  );
}

// <video autoPlay muted loop playsInline className="">
//   <source
//     className="absolute inset-0 -z-10 h-screen w-screen object-cover object-center bottom-0"
//     src="https://cdn.shopify.com/videos/c/o/v/5450f3291ff1447e8656426286b6d2a1.mp4"
//     type="video/mp4"
//   />
// </video>;
