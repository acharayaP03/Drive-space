import React from "react";
import Image from "next/image";
import { avatarPlaceholderUrl } from "@/constants";

export default function UserInfo({
  contentClass,
  fullName,
  email,
  isMobile,
}: {
  contentClass: string;
  fullName: string;
  email: string;
  isMobile?: boolean;
}) {
  return (
    <div className={contentClass}>
      <Image
        src={avatarPlaceholderUrl}
        alt="user"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className={`${isMobile ? "" : "hidden"} lg:block`}>
        <p className="subtitle-2 capitalize">{fullName}</p>
        <p className="caption">{email}</p>
      </div>
    </div>
  );
}
