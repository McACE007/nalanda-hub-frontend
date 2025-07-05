import { loginUserSchema, type LoginUserInput } from "@/schemas/userSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authSideImage from "../assets/authSideImage1.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Brand from "@/components/icons/Brand";

function LoginPage() {
  const form = useForm<LoginUserInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
  });

  const { login, error } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: LoginUserInput) => {
    const isLoggedIn = await login(email, password);

    if (!isLoggedIn) {
      toast.error(error || "Login failed!");
      return;
    }
    navigate("/");
    toast.success("Logged in successfully!");
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden lg:block md:flex-1/4 transition-all duration-300 h-full bg-[#35C2F8] mb-2">
        <img
          src={authSideImage}
          className="h-full w-full object-cover xl:object-cover"
        ></img>
      </div>

      <div className="flex-1/2 transition-all duration-300">
        <div className="flex flex-col justify-center space-y-4 px-14 lg:px-36 xl:px-48 max-w-4xl mx-auto h-full transition-all duration-300">
          <div className="flex items-center">
            <Brand width="60" height="60" />
            <span className="font-semibold flex flex-col gap-0 leading-4 w-fit text-[#203143]">
              <span>Nalanda</span>
              <span>Hub</span>
            </span>
          </div>
          <div className="text-3xl font-semibold">Login</div>
          <Form {...form}>
            <form
              className="flex flex-col space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

              <Button type="submit">
                {form.formState.isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
