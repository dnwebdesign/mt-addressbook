import {Component, OnInit, Input} from '@angular/core';
import {Address} from '../../shared/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from "../../shared/address.service";
import {CanComponentDeactivate} from "../../can-deactive.guard";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'mt-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit, CanComponentDeactivate {
    @Input() address: Address | null = null;
    editing = false;
    changesSaved = false;
    addressForm: FormGroup;
    submitted = false;

    constructor(private addressService: AddressService, private route: ActivatedRoute, private router: Router) {
        this.addressForm = new FormGroup({
            name: new FormControl('', Validators.required),
            phone: new FormControl(''),
            mail: new FormControl('', Validators.email),
            street: new FormControl(''),
            streetNo: new FormControl(''),
            zip: new FormControl('', Validators.pattern("^[0-9]*")),
            location: new FormControl('')
        });
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
            this.addressForm.controls['name'].setValue(this.address.name);
            this.addressForm.controls['phone'].setValue(this.address.phone);
            this.addressForm.controls['mail'].setValue(this.address.mail);
            this.addressForm.controls['street'].setValue(this.address.street);
            this.addressForm.controls['streetNo'].setValue(this.address.streetNo);
            this.addressForm.controls['zip'].setValue(this.address.zip);
            this.addressForm.controls['location'].setValue(this.address.location);
            this.editing = true;
        }
    }

    onSaveAddress(): void {
        this.submitted = true;
        if (this.addressForm.valid && this.address) {
            this.address = {
                id: this.address.id,
                name: this.addressForm.controls['name'].value,
                phone: this.addressForm.controls['phone'].value,
                mail: this.addressForm.controls['mail'].value,
                street: this.addressForm.controls['street'].value,
                streetNo: this.addressForm.controls['streetNo'].value,
                zip: this.addressForm.controls['zip'].value,
                location: this.addressForm.controls['location'].value
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
