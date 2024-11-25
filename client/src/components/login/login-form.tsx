"use client"

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';

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
import {loginUser} from "../../services/auth-service";
import OneSignal from "react-onesignal";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password cannot be empty.",
    })
})

export function LoginForm() {
    const router = useRouter();
    const { setUser } = useUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const mutation = useMutation({
        mutationFn: (formData) => {
            return loginUser(formData);
        },
        onSuccess: (data) => {
            if (data.isSuccess) {
                // Saving one signal external ID to send notifications to user
                OneSignal.login(data.data.user.id.toString());
                setUser(data.data.user);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                router.push('/tasks');
                toast({
                    title: "You have successfully logged in.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was an error logging in.",
                })
            }
        },
        onError: (error) => {
            console.log(error)
            toast({
                variant: "destructive",
                title: "There was an error logging in.",
            })
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutation.mutate(data)
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
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            {/*<FormDescription>*/}
                            {/*    This is your public display name.*/}
                            {/*</FormDescription>*/}
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
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                        <>
                            <Loader2 className="animate-spin" />
                            <span>Please wait</span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    )
}
