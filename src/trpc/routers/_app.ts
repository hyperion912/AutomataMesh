import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { prisma } from '@/lib/db';
import { create } from 'domain';
import { inngest } from '@/inngest/client';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async()=>{
    await inngest.send({
      name: "execute/ai"
    })
    return {success: true, message: "AI job queued" };
    }),

  getWorkflows: protectedProcedure.query(({ctx}) => {
      return prisma.workflow.findMany();
    }),

  createWorkflow: protectedProcedure.mutation(async()=>{
    await inngest.send({
      name: "test/hello.world",
      data: { email: "abhi@gmail.com" }
    })
    return {success: true, message: "job queued" };
  })
  })
// export type definition of API
export type AppRouter = typeof appRouter;