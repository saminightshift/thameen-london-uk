import Parser from '../../lib/utils';

export function ProductInfo({content}) {
  return (
    <>
      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8 text-black font-semibold text-left inner-block">
        Two complimentary samples with your purchase.
      </div>

      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8">
        <div className="inner-block text-black text-left prose w-full">
          {Parser(content)}
        </div>
      </div>
    </>
  );
}
