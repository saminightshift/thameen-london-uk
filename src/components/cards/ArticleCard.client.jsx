import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {Disclosure, Transition} from '@headlessui/react';
import Parser from '../../lib/utils';
import {getImageLoadingPriority} from '../../lib/const';

export function ArticleCard({articles}) {
  const [cards, setCards] = useState(articles ?? []);

  const refs = React.useMemo(() => {
    return (
      articles.map(() => {
        return React.createRef();
      }) ?? []
    );
  }, [articles]);

  function handleClosingOthers(id) {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute('data-id') !== id;
    });

    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute('data-open') === 'true';
      if (isOpen) {
        ref.current.click();
      }
    });
  }

  return (
    <>
      <ol className="list-none flex flex-wrap mx-auto px-6">
        {cards.map((article, i) => (
          <Disclosure key={i}>
            {({open}) => (
              <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                <li className="article-card my-4">
                  <Disclosure.Button
                    className="text-center text-xs"
                    ref={refs[i]}
                    data-id={article.id}
                    data-open={open}
                    onClick={() => handleClosingOthers(article.id)}
                  >
                    {article.image && (
                      <div className="card-image aspect-[3/2]">
                        <Image
                          alt={article.image.altText || article.title}
                          className="object-cover w-full"
                          data={article.image}
                          height={400}
                          loading={getImageLoadingPriority(i, 2)}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          width={600}
                          loaderOptions={{
                            scale: 2,
                            crop: 'center',
                          }}
                        />
                      </div>
                    )}
                    <div className="card-content">
                      {article.title}
                      <Transition
                        enter="transition duration-500 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-500 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="mx-auto text-left mt-4 px-2 text-xs bg-white h-auto ">
                          {Parser(article.contentHtml)}
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  </Disclosure.Button>
                </li>
              </div>
            )}
          </Disclosure>
        ))}
      </ol>
    </>
  );
}
