import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer Details Portal';
  sidenavWidth = 4;
  expanded = true;
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>){}

  onReload() {
    this.router.navigate(['/']);
  }

}
