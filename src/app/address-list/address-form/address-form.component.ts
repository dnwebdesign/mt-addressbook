import {Component, EventEmitter, Output} from '@angular/core';
import {Address} from "../../shared/address.model";
import {AddressService} from "../../shared/address.service";
import {AddressInput} from "../../shared/address-input";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'mt-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
    newAddress: AddressInput = this.createEmptyAddressInput();
    @Output() closeAddressForm = new EventEmitter<void>();
    addressForm: FormGroup;
    submitted = false;

    constructor(private addressService: AddressService, private router: Router) {
        this.addressForm = new FormGroup({
            name: new FormControl('', Validators.required),
            phone: new FormControl(''),
            mail: new FormControl('', Validators.email),
            street: new FormControl(''),
            streetNo: new FormControl(''),
            zip: new FormControl('', Validators.pattern("^[0-9]*")),
            location: new FormControl('')
        });
    }

    addAddress(): void {
        this.submitted = true;
        if (this.addressForm.valid) {
            const id = this.addressService.generateAddressId();
            this.addressService.addAddress(new Address(
                id,
                this.addressForm.controls['name'].value,
                this.addressForm.controls['phone'].value,
                this.addressForm.controls['mail'].value,
                this.addressForm.controls['street'].value,
                this.addressForm.controls['streetNo'].value,
                this.addressForm.controls['zip'].value,
                this.addressForm.controls['location'].value,
            ));
            this.newAddress = this.createEmptyAddressInput();
            this.addressForm.reset();
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
