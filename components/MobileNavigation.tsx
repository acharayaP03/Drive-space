"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { avatarPlaceholderUrl, navItems } from "@/constants";
import NavigationItems from "./NavigationItems";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
    SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import UserInfo from "./UserInfo";
import { singOutUser } from "@/lib/actions/user.actions";

export default function MobileNavigation({
    ownerId,
    accountId,
    fullName,
    email,
    avatar,
}: ICurrentLoggedInUser) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const fileUploaderProps = { ownerId, accountId };
    return (
        <header className="mobile-header">
            <Image
                src="/assets/icons/logo-full-brand.svg"
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
                priority
            />
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={30}
                        height={30}
                    />
                </SheetTrigger>
                <SheetContent className="shad-sheet h-screen px-3">
                    {/* this header with description is needed here for now, since it will generate description missing warning */}
                    <SheetHeader className="sr-only">
                        <SheetDescription>
                            This is the mobile navigation sheet.
                        </SheetDescription>
                    </SheetHeader>
                    <SheetTitle>
                        <UserInfo
                            contentClass="header-user"
                            fullName={fullName}
                            email={email}
                            isMobile={true}
                        />
                        <Separator className="mb-4 bg-light-200/20" />
                    </SheetTitle>
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            {navItems.map(({ url, name, icon }) => (
                                <NavigationItems
                                    key={name}
                                    url={url}
                                    name={name}
                                    icon={icon}
                                    linkContentClass={cn(
                                        "mobile-nav-item",
                                        pathname === url ? "shad-active" : "",
                                    )}
                                    imageContentClass={cn(
                                        "nav-icon",
                                        pathname === url
                                            ? "nav-icon-active"
                                            : "",
                                    )}
                                    isMobile={true}
                                />
                            ))}
                        </ul>
                    </nav>
                    <Separator className="mb-4 mt-5 bg-light-200/20" />
                    <div className="mt-auto flex flex-col justify-between gap-5">
                        <FileUploader {...fileUploaderProps} />

                        <Button
                            type="submit"
                            className="mobile-sign-out-button"
                            onClick={async () => await singOutUser()}
                        >
                            <Image
                                src="/assets/icons/logout.svg"
                                alt="Logout"
                                width={24}
                                height={24}
                            />
                            <p>Logout</p>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
