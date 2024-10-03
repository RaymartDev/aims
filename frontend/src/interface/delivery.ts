export default interface Delivery {
    id: number;
    description: string;
    serial_number: string;
    asset_number: string;
    quantity: number;
    unit: string;
    remarks: string;
    delivery_receipt_number: string;
    product_order_number: string;
    purchase_request_number: string;
    capex_number: string;
}