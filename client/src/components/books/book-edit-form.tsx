"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {cn} from "@/lib/utils";
import {CalendarIcon, Loader2} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useParams, useRouter} from "next/navigation";
import {getBookById, updateBook} from "../../services/book-service";
import {useUser} from "@/context/user-context";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";

const FormSchema = z.object({
    id: z.number(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    author: z.string().min(5, {
        message: "Author must be at least 5 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    status: z.string().min(2, {
        message: "Status cannot be empty.",
    }),
    added_by: z.number(),
})

export function BookEditForm() {
    const { id } = useParams();
    const router = useRouter();
    const {user} = useUser();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            status: "to-read",
            added_by: 1
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksRes = await getBookById(Number(id))

                if (booksRes.isSuccess) {
                    const bookData = booksRes.data;
                    form.setValue('id', bookData.id);
                    form.setValue('title', bookData.title);
                    form.setValue('author', bookData.author);
                    form.setValue('description', bookData.description);
                    form.setValue('status', bookData.status);
                    form.setValue('added_by', bookData.added_by);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutation.mutate(data);
    }

    const mutation = useMutation({
        mutationFn: (formData) => {
            return updateBook(formData);
        },
        onSuccess: (data) => {
            if (data.isSuccess) {
                router.push('/books')
                toast({
                    title: "Book edited successfully.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was an error editing the book.",
                })
            }
        },
        onError: (error) => {
            console.error(error);
            toast({
                variant: "destructive",
                title: "There was an error editing the book.",
            })
        },
    })

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="The Shining" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea  placeholder="Murder mistery, romance and thriller" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Stephen King" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/*STATUS */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value.toString()}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                <SelectItem value="to-read">To Read</SelectItem>
                                                <SelectItem value="reading">Reading</SelectItem>
                                                <SelectItem value="done">Done</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
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
        </div>
    )
}
