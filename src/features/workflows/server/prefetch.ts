import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type input = inferInput<typeof trpc.workflows.getMany>;

export const prefetchWorkflows = (params: input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params));
}

export const  prefetchWorkflow = (id: string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({ id }));
}