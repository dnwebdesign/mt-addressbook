export class Address {
    id: number;
    name: string;
    phone: string;
    mail: string;
    street: string;
    streetNo: string;
    zip: string;
    location: string;

    constructor(id: number, name: string, phone: string, mail: string, street: string, streetNo: string, zip: string, location: string) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.mail = mail;
        this.street = street;
        this.streetNo = streetNo;
        this.zip = zip;
        this.location = location;
    }
}
