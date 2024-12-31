"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import { useDebounce } from "use-debounce";

import { Input } from "./ui/input";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

export default function Search() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [searchedResults, setSearchedResults] = useState<Models.Document[]>(
        [],
    );

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const searchQuery = searchParams.get("query") || "";
    const [debouncedSearchQuery] = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedSearchQuery.length === 0) {
            setSearchedResults([]);
            setOpen(false);
            return router.push(pathname.replace(searchParams.toString(), ""));
        }
        const fetchSearchedDocuments = async () => {
            const getDocuments = await getFiles({
                types: [],
                searchText: debouncedSearchQuery,
            });
            setSearchedResults(getDocuments.documents);
            setOpen(true);
        };

        fetchSearchedDocuments();
    }, [debouncedSearchQuery]);

    useEffect(() => {
        if (!searchQuery) {
            setQuery("");
        }
    }, [searchQuery]);

    function handleClickResult(result: Models.Document) {
        setOpen(false);
        setSearchedResults([]);

        router.push(
            `/${result.type === "video" || result.type === "audio" ? "media" : result.type + "s"}?query=${query}`,
        );
    }
    return (
        <div className="search">
            <div className="search-input-wrapper">
                <Image
                    src="/assets/icons/search.svg"
                    alt="Search"
                    width={24}
                    height={24}
                />
                <Input
                    value={query}
                    placeholder="Search..."
                    className="search-input"
                    onChange={(e) => setQuery(e.target.value)}
                />

                {open && (
                    <ul className="search-result">
                        {searchedResults.length > 0 ? (
                            searchedResults.map((result) => (
                                <li
                                    className="flex cursor-pointer items-center gap-4 p-2"
                                    key={result.$id}
                                    onClick={() => handleClickResult(result)}
                                >
                                    <Thumbnail
                                        type={result.type}
                                        extension={result.extension}
                                        url={result.url}
                                        className="size-9 min-w-9"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <p className="subtitle-2 line-clamp-1 text-light-100">
                                            {result.name}
                                        </p>
                                        <FormattedDateTime
                                            date={result.$createdAt}
                                            className="caption line-clamp-1 !text-left text-light-200"
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
