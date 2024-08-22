interface UserInterfaceRaw {
  id: number;
  employee_id: number;
  store_id: number;
  role: string;
  username: string;
  name: string;
  department: string;
  cost_center_code: string;
  employee_no: string;
  division: string;
  effective_to: Date;
  token: string;
  password: string;
}

type UserInterface = Partial<UserInterfaceRaw> | null;

export default UserInterface;