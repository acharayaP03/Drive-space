import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";

export default function Card({ file }: Models.Document) {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div></div>
      {file.name}
    </Link>
  );
}
