import {Component, OnInit, Input} from '@angular/core';
import {Address} from '../../shared/address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from "../../shared/address.service";

@Component({
    selector: 'mt-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
    @Input() address: Address | null = null;
    editing = false;

    constructor(private addressService: AddressService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.address = this.addressService.getAddressById(id);
        });

        this.route.queryParams.subscribe(queryParams => {
            this.editing = queryParams['editing'] === 'true';
        });
    }

    onEditAddress(): void {
        this.editing = true;
    }

    onSaveAddress(): void {
        this.editing = false;
    }

    onDeleteAddress(): void {
        if (this.address && this.addressService.confirmDeletion(this.address.name)) {
            this.addressService.deleteAddress(this.address);
            this.router.navigate(['/']);
        }
    }

}
