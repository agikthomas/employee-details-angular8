import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/datastorage.service';
import { Customer } from './store/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['EmployeeId', 'Name', 'Age', 'Sex', 'More Details'];
  // customerData = [{"age":30,"empid":7,"sex":"Male","name":"John"},{"name":"Thomas","age":36,"empid":8,"sex":"Male"},{"name":"Tina","sex":"Female","empid":9,"age":40}];
  customerData: Customer[] = [];
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    console.log('Invoing data storage servcie');
    this.dataStorageService.getCustomers().subscribe(
      (customers) => {
        this.customerData = customers;
        console.log(customers);
      }
    );
  }

}
