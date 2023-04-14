import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddressListComponent} from './address-list/address-list.component';
import {AddressFormComponent} from './address-list/address-form/address-form.component';
import {AddressDetailsComponent} from './address-list/address-details/address-details.component';

@NgModule({
    declarations: [
        AppComponent,
        AddressListComponent,
        AddressFormComponent,
        AddressDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
