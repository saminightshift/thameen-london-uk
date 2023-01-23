import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountry: 'GB',
    defaultLanguage: 'EN',
    defaultLocale: 'en-GB',
    storeDomain: import.meta.env.PUBLIC_STORE_DOMAIN,
    storefrontToken: import.meta.env.PUBLIC_STOREFRONT_API_TOKEN,
    // privateStorefrontToken: import.meta.env.PRIVATE_STOREFRONT_API_TOKEN,
    // storefrontId: import.meta.env.PUBLIC_STOREFRONT_ID,
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'None',
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  }),
});
