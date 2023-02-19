import React, {useState, useEffect} from 'react';

const HeroImageSizer = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <img src={props} alt="Mobile Image" />
      ) : (
        <img src={props} alt="Desktop Image" />
      )}
    </div>
  );
};

export default HeroImageSizer;
