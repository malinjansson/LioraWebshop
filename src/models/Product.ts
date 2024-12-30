export class SizeOption {
    constructor(
      public size: string, 
      public price: number 
    ) {}
  }
  
  export class Product {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public imageUrl:string,
      public inStock: boolean,
      public sizes: SizeOption[]
    ) {}
  }
  