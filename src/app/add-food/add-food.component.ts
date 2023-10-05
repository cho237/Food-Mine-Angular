import {Component, OnInit} from '@angular/core';
import {Tag} from '../shared/models/tag';
import {FoodService} from '../services/food/food.service';
import {Origin} from '../shared/models/origin';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators,} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../shared/models/food';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  form: FormGroup;
  formTag: FormGroup;
  editMode: boolean = false;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.customNameValidator('food').bind(this),
      ]),
      price: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      cookTime: new FormControl(null, Validators.required),
      origins: new FormControl('defaultOrigin'),
      tags: new FormControl('defaultTag'),
    });

    this.formTag = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.customNameValidator('tag').bind(this),
      ]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        const food = this.foodService.getFoodById(+params['id']);
        this.fillForm(food);

      }

    });
  }

  tags: Tag[] = [];
  availableTags: Tag[] = this.foodService.getAllTags();
  origins: Origin[] = [];
  availableOrigins: Origin[] = this.foodService.getAllOrigins();
  selectedTag: string = '';

  fillForm(food: Food) {
    this.form.setValue({
      name: food.name,
      price: food.price,
      imageUrl: food.imageUrl,
      cookTime: food.cookTime,
      origins: 'defaultOrigin',
      tags: 'defaultTag',
    });


  }

  onAddTag(event: any) {
    const tag: Tag | undefined = this.availableTags.find(
      (t) => t.id === event.value
    );
    const existingTag = this.tags.find((t) => t.id === event.value);
    if (tag && !existingTag) {
      this.tags.push(tag);
    }
    this.form.patchValue({
      tags: 'defaultTag',
    });
  }

  removeTag(id: any) {
    this.tags = this.tags.filter((t) => {
      return t.id !== id;
    });
  }

  onAddOrigin(event: any) {
    const origin: Origin | undefined = this.availableOrigins.find(
      (o) => o.id === event.value
    );
    const existingOrigin = this.origins.find((o) => o.id === event.value);
    if (origin && !existingOrigin) {
      const updatedOrigins = this.origins.push(origin);
      //this.origins = updatedOrigins
    }
    this.form.patchValue({
      origins: 'defaultOrigin',
    });
  }

  removeOrigin(id: any) {
    this.origins = this.origins.filter((o) => {
      return o.id !== id;
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.toastr.error("Invalid Form!")
      return
    }
    if (this.editMode) {
      console.log(this.form.value);
    } else {
      let origins: string[] = []
      let tags: string[] = []
      this.origins.forEach(o => {
        if (o.id != undefined) {
          origins.push(o.id);
        }
      })
      this.tags.forEach(t => {
        if (t.id != undefined) {
          tags.push(t.id);
        }
      })

      const newFood = new Food(
        this.form.value.name,
        this.form.value.price,
        tags,
        this.form.value.imageUrl,
        this.form.value.cookTime,
        origins
      )
      this.foodService.addFood(newFood).subscribe({
        next: (response) => {
          this.toastr.success("Successfully");
          console.log(response)
        },
        error: (error) => {
          let errorMessage = "An error occurred!"
          switch (error.status) {
            case 401:
              errorMessage = "No right to perform action!";
              break;
            case 400:
              errorMessage = "Invalid Parameters!";
              break;
          }
          this.toastr.error(errorMessage);
        }
      })
    }
  }

  onDeleteTag(id: any) {
    this.availableTags = this.availableTags.filter((t) => {
      return t.id !== id;
    });
  }

  onSubmitTagForm() {
    console.log(this.formTag);
  }

  customNameValidator(param: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == null) {
        return null;
      }
      let existingName = null;
      if (param === 'food' && !this.editMode) {
        existingName = this.foodService
          .getAll()
          .find(
            (f) => f.name.toLowerCase() === control.value.trim().toLowerCase()
          );
      }
      if (param === 'tag' && !this.editMode) {
        existingName = this.availableTags.find(
          (t) => t?.name?.toLowerCase() === control.value.trim().toLowerCase()
        );
      }
      if (existingName) {
        return {nameAlreadyUsed: true};
      }
      return null;
    };
  }
}
