
import { Rating } from "primereact/rating";

export default function ReadOnlyDemo() {
    return (
        <div className="card">
            <Rating value={5} readOnly cancel={false} />
        </div>
    );
}
        