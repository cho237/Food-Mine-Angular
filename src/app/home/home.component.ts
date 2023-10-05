import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  private userSub: Subscription = new Subscription();
  isAuthenticated = false;
  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.route.params.subscribe((params) => {
      console.log(params['tag']);
      if (params['searchTerm'])
        this.foods = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      else if (params['tag'])
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      else this.foods = this.foodService.getAll();
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
