import React from "react";

export default function Success({success}) {
    return (

        <div>

            <div className="alert alert-success alert-class" role="alert">
                {success}
            </div>

        </div>

    )
}