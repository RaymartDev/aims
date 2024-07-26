import { useState, useEffect } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";
import { Eye, EyeOff, CircleCheck } from "lucide-react";

function ChangePassword() {
  const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });
  const [isMatch, setIsMatch] = useState(true);

  useEffect(() => {
    setConditions({
      length: newPassword.length >= 4 && newPassword.length <= 8,
      uppercase: /[A-Z]/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });

    setIsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  return (
    <Layout>
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
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {!conditions.length && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  New Password must be 4-8 characters long.
                </p>
              )}
              {!conditions.uppercase && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  1 uppercase letter.
                </p>
              )}
              {!conditions.specialChar && (
                <p className="text-sm font-semibold text-[#9E9E9E] flex items-center gap-1">
                  <CircleCheck size={20} />
                  1 special character.
                </p>
              )}
            </div>
          </div>
          <div className="w-[40%] pt-10">
            <p className="text-sm font-semibold text-[#9E9E9E]">Confirm New Password</p>
            <div className="flex items-center relative">
              <Input
                className="focus:border-none"
                autoComplete="new-password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter New Password Again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {!isMatch && (
              <p className="text-sm font-semibold text-red-600">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="w-[40%] flex justify-center pt-20">
            <Button
              className="w-[50%] py-5 bg-[#FCE3C5] text-black font-semibold"
              disabled={!conditions.length || !conditions.uppercase || !conditions.specialChar || !isMatch}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;
