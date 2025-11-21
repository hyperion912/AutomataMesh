import {ExecutionsContainer,  ExecutionsError,  ExecutionsList, ExecutionsLoading } from "@/features/executions/components/executions";
import { executionsParamsLoader } from "@/features/executions/server/params-loader";
import { prefetchexecutions } from "@/features/executions/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from 'nuqs/server';
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


type Props = {
    searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
    await requireAuth();

    const params = await executionsParamsLoader(searchParams);
    prefetchexecutions(params);

    return(
        <ExecutionsContainer>
        <HydrateClient>
            <ErrorBoundary fallback={<ExecutionsError />}>
                <Suspense fallback={<ExecutionsLoading />}>
                    <ExecutionsList />
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </ExecutionsContainer>
    );
}

export default Page;
