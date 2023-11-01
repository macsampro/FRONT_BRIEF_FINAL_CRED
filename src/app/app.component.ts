import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONT_BRIEF_FINAL_CRED';

 constructor(private modalService : NgbModal) {

 }

 public open(modal : any) : void {

 this.modalService.open(modal) ;

 }
  
}
