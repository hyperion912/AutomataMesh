import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type input = inferInput<typeof trpc.executions.getMany>;

export const prefetchexecutions = (params: input) => {
    return prefetch(trpc.executions.getMany.queryOptions(params));
}

export const  prefetchexecution = (id: string) => {
    return prefetch(trpc.executions.getOne.queryOptions({ id }));
}