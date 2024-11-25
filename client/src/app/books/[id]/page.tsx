import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {BookEditForm} from "@/components/books/book-edit-form";

const TaskEdit = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Book</CardTitle>
                    <CardDescription>
                        Fill the details below to edit the book.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <BookEditForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskEdit;