# To point your Shopify theme to your headless URL

Edit './theme.liquid' and replace the following:

```
loc.host = 'staging.thameenlondon.com' // to be changed to thameenlondon.com at go live
```

# Project To Do's after go live:

- Refactor the 60 day limit on new products in './src/lib/utils.js'
- Better utilisation of styling and applying with Tailwind
- Finalise CMS - we aren't using graphql for the data from our CMS as we should, this is a high priority item
- Refactor nested footer - this should also come from our CMS as it has pages that we will need to refer to such as Careers, Store Locator and more

## Custom metafields

Reference can be found in:

```
metafields-reference.md
```

# Development TODO's:

- Fix Desktop Nav and implement styles from designs 
- Add colour states for if home or if other pages on navbar desktop
- Fix Sliders - Hero and product carousel
- Add bottom hero image before footer homepage
- Add carousel on product pages dependent on collection/product