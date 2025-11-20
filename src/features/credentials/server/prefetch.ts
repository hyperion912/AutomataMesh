import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type input = inferInput<typeof trpc.credentials.getMany>;

export const prefetchCredentials = (params: input) => {
    return prefetch(trpc.credentials.getMany.queryOptions(params));
}

export const  prefetchCredential = (id: string) => {
    return prefetch(trpc.credentials.getOne.queryOptions({ id }));
}