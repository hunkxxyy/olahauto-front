export interface ErrorType {
    bad :boolean,
    stringForLog: string

}

export interface DateType {

        Day:number,
        Month: number,
        Year: number

}
export interface NameAndAlias {

    name:string;
    alias:string;
}
export interface Country {

    "name": string,
    "coutryCode": string,
    "countryPhonePrefix": number
}
export interface Currency {

    "alphabetic_code":string,
    "name": string,
    "sign": string,
    "signPosFront": boolean
}
export interface Address {
    "id"?: number,
    "name"?: string,
    "type":string,
    "address": any,
    "city": any,
    "region"?: string,
    "postalCode": any,
    "countryId": number,
    "telephone": any,
    "email"?: any,
    "country"?:Country

}
export interface PartnerGroup {
    id?: number,
    name: string,
    description?: string
}
export interface Partner {
    id: number,
    name: any,
    partnerType: string,
    companyRegisteredNumber: number,
    taxNumber: any,
    eUVatNumber: any,
    paymentTerms:number,
    website: any,
    defaultCurrency: number,
    note:string,
    salesmanPartnerId:number ,
    journalId:number ,
    displayPhotoBlobId:number ,
    createdBy:number ,
    lastModifiedBy:number ,
    archived: boolean,

    addresses:Array<Address>,
    partner_group_id:any,
    singForArhive?:boolean

}

export interface GridController {
    limit:number;
    offset:number;
    count:number;
    orderBy:NameAndAlias;
    desc:string;
    searchText?:string;
    currentPage:number;
    PageTurnerShowNumberOfPages:number;
}
export interface Item {
    id: number,
    singForArhive?:boolean

    name:  string,
    itemCode: string,

    type:  string,

    item_group_id: number,
    unit_id: number,
    description:  string,
    sales_vat_code: number,
    purchase_vat_code: number,
    purchase_code:  string,
    default_purchase_partner: number,
    net_weight: number,
    gross_weight: number,
    bar_code: string

}
