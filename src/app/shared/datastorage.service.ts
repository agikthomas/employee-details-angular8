import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Customer } from '../customer/store/customer.model';
import * as CustomerActions from '../customer/store/customer.actions';


@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
                private store: Store<fromApp.AppState>
                ) {}

    getCustomers() {
        return this.http
            .get<Customer[]>('/cgi-enabled/employee.cgi?action=all_employees')
            .pipe(
                map(customers => {
                    return customers;
                }),
                tap(
                    customers => {
                        this.store.dispatch(new CustomerActions.SetCustomers(customers));
                    }
                )
            )
    }    
                
    
}