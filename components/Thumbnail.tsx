import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  imageClassname?: string;
  className?: string;
}

export default function Thumbnail({
  type,
  extension,
  url = "",
  imageClassname,
  className,
}: ThumbnailProps) {
  const isImage = type === "image" && extension !== "svg";
  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        className={cn(
          "size-8 object-contain",
          imageClassname,
          isImage && "thumbnail-image",
        )}
        width={100}
        height={100}
      />
    </figure>
  );
}
