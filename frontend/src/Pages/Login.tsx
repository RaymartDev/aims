/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useTogglePasswordVisibility from "@/hooks/useTogglePasswordVisibility";
import loginImage from "../images/login-left.webp"
import {
  User, 
  LockKeyhole,
  Eye,
  EyeOff
} from 'lucide-react'
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(16, { message: "Username must not exceed 16 characters." }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long." }),
});

function Login() {
  const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility();
  const form = useForm({ 
    resolver: zodResolver(formSchema), 
    defaultValues: {
      username: "", password: ""
    }
  });

  const onSubmit = async (data: unknown) => {
    try {
      await form.trigger();
      if (form.formState.isValid) {
        console.log("Form submitted", data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const navigate = useNavigate();

  return (

    <div
      className="h-screen flex justify-center items-center bg-cover bg-center bg-gradient-to-t from-purple-600 to-pink-300"
    >
      
      <div className="bg-white w-[80%] lg:w-[1000px] h-[80%] py-10 rounded-xl shadow-xl font-poppins flex justify-center items-center">
        <div className="hidden lg:block"><img src={loginImage} alt="" /></div>
        <div className="w-[80%] lg:w-[40%]">
        <p className="text-2xl font-bold text-center">Employee Login</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[80%] mx-auto pt-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                    <Input 
                      className="pl-10 focus:border-none"
                      autoComplete="username"
                      placeholder="Username" 
                      {...field} />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"><User /></span>
                      </div>
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
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="px-10 focus:border-none"
                        autoComplete="current-password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"><LockKeyhole /></span>
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                      >
                        {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button type="submit" className="bg-[#FF7700] hover:bg-[#353535] text-xl w-[85%] rounded-full font-bold tracking-wider py-6" onClick={()=> navigate("/")}>
                Login
              </Button>
            </div>
          </form>
        </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
