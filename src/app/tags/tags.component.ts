import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../shared/models/tag";
import {FoodService} from "../services/food/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() foodPageTags?:string[]
  @Input() justifyContent:string = 'center';
  tags?: Tag[];
  activeTag: string = "All"

  changeActiveTag(tag: string) {
    this.activeTag = tag;
    this.router.navigateByUrl('/tag/' + this.activeTag);
  }

  constructor(private foodService: FoodService, private router: Router) {
  }

  ngOnInit(): void {
    if(!this.foodPageTags)
    this.tags = this.foodService.getAllTags();
  }
}
