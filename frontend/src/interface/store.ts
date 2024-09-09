export default interface Store {
    id: number;
    company_id: number;
    name: string;
    cost_center_code: string;
    address: string;
    effective_on: Date;
    modified_on: Date;
    modified_by_id: number;
}