import {Component, EventEmitter, Output} from '@angular/core';
import {Address} from "../../shared/address.model";
import {AddressService} from "../../shared/address.service";
import {AddressInput} from "../../shared/address-input";
import {Router} from "@angular/router";
import {AddressFormValidation} from '../../shared/address-form-validation';


@Component({
    selector: 'mt-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
    newAddress: AddressInput = this.createEmptyAddressInput();
    @Output() closeAddressForm = new EventEmitter<void>();
    submitted = false;
    validation: AddressFormValidation = new AddressFormValidation();

    constructor(private addressService: AddressService, private router: Router) {
    }

    addAddress(): void {
        this.submitted = true;
        if (this.validation.isValid() && this.newAddress) {
            const id = this.addressService.generateAddressId();
            const address = new Address(
                id,
                <string>this.validation.nameControl.value,
                <string>this.validation.phoneControl.value,
                <string>this.validation.mailControl.value,
                <string>this.validation.streetControl.value,
                <string>this.validation.streetNoControl.value,
                <string>this.validation.zipControl.value,
                <string>this.validation.locationControl.value,
            )
            this.addressService.addAddress(address);
            this.newAddress = this.createEmptyAddressInput();
            this.router.navigate(['/']);
        }
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
