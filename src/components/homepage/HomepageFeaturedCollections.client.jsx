import React, {useEffect} from 'react';
import {Link} from '@shopify/hydrogen';

export function HomepageFeaturedCollections() {
  const data = [
    {
      id: 'gid://shopify/Collection/436093911318',
      title: 'The Britologne Collection',
      handle: 'britologne-collection',
      images: [
        {
          id: '1_1800x1800',
          altText: 'The Britologne Collection',
          width: 1800,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_1800x1800px_1.webp?v=1676514231',
        },
        {
          id: '1_2700x1800',
          altText: 'The Britologne Collection',
          width: 2700,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_2700x1800px_1.webp?v=1676514231',
        },
      ],
    },
    {
      id: 'gid://shopify/Collection/433956716822',
      title: 'The Treasure Collection',
      handle: 'treasure-collection',
      images: [
        {
          id: '2_1800x1800',
          altText: 'The Treasure Collection',
          width: 1800,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_1800x1800px_2.webp?v=1676514231',
        },
        {
          id: '2_2700x1800',
          altText: 'The Treasure Collection',
          width: 2700,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_2700x1800px_2.webp?v=1676514231',
        },
      ],
    },
    {
      id: 'gid://shopify/Collection/434130682134',
      title: 'The Regal Collection',
      handle: 'regal-collection',
      images: [
        {
          id: '3_1800x1800',
          altText: 'The Regal Collection',
          width: 1800,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_1800x1800px_3.webp?v=1676514230',
        },
        {
          id: '3_2700x1800',
          altText: 'The Regal Collection',
          width: 2700,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_2700x1800px_3.webp?v=1676514231',
        },
      ],
    },
    {
      id: 'gid://shopify/Collection/433956978966',
      title: 'The Sovereign Collection',
      handle: 'sovereign-collection',
      images: [
        {
          id: '4_1800x1800',
          altText: 'The Sovereign Collection',
          width: 1800,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_1800x1800px_4.webp?v=1676514231',
        },
        {
          id: '4_2700x1800',
          altText: 'The Sovereign Collection',
          width: 2700,
          height: 1800,
          url: 'https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Collections_2700x1800px_4.webp?v=1676514231',
        },
      ],
    },
  ];

  // number between 1 and 4
  const random = Math.floor(Math.random() * 4) + 1;

  // // display responsive images depending on screen size
  // const responsiveImage = (image) => {
  //   useEffect(() => {
  //     // if screen width is less than 768px
  //     if (window.innerWidth < 768) {
  //       // return image with width 1800px
  //       return image.url.replace(/1800x1800/g, '1800x1800');
  //     }
  //     // if screen width is up to 1920px
  //     if (window.innerWidth < 1920) {
  //       // return image with width 2700px
  //       return image.url.replace(/1800x1800/g, '2700x1800');
  //     }
  //     // if screen width is more than 1920px
  //     if (window.innerWidth > 1920) {
  //       // return image with width 2700px
  //       return image.url.replace(/1800x1800/g, '1800x1800');
  //     }
  //   }),
  //     [image.url];
  // };

  return (
    <div className="mx-auto sm:px-6 lg:px-12">
      <h2 className="text-center text-xl text-black super-tracking leading-7 uppercase mb-10 mt-10">
        Discover Your Thameen Fragrance
      </h2>
      <div className="module_featured-collections">
        <Link to={`/collections/${data[0].handle}`}>
          <div className="relative py-0">
            <div className="card-image">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={data[0].images[0].url}
                  alt={data[0].images[0].altText}
                />
                <source
                  media="(max-width: 1920px)"
                  srcSet={data[0].images[1].url}
                  alt={data[0].images[1].altText}
                />
                <img
                  src={data[0].images[0].url}
                  alt={data[0].images[0].altText}
                  className="object-cover w-full h-full"
                />
              </picture>
            </div>
            <h4 className="text-center font-semibold text-md text-black super-tracking leading-5 uppercase py-8">
              {data[0].title}
            </h4>
          </div>
        </Link>
        <Link to={`/collections/${data[1].handle}`}>
          <div className="relative py-0">
            <div className="card-image">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={data[1].images[0].url}
                  alt={data[1].images[0].altText}
                />
                <source
                  media="(max-width: 1920px)"
                  srcSet={data[1].images[1].url}
                  alt={data[1].images[1].altText}
                />
                <img
                  src={data[1].images[0].url}
                  alt={data[1].images[0].altText}
                  className="object-cover w-full h-full"
                />
              </picture>
            </div>
            <h4 className="text-center font-semibold text-md text-black super-tracking leading-5 uppercase py-8">
              {data[1].title}
            </h4>
          </div>
        </Link>
        <Link to={`/collections/${data[2].handle}`}>
          <div className="relative py-0">
            <div className="card-image">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={data[2].images[0].url}
                  alt={data[2].images[0].altText}
                />
                <source
                  media="(max-width: 1920px)"
                  srcSet={data[2].images[1].url}
                  alt={data[2].images[1].altText}
                />
                <img
                  src={data[2].images[0].url}
                  alt={data[2].images[0].altText}
                  className="object-cover w-full h-full"
                />
              </picture>
            </div>
            <h4 className="text-center font-semibold text-md text-black super-tracking leading-5 uppercase py-8">
              {data[2].title}
            </h4>
          </div>
        </Link>
        <Link to={`/collections/${data[3].handle}`}>
          <div className="relative py-0">
            <div className="card-image">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={data[3].images[0].url}
                  alt={data[3].images[0].altText}
                />
                <source
                  media="(max-width: 1920px)"
                  srcSet={data[3].images[1].url}
                  alt={data[3].images[1].altText}
                />
                <img
                  src={data[3].images[0].url}
                  alt={data[3].images[0].altText}
                  className="object-cover w-full h-full"
                />
              </picture>
            </div>
            <h4 className="text-center font-semibold text-md text-black super-tracking leading-5 uppercase py-8">
              {data[3].title}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
