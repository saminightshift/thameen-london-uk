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
      <div className="w-full h-screen top-0 bg-gray-100 text-white page-404">
        <PageHeader heading={heading} className="mt-32 text-center">
          <Text width="narrow" as="p">
            {subheading}
          </Text>
          <Button
            as="button"
            className="btn btn-checkout"
            width="auto"
            variant="secondary"
            to={'/'}
          >
            Continue shopping
          </Button>
        </PageHeader>
      </div>
    </Layout>
  );
}
