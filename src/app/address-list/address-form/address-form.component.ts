import {Component} from '@angular/core';
import {Address} from "../../shared/address.model";
import {AddressService} from "../../shared/address.service";
import {AddressInput} from "../../shared/address-input";

@Component({
    selector: 'mt-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
    showAddAddressForm = false;
    newAddress: AddressInput = this.createEmptyAddressInput();

    constructor(private addressService: AddressService) {
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
