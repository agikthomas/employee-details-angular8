import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CustomerAction from '../store/customer.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState> ) { }
  id: number;
  subscription: Subscription;
  addressDetails: String[] = ['abc','def'];
  displayedColumns = ['Address']
  dataLoading = false;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.getEmployeeDetails(this.id);
      }
    );

  }
  getEmployeeDetails(id: number) {
    this.dataLoading = true;
    this.store.dispatch(new CustomerAction.TryGetCustomerDetails(this.id));

    this.subscription = this.store.select('customers').subscribe(
      (data) => {
        this.addressDetails = data.customerDetails;
        this.dataLoading = false;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
