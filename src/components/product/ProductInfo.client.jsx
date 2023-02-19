import Parser from '../../lib/utils';

export function ProductInfo({content}) {
  return (
    <>
      <div className="w-full flex flex-col border-b-[1px] border-black text-black font-semibold text-left inner-block text-base ">
        <span className="product-padding">
          Two complimentary samples with your purchase.
        </span>
      </div>

      <div className="w-full flex flex-col gap-4 py-6 border-b-[1px] border-black">
        <div className="inner-block text-black text-left prose-xl product-description w-full">
          <span>{Parser(content)}</span>
        </div>
      </div>
    </>
  );
}
