import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  @Input() visible: boolean = true;
  @Input() notfoundMessage: string = "Page Not Found!";
  @Input() resetLinkText: string = "Go To HomePage";
  @Input() resetLinkRoute: string = "/"
}
