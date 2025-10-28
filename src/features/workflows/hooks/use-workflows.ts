import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useWorkflowsParams } from "./use-workflows-params";
import { use } from "react";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                );
            },

            onError: (error) => {
                toast.error(`Error creating workflow: ${error.message}`);
            },
        })
    );
};

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" deleted`);
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                );
            },

            onError: (error) => {
                toast.error(`Error deleting workflow: ${error.message}`);
            },
        })
    );
};
