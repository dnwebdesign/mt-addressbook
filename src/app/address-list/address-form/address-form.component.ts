import {Component, EventEmitter, Output} from '@angular/core';
import {Address} from "../../shared/address.model";
import {AddressService} from "../../shared/address.service";
import {AddressInput} from "../../shared/address-input";
import {Router} from "@angular/router";

@Component({
    selector: 'mt-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
    newAddress: AddressInput = this.createEmptyAddressInput();
    @Output() closeAddressForm = new EventEmitter<void>();

    constructor(private addressService: AddressService, private router: Router) {
    }

    addAddress(): void {
        const id = this.addressService.generateAddressId();
        this.addressService.addAddress(new Address(
            id,
            this.newAddress.name,
            this.newAddress.phone,
            this.newAddress.mail,
            this.newAddress.street,
            this.newAddress.streetNo,
            this.newAddress.zip,
            this.newAddress.location
        ));
        this.newAddress = this.createEmptyAddressInput();
        this.router.navigate(['/']);
    }

    private createEmptyAddressInput(): AddressInput {
        return {
            name: '',
            phone: '',
            mail: '',
            street: '',
            streetNo: '',
            zip: '',
            location: ''
        };
    }
}
