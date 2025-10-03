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
import authSideImage from "../assets/authSideImage1.jpg";
import Brand from "@/components/icons/Brand";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useBranches } from "@/hooks/useBranches";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { data: branches } = useBranches();
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
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 z-10"></div>
        <img
          src={authSideImage}
          className="h-full w-full object-cover"
          alt="Authentication"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4">Join Us Today!</h1>
            <p className="text-lg xl:text-xl opacity-90">Create your account and start your learning journey</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join our learning community today</p>
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          className="h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
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
                          className="h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          className="h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Branch</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                            <SelectValue placeholder="Select your branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {branches?.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id.toString()}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>

            {/* Sign in link */}
            {/* Sign in link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
