declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface ActionType {
    label: string;
    icon: string;
    value: string;
}

declare interface SearchParamProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface ICurrentLoggedInUser {
    fullName: string;
    email: string;
    avatar: string;
    ownerId: string;
    accountId: string;
}

declare interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}
declare interface GetFilesProps {
    types: FileType[];
    searchText?: string;
    sort?: string;
    limit?: number;
}
declare interface RenameFileProps {
    fileId: string;
    name: string;
    extension: string;
    path: string;
}
declare interface UpdateFileUsersProps {
    fileId: string;
    emails: string[];
    path: string;
}
declare interface DeleteFileProps {
    fileId: string;
    bucketFieldId: string;
    path: string;
}

declare interface FileUploaderProps {
    ownerId: string;
    accountId: string;
    className?: string;
}

declare interface FileDocument {
    type: FileType;
    name: string;
    url: string;
    extension: string;
    size: number;
    owner: string;
    accountId: string;
    users: string[];
    bucketField: string;
}

declare interface MobileNavigationProps {
    ownerId: string;
    accountId: string;
    fullName: string;
    avatar: string;
    email: string;
}
declare interface SidebarProps {
    fullName: string;
    avatar: string;
    email: string;
}

declare interface ThumbnailProps {
    type: string;
    extension: string;
    url: string;
    className?: string;
    imageClassName?: string;
}

// declare interface ShareInputProps {
//   file: Models.Document;
//   onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onRemove: (email: string) => void;
// }
