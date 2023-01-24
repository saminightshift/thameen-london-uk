# Components to implement

### Collapse for Variant Selector

```
<div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <div className="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div className="collapse-content"> 
    <p>tabIndex={0} attribute is necessary to make the div focusable</p>
  </div>
</div>
```


### Dropdown on hover for main menu

```
<div className="dropdown dropdown-hover">
  <label tabIndex={0} className="btn m-1">Hover</label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

### Image carousel for product pages

1. Mobile Version

```
<div className="h-96 carousel carousel-vertical rounded-box">
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://placeimg.com/256/400/arch" />
  </div>
</div>
```

2. Desktop Version

```
<div className="w-64 carousel rounded-box">
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div className="carousel-item w-full">
    <img src="https://placeimg.com/256/400/arch" className="w-full" alt="Tailwind CSS Carousel component" />
  </div>
</div>
```