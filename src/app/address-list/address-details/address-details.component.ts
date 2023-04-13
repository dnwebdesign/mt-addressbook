import {Component, OnInit, Input} from '@angular/core';
import {Address} from '../../shared/address.model';

@Component({
    selector: 'mt-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent {
    @Input() address: Address | null = null;
}
