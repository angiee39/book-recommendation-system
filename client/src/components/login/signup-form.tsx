"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {signUp} from "../../services/auth-service";
import {useRouter} from "next/navigation";
import {User} from "../../types/User";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(5, {
        message: "Email must be at least 5 characters.",
    }),
    password: z.string().min(2, {
        message: "Password cannot be empty.",
    }),
    confirmPassword: z.string().min(2, {
        message: "Password cannot be empty.",
    }),
})

export function SignupForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSignUp(data)
    }

    async function handleSignUp(data) {
        try {
            const res = await signUp(data)
            if (res.isSuccess) {
                router.push('/login');
                toast({
                    title: "You have successfully signed up.",
                    description: "Log in with the provided credentials to access your account.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was an error signing up.",
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "There was an error signing up.",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" {...field} />
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
                                <Input placeholder="Password" {...field} />
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
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
