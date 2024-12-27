import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { singOutUser } from "@/lib/actions/user.actions";

export default function Header({
  ownerId,
  accountId,
}: {
  ownerId: string;
  accountId: string;
}) {
  const fileUploaderProps = { ownerId, accountId };
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader {...fileUploaderProps} />
        <form
          action={async () => {
            "use server";

            await singOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}
