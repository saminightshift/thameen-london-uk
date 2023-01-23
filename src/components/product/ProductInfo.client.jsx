import React, {useEffect} from 'react';
// import DOMPurify from 'dompurify';

export function ProductInfo({descriptionHtml}) {
  // useEffect(() => {
  //   const purifyMarkup = (dirtyMarkup) => {
  //     return DOMPurify.sanitize(dirtyMarkup);
  //   };
  // }, []);

  // const purifiedDescription = purifyMarkup(descriptionHtml);
  return (
    <>
      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8">
        <span className="text-black font-semibold text-left">
          Two complimentary samples with your purchase.
        </span>
      </div>

      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8">
        <span className="text-black font-semibold text-left">
          More Information
        </span>
        <div
          className="text-black font-medium text-left prose w-full"
          dangerouslySetInnerHTML={{__html: descriptionHtml}}
        />
      </div>
    </>
  );
}
