import {Link} from '@shopify/hydrogen';

export function HomepageCollections({data, title}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 2;

  if (!haveCollections) {
    return null;
  }

  return (
    <div className="mx-auto sm:px-6 lg:px-12">
      <h2 className="text-center text-xl text-black super-tracking leading-7 uppercase mb-10 mt-10">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 mx-auto">
        <>
          {data.map((collection) => {
            if (!collection?.image) {
              return null;
            }
            return (
              <>
                {collection?.image && (
                  <Link
                    key={collection.id}
                    to={`/collections/${collection.handle}`}
                    className="hover:scale-101 transform transition duration-300 ease-in-out"
                  >
                    <div className="relative py-4">
                      <div className="card-image aspect-[1/1] aspect-square">
                        {collection?.image && (
                          <img
                            src={collection.image.url}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <h4 className="text-center font-semibold text-md text-black super-tracking leading-5 uppercase py-8">
                        {collection.title}
                      </h4>
                    </div>
                  </Link>
                )}
              </>
            );
          })}
        </>
      </div>
    </div>
  );
}
