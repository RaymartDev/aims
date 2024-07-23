import { IoMdClose } from "react-icons/io";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";


interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}
const ModalSupplier: React.FC<ModalProps> = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-[30%] rounded-lg px-2 shadow-lg">
        <div className="flex flex-col">
          <div className="flex w-full justify-between px-3 py-2">
            <p className="text-xl font-poppins font-semibold">Add Store</p>
            <button onClick={handleClose}>
            <IoMdClose size={30} />
            </button>
          </div>
          <hr className="border-1 border-black w-[95%] mx-auto" />
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <div className="w-[95%] mx-auto flex gap-5">
            <div className="w-full">
              <p className="text-[#697386] text-sm">Supplier Code</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
            <div className="w-full">
              <p className="text-[#697386] text-sm">Company Name</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-sm text-[#697386]">Address</p>
            <textarea
              name="address"
              id=""
              className="border border-black w-full rounded-lg outline-none px-2 py-1"
            ></textarea>
          </div>
          <div className="w-[95%] mx-auto flex gap-5">
            <div className="w-[65%]">
              <p className="text-[#697386] text-sm">Contract Term</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
            <div className="w-[35%]">
              <p className="text-[#697386] text-sm">Tin Number</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <div className="w-[50%]">
              <p className="text-[#697386] text-sm">Tin Number</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4 pb-4 px-4">
          <Button className="bg-hoverCream font-semibold text-fontHeading" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="bg-hoverCream font-semibold text-fontHeading">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalSupplier;
