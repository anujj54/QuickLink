import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;