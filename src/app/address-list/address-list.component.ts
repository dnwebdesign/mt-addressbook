import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Address} from "../shared/address.model";
import {AddressService} from "../shared/address.service";
import {AddressInput} from "../shared/address-input";
import {Router} from "@angular/router";

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
    selectedAddress: Address | null = null;

    constructor(private addressService: AddressService, private router: Router) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }

    selectAddress(id: number): void {
        this.router.navigate(['/address-details', id]);
    }

    onEditAddress(address: Address): void {
        this.router.navigate(['/address-details', address.id], {queryParams: {editing: true}});
    }

    onDeleteAddress(id: number): void {
        this.addressService.deleteAddress(id);
        this.addresses = this.addressService.getAddresses();
    }

    toggleAddressForm() {
        this.showAddressForm = !this.showAddressForm;
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
