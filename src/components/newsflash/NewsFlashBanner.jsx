export function NewsFlashBanner({isHome}) {
  return (
    <>
      {isHome ? (
        <div id="newsflash-banner">
          <div className="container mx-auto py-2 md:py-4">
            <h6 className="">
              ENJOY TWO COMPLIMENTARY SAMPLES WITH EACH PURCHASE
            </h6>
          </div>
        </div>
      ) : null}
    </>
  );
}
