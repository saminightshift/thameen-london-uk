import React from 'react';
import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
} from '@shopify/hydrogen';
import Parser from '../../lib/utils';
import {Layout, NotFound} from '../../components/index.server';

export default function OurStory() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'Our Story'}} />
      <div className="relative bg-white">
        <div className="on-page-load mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
          <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
            <div className="relative h-[40rem] lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
              <div data-animate-type="motion-safe:animate-fadeOut">
                <img
                  className="fixed inset-0 h-full lg:w-1/2 bg-gray-50 object-cover object-top w-full z-0"
                  src="https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Slide_720x1080px-1.webp?v=1676525104"
                  alt="Fanfare"
                />
              </div>
            </div>
          </div>
          <div className="sticky px-  lg:contents bg-white h-full">
            <div className="max-w-2xl pl-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
              <h1 className="title title__lg-semibold text-left">Our Story</h1>
              <div className="mt-6 text text__lg">
                Thameen London is a fragrance brand born in London in 2013
                telling the bricolage stories of British cultures and heritage.
              </div>
              <div className="mt-6 max-w-xl text text__md lg:max-w-none">
                <p>
                  All fragrances are created with a profound love and passion
                  for the craftsmanship of fine niche perfumery with world
                  renowned perfumers. Our fragrances are the results of
                  creativity through storytelling and being good to our
                  environment with the ingredients and materials we choose.
                  Thameen fragrances are created with enviable artistry,
                  memorable sillage and intensive longevity by using the most
                  sustainable ingredients.
                </p>

                <p className="mt-8 ">
                  In the first quarter of 2023 Thameen London proudly announces
                  the launch of The Britologne Collection heralding and defining
                  a new era of olfactive zeitgeist. An amalgamation of the words
                  British and Cologne, the classic cologne structure is
                  re-imagined and magnified with complex chords and accords with
                  intensive projection and longevity. All fragrances in this
                  collection are categorised as Cologne Elixir defining an
                  inventive and playful interpretation.
                </p>

                <p className="mt-6">
                  Thameen London brings to the fragrance industry and
                  international markets a forward thinking British semantics
                  with a purposeful spirit adapting to an ever changing
                  landscape in perfumery.
                </p>
                <h2 className="mt-6 text text__md-semibold">
                  We create for today, thinking of tomorrow.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
