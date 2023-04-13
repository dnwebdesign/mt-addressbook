import {Component, OnInit} from '@angular/core';
import {Address} from "../shared/address.model";
import {AddressService} from "../shared/address.service";
import {AddressInput} from "../shared/address-input";

@Component({
    selector: 'mt-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
    addresses: Address[] = [];
    newAddress: AddressInput = this.createEmptyAddressInput();

    constructor(private addressService: AddressService) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }

    onAddAddress(): void {
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

    onDeleteAddress(id: number): void {
        this.addressService.deleteAddress(id);
        this.addresses = this.addressService.getAddresses();
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
