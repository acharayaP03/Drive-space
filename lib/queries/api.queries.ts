import { Models, Query } from "node-appwrite";

export function createQueries(currentUser: Models.Document) {
    const queries = [
        Query.or([
            Query.equal("owner", [currentUser.$id]),
            Query.contains("users", [currentUser.email]),
        ]),
    ];

    // Todo: Search sort limit

    return queries;
}
