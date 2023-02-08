import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
  useSession,
  useServerAnalytics,
  Seo,
} from '@shopify/hydrogen';
import {EventsListener} from '~/components';
import {NotFound} from '~/components/index.server';
import KlaviyoOnsite from './components/klaviyo/KlaviyoOnsite.client';

function App({routes, request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {customerAccessToken} = useSession();

  useServerAnalytics({
    shopify: {
      isLoggedIn: !!customerAccessToken,
    },
  });

  return (
    <Suspense>
      <EventsListener />
      <ShopifyProvider countryCode={countryCode}>
        <Seo
          type="defaultSeo"
          data={{
            title: 'Thameen London',
            description: 'Luxury Fragrances Online',
          }}
        />
        <CartProvider
          countryCode={countryCode}
          customerAccessToken={customerAccessToken}
        >
          <Router>
            <FileRoutes
              basePath={countryCode ? `/${countryCode}/` : undefined}
              routes={routes}
            />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics cookieDomain="shopify.com" />
        <KlaviyoOnsite />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
