export function GiftWrapCta() {
  return (
    <div className="relative isolate overflow-hidden h-screen">
      <img
        src="https://cdn.shopify.com/s/files/1/0710/5796/5334/files/Home-Footer.png?v=1676264479"
        alt="Monochrome image of The Rose by Thameen London"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center "
      />
      <div className="absolute bottom-0 md:bottom-[2.5rem] flex justify-center mx-auto left-0 right-0 items-center w-full md:w-[520px] h-[150px] md:h-[125px] bg-white">
        <div className="flex flex-col justify-center items-center space-y-2 swiper-text">
          <h4 className="px-12 md:px-0 w-full m-auto uppercase text-center super-tracking font-semibold text-xs md:text-xs">
            MAKE IT SPECIAL WITH ENGRAVING & GIFT WRAPPING
          </h4>
          <h4 className="px-12 md:px-0 w-full m-auto uppercase text-center super-tracking font-semibold text-md md:text-base">
            SHOP OUR GIFT COLLECTIONS
          </h4>
        </div>
      </div>
    </div>
  );
}
