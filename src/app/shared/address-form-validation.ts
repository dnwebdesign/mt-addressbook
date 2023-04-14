import {FormControl, Validators} from '@angular/forms';
import {Address} from './address.model';

export class AddressFormValidation {
    nameControl = new FormControl('', Validators.required);
    phoneControl = new FormControl('');
    mailControl = new FormControl('', Validators.email);
    streetControl = new FormControl('', Validators.required);
    streetNoControl = new FormControl('', Validators.required);
    zipControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
    locationControl = new FormControl('', Validators.required);

    constructor(initialAddress?: Address) {
        if (initialAddress) {
            this.setInitialValues(initialAddress);
        }
    }

    setInitialValues(address: Address): void {
        this.nameControl.setValue(address.name);
        this.phoneControl.setValue(address.phone);
        this.mailControl.setValue(address.mail);
        this.streetControl.setValue(address.street);
        this.streetNoControl.setValue(address.streetNo);
        this.zipControl.setValue(address.zip);
        this.locationControl.setValue(address.location);
    }

    isValid(): boolean {
        return (
            this.nameControl.valid &&
            this.phoneControl.valid &&
            this.mailControl.valid &&
            this.streetControl.valid &&
            this.streetNoControl.valid &&
            this.zipControl.valid &&
            this.locationControl.valid
        );
    }
}
