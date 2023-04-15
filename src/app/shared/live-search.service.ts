import {Injectable} from '@angular/core';
import {Address} from "./address.model";

@Injectable({
    providedIn: 'root'
})
export class LiveSearchService {
    searchAddresses(addresses: Address[], searchTerm: string): Address[] {
        if (!searchTerm) {
            return addresses;
        }

        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        return addresses.filter(address =>
            address.name.toLowerCase().includes(lowerCasedSearchTerm) ||
            address.street.toLowerCase().includes(lowerCasedSearchTerm) ||
            address.location.toLowerCase().includes(lowerCasedSearchTerm) ||
            address.mail.toLowerCase().includes(lowerCasedSearchTerm) ||
            address.phone.toLowerCase().includes(lowerCasedSearchTerm)
        );
    }
}
