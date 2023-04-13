import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
    showAddressForm = false;
    @Output() addressAdded = new EventEmitter<void>();

    constructor(private addressService: AddressService) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }

    onEditAddress(address: Address): void {
        console.log("address editing of address with id " + address.id + " goes here.");
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
