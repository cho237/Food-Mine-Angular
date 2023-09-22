import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FoodPageComponent} from "./food-page/food-page.component";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {AuthComponent} from "./auth/auth.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent ,canActivate : [AuthGuard]},
  {path: "search/:searchTerm", component: HomeComponent},
  {path: "tag/:tag", component: HomeComponent},
  {path: "food/:id", component: FoodPageComponent},
  {path: "cart-page", component: CartPageComponent},
  {path: "auth", component: AuthComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "not-found"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
