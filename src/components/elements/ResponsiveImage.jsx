import React from 'react';

export default function ResponsiveImage({src, alt, className}) {
  if (!src) {
    return null;
  } else if (src.includes('webp')) {
    return (
      <picture className={className}>
        <source
          type="image/webp"
          srcSet={`${src},w_300.webp 300w, ${src},w_345.webp 345w, ${src},w_454.webp 454w, ${src},w_552.webp 552w, ${src},w_637.webp 637w, ${src},w_711.webp 711w, ${src},w_779.webp 779w, ${src},w_840.webp 840w, ${src},w_906.webp 906w, ${src},w_972.webp 972w, ${src},w_1014.webp 1014w, ${src},w_1070.webp 1070w, ${src},w_1120.webp 1120w, ${src},w_1174.webp 1174w, ${src},w_1219.webp 1219w, ${src},w_1260.webp 1260w, ${src},w_1311.webp 1311w, ${src},w_1352.webp 1352w, ${src},w_1377.webp 1377w, ${src},w_1400.webp 1400w"`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </picture>
    );
  } else if (src.includes('png')) {
    return (
      <picture className={className}>
        <source
          type="image/png"
          srcSet={`${src},w_300.png 300w, ${src},w_345.png 345w, ${src},w_454.png 454w, ${src},w_552.png 552w, ${src},w_637.png 637w, ${src},w_711.png 711w, ${src},w_779.png 779w, ${src},w_840.png 840w, ${src},w_906.png 906w, ${src},w_972.png 972w, ${src},w_1014.png 1014w, ${src},w_1070.png 1070w, ${src},w_1120.png 1120w, ${src},w_1174.png 1174w, ${src},w_1219.png 1219w, ${src},w_1260.png 1260w, ${src},w_1311.png 1311w, ${src},w_1352.png 1352w, ${src},w_1377.png 1377w, ${src},w_1400.png 1400w"`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </picture>
    );
  } else if (src.includes('jpeg')) {
    return (
      <picture className={className}>
        <source
          type="image/jpeg"
          srcSet={`${src},w_300.jpeg 300w, ${src},w_345.jpeg 345w, ${src},w_454.jpeg 454w, ${src},w_552.jpeg 552w, ${src},w_637.jpeg 637w, ${src},w_711.jpeg 711w, ${src},w_779.jpeg 779w, ${src},w_840.jpeg 840w, ${src},w_906.jpeg 906w, ${src},w_972.jpeg 972w, ${src},w_1014.jpeg 1014w, ${src},w_1070.jpeg 1070w, ${src},w_1120.jpeg 1120w, ${src},w_1174.jpeg 1174w, ${src},w_1219.jpeg 1219w, ${src},w_1260.jpeg 1260w, ${src},w_1311.jpeg 1311w, ${src},w_1352.jpeg 1352w, ${src},w_1377.jpeg 1377w, ${src},w_1400.jpeg 1400w"`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </picture>
    );
  } else if (src.includes('jpg')) {
    return (
      <picture className={className}>
        <source
          type="image/jpeg"
          srcSet={`${src},w_300.jpg 300w, ${src},w_345.jpg 345w, ${src},w_454.jpg 454w, ${src},w_552.jpg 552w, ${src},w_637.jpg 637w, ${src},w_711.jpg 711w, ${src},w_779.jpg 779w, ${src},w_840.jpg 840w, ${src},w_906.jpg 906w, ${src},w_972.jpg 972w, ${src},w_1014.jpg 1014w, ${src},w_1070.jpg 1070w, ${src},w_1120.jpg 1120w, ${src},w_1174.jpg 1174w, ${src},w_1219.jpg 1219w, ${src},w_1260.jpg 1260w, ${src},w_1311.jpg 1311w, ${src},w_1352.jpg 1352w, ${src},w_1377.jpg 1377w, ${src},w_1400.jpg 1400w"`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </picture>
    );
  } else {
    <img src={`${src}.jpeg`} alt={alt} />;
  }
}
