import {Component, OnInit} from '@angular/core';
import {Address} from "../shared/address.model";
import {AddressService} from "../shared/address.service";

@Component({
    selector: 'mt-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
    addresses: Address[] = [];

    constructor(private addressService: AddressService) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }

    onDeleteAddress(id: number): void {
        this.addressService.deleteAddress(id);
        this.addresses = this.addressService.getAddresses();
    }
}
