import { DeleteIcon } from "lucide-react";
import { useState } from "react";

export default function Delete() {

    return (
        <div>
            <DeleteIcon className="inline mr-2 mb-1" size={14} />
            <span className="text-sm">Delete</span>
        </div>
    )
}