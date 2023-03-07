# Thameen London - Scalable Headless Shopify storefront

Install dependencies

```
npm install
```
Run your development server

```
npm run dev
```

# Shopify Credentials

You will need to add your Shopify Storefront API token and your Shopify store domain to a .env file to pull your Shopify data into your headless frontend, if you need assistance on how to get your Storefront API Token refer to the Shopify.dev docs or contact <sami@daze.digital> for support.

```
PUBLIC_STOREFRONT_API_TOKEN="c6815e5d7f03b9abed1f3d6f8e72045c" // example API token
PUBLIC_STORE_DOMAIN="your-store-domain.myshopify.com"
```

# Integrations

This site uses a number of integrations:

\* Unleashed - whilst this isnt used on the frontend, it is used as the main inventory management and logistics system. It uses webhooks to transfer product data between the two platforms. This is an optional choice for distributors but is necessary for Thameen as it automates the order workflow and manages the inventory.

\* Klaviyo - We use Klaviyo for tracking customer behaviors: Abandonded Cart, Customer signups, Browse Abandonment, Loyalty etc. The code is integrated directly into the frontend and must be swapped out for your instance of Klaviyo. Note: this uses Javascript and sever side rendering so experience with JS and React/SSR is needed. If you need assistance contact <sami@daze.digital> for support.

# Webhooks & GraphQL

```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

---
##### Dataflow FROM Unleashed
| Unleashed  | Shopify     | Frontend                                       |
|:-----------|:------------|:-----------------------------------------------|
| Product created  ➡️| Product passed into Shopify, Content is managed in Shopify ➡️ | Product data is passed to the frontend using queries 🛍|
| Order  | |
---
---
##### Dataflow TO Unleashed
| Frontend  | Shopify     | Unleashed                                       |
|:-----------|:------------|:-----------------------------------------------|
| Customer creates an Account on frontend and is able to manage all aspects of their account there ➡️| Using API's customer details are populated and stored in Shopify | ⏸ |
| Customer creates an order and checks out ➡️| Order is created ➡️| As soon as order has a status of 'PAID', webhook is triggered and order is passed to Unleashed for processing |   
---

# To point your Shopify theme to your headless URL

Edit './theme.liquid' and enter your live url into loc.host, this can be used during development to show your dev site as well:

```
loc.host = '[your-live-url-here]'
```

## Custom metafields

Reference can be found in:

```
metafields-reference.md
```

