import { Customer } from './customer.model';
import * as CustomerActions from './customer.actions';
export interface State {
    customers: Customer[],
    customerDetails: String[]
}

const initialState: State = {
    customers: [],
    customerDetails: [],
}
export function customerReducer(state = initialState, action: CustomerActions.CustomerActions ) {
    switch(action.type) {
        case CustomerActions.SET_CUSTOMERS :
            return {
                ...state,
                customers: [...action.payload]
            };
        case CustomerActions.SET_CUSTOMER_DETAILS :
            return {
                ...state,
                customerDetails: [...action.payload]
            }
        default:
            return state;
    }
    return state;

}