import {Injectable} from '@angular/core';
import {Food} from 'src/app/shared/models/food';
import {Tag} from "../../shared/models/tag";
import { Origin } from 'src/app/shared/models/origin';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {
  }

  addFood(food:Food){
    return this.http.post("http://localhost:5000/food", food)
  }

  getFoodById(id: number):Food {
    return this.getAll().find(food => food.id == id)!;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[] {
    return [
      {id:"12lo34e", name: "All", count: 6},
      {id:"123r", name: "FastFood", count: 4},
      {id:"1d2jjr934", name: "Pizza", count: 2},
      {id:"123r4", name: "Lunch", count: 3},
      {id:"12s34", name: "SlowFood", count: 2},
      {id:"12r3g4", name: "Hamburger", count: 1},
      {id:"1ad34", name: "Fry", count: 1},
      {id:"123da4", name: "Soup", count: 1},
    ]
  }

  getAllOrigins():Origin[] {
    return [
      {id:"12kl9034e", name: "Italy"},
      {id:"1lkuu23r", name: "France"},
      {id:"1d2r4434", name: "Cameroon"},
    ]
  }


  getAllFoodsByTag(tag: string): Food[] {
    return tag == "All" ? this.getAll() : this.getAll().filter(food => food.tags.includes(tag));
  }

  getAll(): Food[] {
    return [
      {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: '/assets/images/foods/food-1.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
      {
        id: 2,
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favorite: true,
        origins: ['persia', 'middle east', 'china'],
        stars: 4.7,
        imageUrl: '/assets/images/foods/food-2.jpg',
        tags: ['SlowFood', 'Lunch'],
      },
      {
        id: 3,
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favorite: false,
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: '/assets/images/foods/food-3.jpg',
        tags: ['FastFood', 'Hamburger'],
      },
      {
        id: 4,
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favorite: true,
        origins: ['belgium', 'france'],
        stars: 3.3,
        imageUrl: '/assets/images/foods/food-4.jpg',
        tags: ['FastFood', 'Fry'],
      },
      {
        id: 5,
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favorite: false,
        origins: ['india', 'asia'],
        stars: 3.0,
        imageUrl: '/assets/images/foods/food-5.jpg',
        tags: ['SlowFood', 'Soup'],
      },
      {
        id: 6,
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: '/assets/images/foods/food-6.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
    ];
  }
}
