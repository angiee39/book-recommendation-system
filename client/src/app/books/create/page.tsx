import {BookCreateForm} from "@/components/books/book-create-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const BookCreate = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Book</CardTitle>
                    <CardDescription>
                        Fill the details below to add a new task.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <BookCreateForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default BookCreate;