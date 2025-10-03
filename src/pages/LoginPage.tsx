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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10"></div>
        <img
          src={authSideImage}
          className="h-full w-full object-cover"
          alt="Authentication"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg xl:text-xl opacity-90">Access your learning hub and continue your journey</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brand width="48" height="48" />
              <span className="ml-3 font-bold text-2xl text-[#203143]">
                <span className="block leading-tight">Nalanda</span>
                <span className="block leading-tight">Hub</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your email"
                          className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                        />
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
                      <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
