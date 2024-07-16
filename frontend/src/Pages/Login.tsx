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

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[!@#$%^&*]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    }),
});

function Login() {
  const [userType, setUserType] = useState("employee");
  const { isPasswordVisible, togglePasswordVisibility } =
    useTogglePasswordVisibility();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  const onSubmit = async (data: any) => {
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
      className="h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white w-[25%] py-10 rounded-xl shadow-xl font-poppins">
        <p className="text-2xl font-bold text-center">Employee Login</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[80%] mx-auto pt-8"
          >
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
                        {isPasswordVisible ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <RadioGroup
              value={userType}
              onValueChange={handleUserTypeChange}
              className="flex gap-5 w-[40%] mx-auto justify-center"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="admin"
                  id="r1"
                  className="form-radio h-4 w-4 bg-[#D9D9D9] rounded-full text-blue-600 border-black"
                />
                <Label htmlFor="r1">Admin</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="employee"
                  id="r2"
                  className="form-radio bg-[#D9D9D9] rounded-full h-4 w-4 text-blue-600 border-black"
                />
                <Label htmlFor="r2">Employee</Label>
              </div>
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
