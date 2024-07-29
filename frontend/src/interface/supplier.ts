export default interface Supplier {
    id: number;
    supplier_code: string;
    company_id: number;
    address: string;
    contract_term: string;
    tin_number: string;
    status_id: number;
    contact_id: number;
    effective_on: Date;
    modified_on: Date;
    modified_by_jd: number;
}