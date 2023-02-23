import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';

import {Suspense} from 'react';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Button, FeaturedCollections, PageHeader, Text} from '~/components';
import {ProductSwimlane, Layout} from '~/components/index.server';

export function NotFound({response, type = 'page'}) {
  if (response) {
    response.status = 404;
    response.statusText = 'Not found';
  }

  const heading = `Sorry!`;
  const subheading = `We couldnt find the ${type} you’re looking for.`;

  return (
    <Layout>
      <div className="w-full h-screen top-0 page-404">
        <PageHeader heading={heading} className="mt-32 text-center">
          <Text width="narrow" as="p">
            {subheading}
          </Text>

          <a href="/">
            <button className="btn lg-btn-solid mt-8">Continue Shopping</button>
          </a>
        </PageHeader>
      </div>
    </Layout>
  );
}
