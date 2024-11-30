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
import StarRating from "@/components/rating";
import {checkReviewExists, createReview} from "../../services/review-service";
import {useUser} from "@/context/user-context";

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
        header: "Status",
        cell: ({ row }) => {
            const value = row.getValue("status");
            const values = {
                "to-read": "To Read",
                "reading": "Reading",
                "done": "Done"
            }
            return values[value];
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original

            const router = useRouter();
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
            const [rating, setRating] = useState(1);
            const [comment, setComment] = useState("");
            const {user} = useUser();

            const handleDelete = async () => {
                try {
                    const res = await deleteBook(book.id);
                    if (res.isSuccess) {
                        toast({
                            title: "You have successfully deleted the book.",
                        })
                        router.push('/books');
                    } else {
                        toast({
                            variant: "destructive",
                            title: "There was an error deleting the book.",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "There was an error deleting the book.",
                    })
                }
                setIsDeleteDialogOpen(false);
            };

            const handleAddRating = async () => {
                try {
                    // Check if a review already exists
                    const reviewExists = await checkReviewExists({
                        book: book.id,
                        user: user.id,
                    });

                    if (reviewExists.data.exists) {
                        toast({
                            variant: "destructive",
                            title: "You have already reviewed this book",
                        })
                        router.push("/reviews");
                        return;
                    }

                    const res = await createReview({
                        book: book.id,
                        user: user.id,
                        rating: rating,
                        comment: comment
                    });

                    if (res.isSuccess) {
                        toast({
                            title: "You have successfully reviewed this book.",
                        })
                        setRating(0);
                        setComment("");
                        router.push("/reviews");
                    } else {
                        toast({
                            variant: "destructive",
                            title: "There was an error reviewing this book.",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "There was an error reviewing this book.",
                    })
                }
                setIsRatingDialogOpen(false);
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
                                onClick={() => setIsRatingDialogOpen(true)}
                            >
                                Rate this book
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
                    {/*Delete Dialog*/}
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

                    {/* Add Rating Dialog */}
                    <AlertDialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
                        <AlertDialogTrigger />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Add Rating</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enter a rating for this book.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="space-y-4 px-4 py-2">
                                {/* Star Rating Component */}
                                <StarRating
                                    initialRating={rating}
                                    isEditable={true}
                                    onChange={(newRating) => setRating(newRating)}
                                />
                                {/* Comment Input Field */}
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment here..."
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                                    rows={4}
                                />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsRatingDialogOpen(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleAddRating}>
                                Submit
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    },
]
