/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "@/images/bg-login.jpg";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";

enum UserType {
  Admin = "admin",
  Employee = "employee",
}

const formSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long." }),
});

function Login() {
  const [userType, setUserType] = useState<UserType>(UserType.Employee);
  const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
  const form = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: unknown) => {
    try {
      await form.trigger();
      if (form.formState.isValid) {
        console.log("Form submitted", data);
        alert("User logged in successfully!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white w-[25%] py-10 rounded-xl shadow-xl font-poppins">
        <p className="text-2xl font-bold text-center">Employee Login</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[80%] mx-auto pt-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                      >
                        {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <RadioGroup
              defaultValue={userType}
              onValueChange={(value: UserType) => setUserType(value)}
              className="flex gap-5 w-[40%] mx-auto justify-center"
            >
              {Object.values(UserType).map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={type}
                    id={type}
                    checked={userType === type}
                    className={`form-radio rounded-full h-4 w-4 border-black transition-colors duration-300 ease-in-out ${
                      userType === type ? "bg-violet-600" : "bg-[#D9D9D9]"
                    }`}
                  >
                    <span
                      className={`rounded-full h-4 w-4 transition-colors duration-300 ease-in-out ${
                        userType === type ? "bg-violet-600" : "bg-[#D9D9D9]"
                      }`}
                    ></span>
                  </RadioGroupItem>
                  <Label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-center items-center">
              <Button type="submit" className="text-xl">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
