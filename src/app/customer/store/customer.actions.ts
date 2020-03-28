import { Action } from '@ngrx/store';
import { Customer } from './customer.model';
export const SET_CUSTOMERS = '[Customers] Set Recipes';
export const TRY_GET_CUSTOMER_DETAILS = '[Customers] Try Get CustomerDetails';
export const SET_CUSTOMER_DETAILS = '[Customers] Set CustomerDetails';

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor(public payload: Customer[]) {}
}

export class TryGetCustomerDetails implements Action {
    readonly type = TRY_GET_CUSTOMER_DETAILS;
    constructor(public payload: Number) {}
}

export class SetCustomerDetails implements Action {
    readonly type = SET_CUSTOMER_DETAILS;
    constructor(public payload: String[]) {}
}
export type CustomerActions = SetCustomers | TryGetCustomerDetails | SetCustomerDetails;
