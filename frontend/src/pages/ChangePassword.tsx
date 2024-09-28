/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";
import { Eye, EyeOff, CircleCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function ChangePassword() {
  const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
  const { isPasswordVisible: isPasswordVisible1, togglePasswordVisibility: togglePasswordVisibility1 } = useTogglePasswordVisibility();
  const { isPasswordVisible: isPasswordVisible2, togglePasswordVisibility: togglePasswordVisibility2 } = useTogglePasswordVisibility();
  
  const [oldPass, setOldPass] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    numeric: false,
  });
  const [isMatch, setIsMatch] = useState(true);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${getVersion()}/user/password/`, {
        password: oldPass,
        newPassword,
      })
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully updated password');
        setOldPass('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          dispatch(logout());
        }, 700);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

  useEffect(() => {
    setConditions({
      length: (newPassword.length >= 4 && newPassword.length <= 32),
      uppercase: /[A-Z]/.test(newPassword),
      numeric: /[0-9]/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (conditions.length && conditions.uppercase && conditions.specialChar && conditions.numeric) {
      setIsMatch(newPassword === confirmPassword);
    } else {
      setIsMatch(true);
    }
  }, [conditions, newPassword, confirmPassword])

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <p className="text-2xl font-bold">Change Password</p>
          <p className="text-sm font-semibold text-[#9E9E9E]">
            Change Your Current Password
          </p>
        </div>
        <div className="flex flex-col pt-20 pl-20">
          <div className="w-[40%]">
            <p className="text-sm font-semibold text-[#9E9E9E]">
              Your Current Password
            </p>
            <div className="flex items-center relative">
              <Input
                className="focus:border-none"
                autoComplete="current-password"
                type={isPasswordVisible ? "text" : "password"}
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Enter Current Password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>
          <div className="w-[40%] pt-10">
            <p className="text-sm font-semibold text-[#9E9E9E]">New Password</p>
            <div className="flex items-center relative">
              <Input
                className="focus:border-none"
                autoComplete="new-password"
                type={isPasswordVisible1 ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {isPasswordVisible1 ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>
          <div className="w-[40%] pt-10">
            <p className="text-sm font-semibold text-[#9E9E9E]">Confirm New Password</p>
            <div className="flex items-center relative">
              <Input
                className="focus:border-none"
                autoComplete="new-password"
                type={isPasswordVisible2 ? "text" : "password"}
                placeholder="Enter New Password Again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility2}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {isPasswordVisible2 ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-10">
              {!conditions.length && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  Must be 4-8 characters long.
                </p>
              )}
              {!conditions.uppercase && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  Must have at least 1 uppercase (A-Z) character.
                </p>
              )}
              {!conditions.specialChar && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  Must have at least 1 special character.
                </p>
              )}
              {!conditions.numeric && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  Must have at least 1 numeric (0-9) character.
                </p>
              )}
            </div>
            {!isMatch && (
              <p className="text-sm font-semibold text-red-600">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="w-[40%] flex justify-center pt-20">
            <Button 
              onClick={(e) => handleSubmit(e)}
              className="w-[50%] py-5 bg-[#FCE3C5] text-black font-semibold"
              disabled={!conditions.length || !conditions.uppercase || !conditions.specialChar || !isMatch}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
