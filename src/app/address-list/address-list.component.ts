import {Component} from '@angular/core';
import {Address} from "../shared/address.model";
import {AddressService} from "../shared/address.service";

@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {
    addresses: Address[] = [];

    constructor(private addressService: AddressService) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }
}
