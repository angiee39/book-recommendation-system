"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Review} from "../../types/Review";
import StarRating from "@/components/rating"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "@/hooks/use-toast";
import {deleteReview} from "../../services/review-service";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export const columns: ColumnDef<Review>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "book",
        header: "Book",
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {

            const value = row.getValue("rating");
            return (
                <StarRating initialRating={Number(value)} isEditable={false}/>
            )
        }
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const review = row.original

            const router = useRouter();
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

            const handleDelete = async () => {
                try {
                    const res = await deleteReview(review.id);
                    if (res.isSuccess) {
                        toast({
                            title: "You have successfully deleted the review.",
                        })
                        router.push('/reviews');
                    } else {
                        toast({
                            variant: "destructive",
                            title: "There was an error deleting the review.",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        title: "There was an error deleting the review.",
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
                            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                                Delete Review
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/*Delete Dialog*/}
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
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
    }
]
