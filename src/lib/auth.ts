import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from '@/lib/db';
import { polar, checkout, portal } from "@polar-sh/better-auth"
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use:[
                checkout({
                    products: [
                        {
                            productId: "fd0cc462-4b65-40ae-a20e-ecbfb8b29e55",
                            slug: "AutomataMesh-Pro"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000",
                    authenticatedUsersOnly: true
                }),
                portal()
            ]
        })
    ]
});