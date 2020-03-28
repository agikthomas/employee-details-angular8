import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerSelectComponent } from './customer/customer-select/customer-select.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerComponent, 
      children: [
        { path: '', component: CustomerSelectComponent},
        { path: ':id', component: CustomerDetailsComponent}
      ] 
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule {

  }
  