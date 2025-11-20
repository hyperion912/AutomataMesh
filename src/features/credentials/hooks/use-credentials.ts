import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCredentialsParams } from "./use-credentials-params";
import { CredentialType } from "@/generated/prisma";

export const useSuspenseCredentials= () => {
    const trpc = useTRPC();
    const [params] = useCredentialsParams();

    return useSuspenseQuery(trpc.credentials.getMany.queryOptions(params));
};

export const useCreateCredential = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.credentials.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Credential "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.credentials.getMany.queryOptions({})
                );
            },

            onError: (error) => {
                toast.error(`Error creating credential: ${error.message}`);
            },
        })
    );
};

export const useRemoveCredential = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.credentials.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Credential "${data.name}" deleted`);
                queryClient.invalidateQueries(
                    trpc.credentials.getMany.queryOptions({})
                );
            },

            onError: (error) => {
                toast.error(`Error deleting credential: ${error.message}`);
            },
        })
    );
};

export const useSuspenseCredential= (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.credentials.getOne.queryOptions({ id }));
};


export const useUpdateCredential = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.credentials.update.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Credential "${data.name}" saved`);
                queryClient.invalidateQueries(
                    trpc.credentials.getMany.queryOptions({})
                );
                queryClient.invalidateQueries(
                    trpc.credentials.getOne.queryOptions({ id: data.id })
                );
            },

            onError: (error) => {
                toast.error(`Error saving credential: ${error.message}`);
            },
        })
    );
};

export const useCredentialsByType = (type: CredentialType) => {
    const trpc = useTRPC();
    return useQuery(trpc.credentials.getByType.queryOptions({ type }))
}
