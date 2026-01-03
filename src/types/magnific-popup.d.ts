declare module 'magnific-popup' {
  const magnificPopup: any;
  export default magnificPopup;
}

declare global {
  interface JQuery {
    magnificPopup(options?: any): JQuery;
  }
}

export {};

