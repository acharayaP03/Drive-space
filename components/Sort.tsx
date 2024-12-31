"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { sortTypes } from "@/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Sort() {
    const pathname = usePathname();
    const router = useRouter();

    function handleSortChange(value: string) {
        router.push(`${pathname}?sort=${value}`);
    }
    return (
        <Select
            onValueChange={handleSortChange}
            defaultValue={sortTypes[0].value}
        >
            <SelectTrigger className="sort-select">
                <SelectValue placeholder={sortTypes[0].value} />
            </SelectTrigger>
            <SelectContent className="sort-select-content">
                {sortTypes.map((sort) => (
                    <SelectItem
                        key={sort.label}
                        className="shad-select-item"
                        value={sort.value}
                    >
                        {sort.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
