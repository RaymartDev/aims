export default interface Return {
    id: number;
    return_number: number;
    release_number: number;
    requestor: {
      name: string;
      employee_no: string;
      cost_center_code: string;
    };
    details: {
      detail_id: number;
      material_id: number;
      return_number: number;
      desc: string;
      quantity: number;
      serial_number: string;
      unit: string;
      cost: number;
    }[];
    tag: string;
    remarks: string;
  }