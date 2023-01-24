export function ProductInfo({content, title}) {
  return (
    <>
      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8">
        <span className="text-black font-semibold text-left inner-block">
          Two complimentary samples with your purchase.
        </span>
      </div>

      <div className="w-full flex flex-col gap-4 border-b-2 border-black pb-8">
        <span className="text-black font-semibold text-left">{title}</span>
        <div
          className="inner-block text-black font-medium text-left prose w-full"
          dangerouslySetInnerHTML={{__html: content}}
        />
      </div>
    </>
  );
}
