export default interface Material {
    id: number;
    item_description: string;
    brand_model: string;
    unit_cost: number;
    category: string;
    material_code: string;
    item_code: string;
    material_con: string;
    material_type: string;
    uom: string;
    date_entry: Date;
    active_status: boolean;
}