declare module 'wowjs' {
  export class WOW {
    constructor(options?: {
      boxClass?: string;
      animateClass?: string;
      offset?: number;
      mobile?: boolean;
      live?: boolean;
      callback?: Function;
      scrollContainer?: string;
    });
    init(): void;
  }
}