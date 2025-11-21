import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useExecutionsParams } from "./use-executions-params";

export const useSuspenseExecutions= () => {
    const trpc = useTRPC();
    const [params] = useExecutionsParams();

    return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
};


export const useSuspenseExecution= (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
};



