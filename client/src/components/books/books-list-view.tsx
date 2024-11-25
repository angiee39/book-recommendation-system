import { columns } from "./columns"
import { DataTable } from "./data-table"
import {getAllBooks} from "../../services/book-service";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Book} from "../../types/Book";
import {BookOpenText} from "lucide-react";

async function getData(): Promise<Book[]> {
    const data = await getAllBooks();
    return data.data
}

export default async function BooksListView() {

    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <Link href="/books/create">
                <Button>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <BookOpenText /> Add New Book
                </Button>
            </Link>

            {data ? (
                <DataTable columns={columns} data={data}/>
            ) : (
                <div className="text-center py-10">
                    <p>No books available</p>
                </div>
            )}
        </div>
    )
}
