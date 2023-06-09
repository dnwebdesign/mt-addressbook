import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Address} from "../shared/address.model";
import {AddressService} from "../shared/address.service";
import {Router} from "@angular/router";
import {LiveSearchService} from "../shared/live-search.service";

@Component({
    selector: 'mt-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
    addresses: Address[] = [];
    @Output() addressAdded = new EventEmitter<void>();
    highlightedSearchTerm = '';

    constructor(private addressService: AddressService, private router: Router, private liveSearchService: LiveSearchService) {
    }

    ngOnInit(): void {
        this.addresses = this.addressService.getAddresses();
    }

    onSelectAddress(id: number): void {
        this.router.navigate(['/address-details', id]);
    }

    onEditAddress(address: Address): void {
        this.router.navigate(['/address-details', address.id], {queryParams: {editing: true}});
    }

    onDeleteAddress(address: Address): void {
        if (this.addressService.confirmDeletion(address.name)) {
            this.addressService.deleteAddress(address);
            this.addresses = this.addressService.getAddresses();
        }
    }

    onSearch(target: EventTarget | null): void {
        if (!target) {
            return;
        }
        const searchTerm = (target as HTMLInputElement).value;
        this.highlightedSearchTerm = searchTerm;
        this.addresses = this.liveSearchService.searchAddresses(this.addressService.getAddresses(), searchTerm);
    }

    getAddressValue(address: Address, key: string): any {
        return (address as any)[key];
    }

    getHighlightedText(text: string, searchTerm: string): string | null {
        if (!searchTerm) {
            return null;
        }

        const startIndex = text.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (startIndex === -1) {
            return null;
        }

        const endIndex = startIndex + searchTerm.length;
        const highlightedText = text.substring(startIndex, endIndex);
        return (
            text.substring(0, startIndex) +
            '<mark>' +
            highlightedText +
            '</mark>' +
            text.substring(endIndex) +
            ' '
        );
    }
}
