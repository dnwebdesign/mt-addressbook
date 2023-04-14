import {Component, OnInit, Input} from '@angular/core';
import {Address} from '../../shared/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from "../../shared/address.service";
import {CanComponentDeactivate} from "../../can-deactive.guard";

@Component({
    selector: 'mt-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, CanComponentDeactivate {
    @Input() address: Address | null = null;
    newAddress: Address | null = null;
    editing = false;
    changesSaved = false;

    constructor(private addressService: AddressService, private route: ActivatedRoute, private router: Router) {
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
            this.newAddress = {...this.address};
            this.editing = true;
        }
    }

    onSaveAddress(): void {
        if (this.newAddress) {
            this.address = this.newAddress;
            this.addressService.updateAddress(this.address);
            this.editing = false;
            this.newAddress = null;
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
            this.editing = false;
            this.newAddress = null;
        }
    }

}
