import {Component, OnInit, Input} from '@angular/core';
import {Address} from '../../shared/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from "../../shared/address.service";
import {CanComponentDeactivate} from "../../can-deactive.guard";
import {AddressFormValidation} from "../../shared/address-form-validation";

@Component({
    selector: 'mt-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, CanComponentDeactivate {
    @Input() address: Address | null = null;
    editing = false;
    changesSaved = false;
    submitted = false;
    validation: AddressFormValidation;

    constructor(private addressService: AddressService, private route: ActivatedRoute, private router: Router) {
        this.validation = new AddressFormValidation();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.address = this.addressService.getAddressById(id);
        });

        this.route.queryParams.subscribe(queryParams => {
            this.editing = queryParams['editing'] === 'true';
            if (this.editing === true) {
                this.onEditAddress();
            }
        });
    }

    canDeactivate(): boolean {
        if (this.editing && !this.changesSaved) {
            return confirm('Sie haben ungespeicherte Änderungen. Sind Sie sicher, dass Sie die Seite verlassen möchten?');
        }
        return true;
    }

    onEditAddress(): void {
        if (this.address) {
            this.validation = new AddressFormValidation(this.address);
            this.editing = true;
        }
    }

    onSaveAddress(): void {
        this.submitted = true;
        if (this.validation.isValid() && this.address) {
            this.address = {
                id: this.address.id,
                name: <string>this.validation.nameControl.value,
                phone: <string>this.validation.phoneControl.value,
                mail: <string>this.validation.mailControl.value,
                street: <string>this.validation.streetControl.value,
                streetNo: <string>this.validation.streetNoControl.value,
                zip: <string>this.validation.zipControl.value,
                location: <string>this.validation.locationControl.value,
            };
            this.addressService.updateAddress(this.address);
            this.editing = false;
        }
    }

    onDeleteAddress(): void {
        if (this.address && this.addressService.confirmDeletion(this.address.name)) {
            this.addressService.deleteAddress(this.address);
            this.router.navigate(['/']);
        }
    }

    onClose(): void {
        if (!this.editing) {
            this.router.navigate(['/']);
        } else {
            if (!this.changesSaved && confirm('Sie haben ungespeicherte Änderungen. Sind Sie sicher, dass Sie die Seite verlassen möchten?').valueOf()) {
                this.editing = false;
            } else {
                this.editing = true;
            }
        }
    }
}
