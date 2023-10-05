export class Food {
  id!: number;
  name: string;
  price: number;
  tags: string[];
  favorite: boolean = false;
  stars: number = 0;
  imageUrl: string;
  origins: string[];
  cookTime: string;

  constructor(
    name: string,
    price: number,
    tags: string[],
    imageUrl: string,
    cookTime: string,
    origins: string[]
  ) {
    this.name = name
    this.price = price;
    this.tags = tags;
    this.imageUrl = imageUrl;
    this.cookTime = cookTime;
    this.origins = origins;
  }
}
