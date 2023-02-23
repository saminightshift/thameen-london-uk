import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import OurStory from './index.server';
import Parser from '../../lib/utils';

import {PageHeader} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

export default function Page({params}) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const {handle} = params;
  const {
    data: {page},
  } = useShopQuery({
    query: PAGE_QUERY,
    variables: {languageCode, handle},
  });

  if (!page) {
    return <NotFound />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: page.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={page.title} />
      </Suspense>
      <PageHeader heading={page.title} className="text-4xl">
        <OurStory page={page} />
      </PageHeader>
    </Layout>
  );
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode, $handle: String!)
  @inContext(language: $languageCode) {
    page(handle: "our-story") {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
