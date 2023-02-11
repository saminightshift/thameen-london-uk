export function NewsFlashBanner({isHome}) {
  return (
    <>
      {isHome ? (
        <div
          id="newsflash-banner"
          className="bg-black w-full z-50 relative text-white"
        >
          <div className="container mx-auto py-4">
            <h6 className="uppercase text-center font-semibold text-[0.72rem] super-tracking md:text-xs whitespace-pre-wrap">
              ENJOY TWO COMPLIMENTARY SAMPLES WITH EACH PURCHASE
            </h6>
          </div>
        </div>
      ) : null}
    </>
  );
}
