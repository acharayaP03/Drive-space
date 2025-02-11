import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type FileType = "document" | "image" | "video" | "audio" | "other";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useAuthFormSchema<T>(formType: T) {
    return z.object({
        email: z.string().email(),
        fullName:
            formType === "register"
                ? z.string().min(2).max(50)
                : z.string().optional(),
    });
}

export function parseStringify<T>(data: T) {
    return JSON.parse(JSON.stringify(data));
}

export const handleError = (error: unknown, message: string) => {
    console.error(error);
    throw new Error(message);
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
    if (sizeInBytes < 1024) {
        return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
    } else if (sizeInBytes < 1024 * 1024) {
        const sizeInKB = sizeInBytes / 1024;
        return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
    } else {
        const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
        return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
    }
};

export const calculatePercentage = (sizeInBytes: number) => {
    const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    const percentage = (sizeInBytes / totalSizeInBytes) * 100;
    return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (!extension) return { type: "other", extension: "" };

    const documentExtensions = [
        "pdf",
        "doc",
        "docx",
        "txt",
        "xls",
        "xlsx",
        "csv",
        "rtf",
        "ods",
        "ppt",
        "odp",
        "md",
        "html",
        "htm",
        "epub",
        "pages",
        "fig",
        "psd",
        "ai",
        "indd",
    ];

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg"];
    const videoExtensions = ["mp4", "mkv", "avi", "mov", "wmv", "flv"];
    const audioExtensions = ["mp3", "wav", "aac", "flac", "ogg"];

    let type = "other";

    if (documentExtensions.includes(extension)) {
        type = "document";
    } else if (imageExtensions.includes(extension)) {
        type = "image";
    } else if (videoExtensions.includes(extension)) {
        type = "video";
    } else if (audioExtensions.includes(extension)) {
        type = "audio";
    }

    return { type, extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
    if (!isoString) return "—";

    const date = new Date(isoString);

    // Get hours and adjust for 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the time and date parts
    const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
    const day = date.getDate();
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = monthNames[date.getMonth()];

    return `${time}, ${day} ${month}`;
};

export const getFileIcon = (
    extension: string | undefined,
    type: FileType | string,
) => {
    switch (extension) {
        // Document
        case "pdf":
            return "/assets/icons/file-pdf.svg";
        case "doc":
            return "/assets/icons/file-doc.svg";
        case "docx":
            return "/assets/icons/file-docx.svg";
        case "csv":
            return "/assets/icons/file-csv.svg";
        case "txt":
            return "/assets/icons/file-txt.svg";
        case "xls":
        case "xlsx":
            return "/assets/icons/file-document.svg";
        // Image
        case "svg":
            return "/assets/icons/file-image.svg";
        // Video
        case "mkv":
        case "mov":
        case "avi":
        case "wmv":
        case "mp4":
        case "flv":
        case "webm":
        case "m4v":
        case "3gp":
            return "/assets/icons/file-video.svg";
        // Audio
        case "mp3":
        case "mpeg":
        case "wav":
        case "aac":
        case "flac":
        case "ogg":
        case "wma":
        case "m4a":
        case "aiff":
        case "alac":
            return "/assets/icons/file-audio.svg";

        default:
            switch (type) {
                case "image":
                    return "/assets/icons/file-image.svg";
                case "document":
                    return "/assets/icons/file-document.svg";
                case "video":
                    return "/assets/icons/file-video.svg";
                case "audio":
                    return "/assets/icons/file-audio.svg";
                default:
                    return "/assets/icons/file-other.svg";
            }
    }
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

// DASHBOARD UTILS
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsageSummary = (totalSpace: any) => {
    return [
        {
            title: "Documents",
            size: totalSpace.document.size,
            latestDate: totalSpace.document.latestDate,
            icon: "/assets/icons/file-document-light.svg",
            url: "/documents",
        },
        {
            title: "Images",
            size: totalSpace.image.size,
            latestDate: totalSpace.image.latestDate,
            icon: "/assets/icons/file-image-light.svg",
            url: "/images",
        },
        {
            title: "Media",
            size: totalSpace.video.size + totalSpace.audio.size,
            latestDate:
                totalSpace.video.latestDate > totalSpace.audio.latestDate
                    ? totalSpace.video.latestDate
                    : totalSpace.audio.latestDate,
            icon: "/assets/icons/file-video-light.svg",
            url: "/media",
        },
        {
            title: "Others",
            size: totalSpace.other.size,
            latestDate: totalSpace.other.latestDate,
            icon: "/assets/icons/file-other-light.svg",
            url: "/others",
        },
    ];
};

export const getFileTypesParams = (type: string) => {
    switch (type) {
        case "documents":
            return ["document"];
        case "images":
            return ["image"];
        case "media":
            return ["video", "audio"];
        case "others":
            return ["other"];
        default:
            return ["document"];
    }
};
