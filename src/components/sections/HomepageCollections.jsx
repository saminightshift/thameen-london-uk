import {Link} from '@shopify/hydrogen';

export function HomepageCollections({data, title}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 2;

  if (!haveCollections) {
    return null;
  }

  return (
    <div className="md:container md:mx-auto">
      <h2 className="text-center text-2xl text-primary tracking-widest uppercase py-4 mt-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mx-auto">
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
                    className="hover:scale-105 transform transition duration-300 ease-in-out"
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
                      <h4 className="text-center font-medium text-lg text-primary tracking-widest uppercase py-4">
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
