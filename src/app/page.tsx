import { getQueryClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";



export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center"> 
      <HydrationBoundary state={dehydrate(queryClient)}> 
        <Client />
      </HydrationBoundary>
    </div>
  );
}
