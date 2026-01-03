declare module 'owl.carousel' {
  const owlCarousel: any;
  export default owlCarousel;
}

interface OwlCarouselOptions {
  loop?: boolean;
  margin?: number;
  nav?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  responsive?: {
    [key: number]: {
      items: number;
    };
  };
}

declare global {
  interface JQuery {
    owlCarousel(options?: OwlCarouselOptions): JQuery;
  }
}

export {};

