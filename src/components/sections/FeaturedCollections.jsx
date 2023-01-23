import {Link, Image} from '@shopify/hydrogen';

import {Section} from '~/components';

export function FeaturedCollections({data, title = 'Collections', ...props}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 2;

  if (!haveCollections) return null;

  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mx-auto">
        <>
          {data.map((collection) => {
            if (!collection?.image) {
              return null;
            }
            return (
              <>
                {' '}
                {collection?.image && (
                  <Link
                    key={collection.id}
                    to={`/collections/${collection.handle}`}
                  >
                    <div className="relative py-4">
                      <div className="card-image aspect-square">
                        {collection?.image && (
                          <img
                            src={collection.image.url}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <h4 className="text-center font-medium text-lg text-primary uppercase tracking-widest py-4">
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
