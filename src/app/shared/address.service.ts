import {Injectable} from '@angular/core';
import {Address} from './address.model';
import {SnackbarService} from "./snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private addresses: Address[] = [
        new Address(1, 'Hans Müller', '030-1234567', 'hans.mueller@example.com', 'Hauptstraße', '15', '10115', 'Berlin'),
        new Address(2, 'Johanna Schmidt', '040-9876543', 'johanna.schmidt@example.com', 'Feldstraße', '22', '20354', 'Hamburg'),
        new Address(3, 'Michael Schneider', '069-6543210', 'michael.schneider@example.com', 'Bockenheimer Landstraße', '80', '60323', 'Frankfurt am Main'),
        new Address(4, 'Sophie Wagner', '0711-7890123', 'sophie.wagner@example.com', 'Königstraße', '3', '70173', 'Stuttgart'),
        new Address(5, 'Martin Weber', '089-2468101', 'martin.weber@example.com', 'Leopoldstraße', '45', '80802', 'München')
    ];

    constructor(private snackbarService: SnackbarService) {
    }

    getAddresses(): Address[] {
        return this.addresses;
    }

    getAddressById(id: number): Address | null {
        const address = this.addresses.find(adresse => adresse.id === id);
        return address || null;
    }

    addAddress(address: Address): void {
        this.addresses.push(address);
        this.snackbarService.showSuccess('Adressbucheintrag für ' + address.name + ' hinzugefügt.');
    }

    deleteAddress(address: Address): void {
        try {
            this.addresses = this.addresses.filter(addresses => addresses.id !== address.id);
            this.snackbarService.showSuccess('Adressbucheintrag für ' + address.name + ' gelöscht.');
        } catch (error) {
            this.snackbarService.showError('Fehler beim Löschen der Adresse. Bitte versuchen Sie es erneut.');
        }
    }

    generateAddressId(): number {
        return Math.max(...this.addresses.map(address => address.id)) + 1;
    }

    confirmDeletion(addressName: string): boolean {
        return window.confirm("Möchten Sie den Adressbucheintrag für " + addressName + " wirklich löschen?");
    }
}
