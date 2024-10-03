export default interface Inventory {
    id: number;
    material_code: string;
    description: string;
    total_balance: number;
    remaining_balance: number;
    quantity_out: number;
    available: number;
    return: number;
    unit: string;
    material_type: string;
    cost: number;
    date_entry: Date;
}