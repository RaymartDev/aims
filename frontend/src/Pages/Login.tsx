import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../images/bg-login.jpg"
import { Button } from "@/Components/ui/button";

function Login() {
  const [userType, setUserType] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);

  const handleUserTypeChange = (type:string) => {
    setUserType(type);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}> 
      <div className="bg-white w-[25%] py-10 rounded-xl shadow-xl font-poppins">
        <p className="text-2xl font-bold text-center">
          {userType === "employee" ? "Employee Login" : "Admin Login"}
        </p>
        <div className="pt-10">
          <div className="flex flex-col items-center">
            <p className="text-lg w-[80%] text-start px-2 font-poppins">Username</p>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="border border-black w-[80%] outline-none px-2 py-2 rounded-lg bg-[#D9D9D9] placeholder-[#777474]"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-lg w-[80%] text-start px-2 font-poppins">Password</p>
            <div className="relative w-[80%]">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border border-black w-full outline-none px-2 py-2 rounded-lg bg-[#D9D9D9] placeholder-[#777474]"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-8 w-[50%] mx-auto">
            <div className="flex items-center">
          <button
            onClick={() => handleUserTypeChange("employee")}
            className={` w-4 h-4 rounded-full border border-black ${
              userType === "employee"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } mr-2`}
          >
          </button>
          Employee
          </div>
          <div className="flex items-center">
          <button
            onClick={() => handleUserTypeChange("admin")}
            className={`w-4 h-4 rounded-full border border-black ${
              userType === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } mr-2`}
          >
          </button>
          Admin
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
        <Button className="text-xl">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
