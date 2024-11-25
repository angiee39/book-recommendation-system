import { columns } from "./columns"
import { DataTable } from "./data-table"
import {getAllReviews} from "../../services/review-service";
import {Review} from "../../types/Review";

async function getData(): Promise<Review[]> {

    const data = await getAllReviews();
    return data.data
}

export default async function AuditLogsListView() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            {data ? (
                <DataTable columns={columns} data={data}/>
            ) : (
                <div className="text-center py-10">
                    <p>No reviews available</p>
                </div>
            )}
        </div>
    )
}