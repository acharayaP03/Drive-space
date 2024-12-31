import { Models, Query } from "node-appwrite";

export function createQueries(
    currentUser: Models.Document,
    types: string[],
    searchText: string,
    sort: string,
    limit?: number,
) {
    const queries = [
        Query.or([
            Query.equal("owner", [currentUser.$id]),
            Query.contains("users", [currentUser.email]),
        ]),
    ];

    if (types.length > 0) {
        queries.push(Query.equal("type", types));
    }
    if (searchText) {
        queries.push(Query.contains("name", searchText));
    }

    if (limit) {
        queries.push(Query.limit(limit));
    }

    if (sort) {
        const [sortBy, orderBy] = sort.split("-");

        queries.push(
            orderBy === "asc"
                ? Query.orderAsc(sortBy)
                : Query.orderDesc(sortBy),
        );
    }

    return queries;
}
