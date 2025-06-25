import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { userRegistrationSchema } from "@/schemas/userSchema";
import { useForm } from "react-hook-form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function RegisterPage() {
    const form = useForm<z.infer<typeof userRegistrationSchema>>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            branchId: undefined
        },
        resolver: zodResolver(userRegistrationSchema)
    });

    return (
        <div className="min-h-screen flex bg-background">
            <div className="bg-amber-500 hidden lg:block md:flex-1/4 transition-all duration-300">
                a
            </div>

            <div className="flex-1/2 transition-all duration-300">
                <div className="flex flex-col justify-center space-y-8 px-14 lg:px-36 xl:px-78 h-full transition-all duration-300">
                    <div className="text-3xl font-semibold">Create an account</div>
                    <Form {...form}>
                        <form className="flex flex-col space-y-5">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your fullname">
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your email">
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter your password">
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />


                            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter your confirm password">
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />

                            <Button>CREATE ACCOUNT</Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage