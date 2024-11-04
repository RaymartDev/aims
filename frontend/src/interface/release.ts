export default interface Release {
    id: number;
    release_number: number;
    requestor: {
      name: string;
      employee_no: string;
      cost_center_code: string;
      user_id: number;
    };
    shipped_by: {
      name: string;
      date: Date;
    } | null;
    received_by: {
      name: string;
      date: Date;
    } | null;
    details: {
      detail_id: number;
      material_id: number;
      release_number: number;
      desc: string;
      quantity: number;
      remarks: string;
      item_code?: string;
      material_code?: string;
      uom?: string;
      serial?: string;
      cost?: number;
    }[]
    status: number;
    relead_to: string | null;
    date_out: Date | null;
  }