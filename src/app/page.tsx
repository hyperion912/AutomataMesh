"use client"

import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { auth } from "@/lib/auth";
import { Btn } from "./logoutbtn";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();
  const create = useMutation(trpc.createWorkflow.mutationOptions(
    {
      onSuccess: () => {
        toast.success("Job queued");
    }
  }));


  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-6"> 
     Protected server Component: {JSON.stringify(data)}
     <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
     <Btn />
    </div>
  );
}
