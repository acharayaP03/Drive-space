import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";

export default async function page({ params }: SearchParamProps) {
    const type = ((await params)?.type as string) || "";
    // request files
    const files = await getFiles();
    console.log("files", files);

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">{type}</h1>
                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">0 MB</span>
                    </p>
                    <div className="sort-container">
                        <p className="body-1 hidden text-light-200 sm:block">
                            Sort by:
                        </p>
                        <Sort />
                    </div>
                </div>
            </section>
            {files && files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <Card key={file.$id} file={file} />
                    ))}
                </section>
            ) : (
                <p>no files uploaded</p>
            )}
        </div>
    );
}
