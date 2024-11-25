'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import {useUser} from "@/context/user-context";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";
import {logoutUser} from "../../services/auth-service";
import {toast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {updateUser} from "../../services/user-service";
import OneSignal from "react-onesignal";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";

const FormSchema = z.object({
    id: z.number(),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    notification: z.boolean()
})

export function AccountCard() {
    const { setUser, user } = useUser();
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            notification: false,
        },
    })

    useEffect(() => {
        form.setValue('id', user?.id || 0);
        form.setValue('name', user?.name || "");
        form.setValue('notification', user?.notification || false);
    }, [user, form]);


    const logoutMutation = useMutation({
        mutationFn: () => {
            return logoutUser();
        },
        onSuccess: (data) => {
            if (data.isSuccess) {
                // Saving one signal external ID to send notifications to user
                OneSignal.logout()
                setUser(null);
                router.push('/login');
                toast({
                    title: "You have been successfully logged out.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was an error logging out.",
                })
            }
        },
        onError: (error) => {
            console.log(error)
            toast({
                variant: "destructive",
                title: "There was an error logging out.",
            })
        },
    })

    const userMutation = useMutation({
        mutationFn: (formData) => {
            return updateUser(formData);
        },
        onSuccess: (data) => {
            if (data.isSuccess) {
                setUser(data.data);
                toast({
                    title: "You have successfully updated your account.",
                })
            } else {
                form.setValue('name', user?.name);
                form.setValue('notification', user?.notification);
                toast({
                    variant: "destructive",
                    title: "There was an error updating your account.",
                })
            }
        },
        onError: (error) => {
            form.setValue('name', user?.name);
            form.setValue('notification', user?.notification);
            console.log(error)
            toast({
                variant: "destructive",
                title: "There was an error updating your account.",
            })
        },
    })

    const onSubmit = (data) => {
        userMutation.mutate(data);
    };

    return (
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="notification"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Get notifications for upcoming tasks
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {/* Submit button outside the form */}
                        <Button type="submit" variant="outline" disabled={userMutation.isPending}>
                            {userMutation.isPending ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span>Please wait</span>
                                </>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={logoutMutation.isPending}>
                                    {logoutMutation.isPending ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            <span>Please wait</span>
                                        </>
                                    ) : (
                                        <span>Logout</span>
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You will be logged out of the application. You will need to log back in to access your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => logoutMutation.mutate()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
