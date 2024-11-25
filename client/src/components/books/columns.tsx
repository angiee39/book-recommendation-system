"use client"

import { ColumnDef } from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import Link from "next/link";
import {useState} from "react";
import {deleteBook} from "../../services/book-service";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {Book} from "../../types/Book";

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "author",
        header: "Author"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original

            const router = useRouter();
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

            const handleDelete = async () => {
                try {
                    const res = await deleteBook(book.id);
                    if (res.isSuccess) {
                        toast({
                            description: "You have successfully deleted the book.",
                        })
                        router.push('/books');
                    } else {
                        toast({
                            description: "There was an error deleting the book.",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        description: "There was an error deleting the book.",
                    })
                }
                setIsDeleteDialogOpen(false);
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(book.id.toString())}
                            >
                                Add Rating
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link href={`/books/${book.id}`}>
                                <DropdownMenuItem>Edit Book</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                                Delete Book
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    },
]
