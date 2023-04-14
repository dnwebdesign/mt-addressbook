import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddressListComponent} from "./address-list/address-list.component";
import {AddressFormComponent} from "./address-list/address-form/address-form.component";
import {AddressDetailsComponent} from "./address-list/address-details/address-details.component";
import {CanDeactivateGuard} from "./can-deactive.guard";

const routes: Routes = [
    {path: '', component: AddressListComponent},
    {path: 'address-form', component: AddressFormComponent},
    {path: 'address-details/:id', component: AddressDetailsComponent, canDeactivate: [CanDeactivateGuard],},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
