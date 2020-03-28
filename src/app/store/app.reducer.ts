
import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomers from '../customer/store/customer.reducer';

export interface AppState {
    customers: fromCustomers.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    customers: fromCustomers.customerReducer
}