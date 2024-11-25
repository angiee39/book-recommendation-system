"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Review} from "../../types/Review";
import StarRating from "@/components/rating"

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
]
