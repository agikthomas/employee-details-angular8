import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as CustomerActions from './customer.actions';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect()
    getCustomerDetailsData = this.actions$.pipe(
        ofType(CustomerActions.TRY_GET_CUSTOMER_DETAILS),
        switchMap((customerDetailsReqData: CustomerActions.TryGetCustomerDetails) => {
            return this.http.get<String[]>
                ('/cgi-enabled/employee.cgi?action=get_emp_addr&emp_id='+customerDetailsReqData.payload)
                    .pipe(
                        map(
                            respData => {
                                return new CustomerActions.SetCustomerDetails(respData)
                            }
                        )
                    )
        })
    )

    

}
