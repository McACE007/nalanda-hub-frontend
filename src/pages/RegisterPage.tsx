import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  registerUserSchema,
  type RegisterUserInput,
} from "@/schemas/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.jpg";
import authSideImage from "../assets/authSideImage.jpg";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const form = useForm<RegisterUserInput>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      branchId: 1,
    },
    resolver: zodResolver(registerUserSchema),
  });

  const { register, error } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = async ({
    fullName,
    email,
    password,
    confirmPassword,
    branchId,
  }: RegisterUserInput) => {
    if (password !== confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords did not match" });
      return;
    }
    const userId = await register(
      fullName,
      email,
      password,
      confirmPassword,
      branchId
    );

    console.log(error);

    if (!userId) {
      toast.error(error || "Registration failed!");
      return;
    }
    navigate("/login");
    toast.success("Registered successfully!");
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden lg:block md:flex-1/4 transition-all duration-300 h-full bg-[#35C2F8] mb-2">
        <img
          src={authSideImage}
          className="h-full w-full object-cover xl:object-contain"
        ></img>
      </div>

      <div className="flex-1/2 transition-all duration-300">
        <div className="flex flex-col justify-center space-y-4 px-14 lg:px-36 xl:px-78 h-full transition-all duration-300">
          <img src={logo} width={100} height={100} />
          <div className="text-3xl font-semibold">Create an account</div>
          <Form {...form}>
            <form
              className="flex flex-col space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your fullname"
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
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
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your confirm password"
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit">
                {form.formState.isSubmitting ? "CREATING..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
