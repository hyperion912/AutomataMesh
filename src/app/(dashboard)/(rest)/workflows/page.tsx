import {
    WorkflowsList,
    WorkflowsContainer,
} from "@/features/workflows/components/workflows";
import { workflowsParams } from "@/features/workflows/params";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
    searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<div>Error loading workflows.</div>}>
                    <Suspense fallback={<div>Loading workflows...</div>}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    );
};

export default Page;
