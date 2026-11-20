import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { deleteAccountProfileImage } from "@/lib/imgbb-assets";

const authBaseURL = process.env.BETTER_AUTH_URL;

const client = new MongoClient(process.env.MONGODB_SECRET_URI as string);
const db = client.db('book-nook');
export const database = db;

export const auth = betterAuth({
    baseURL: authBaseURL,
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        deleteUser: {
            enabled: true,
            beforeDelete: async (user) => {
                await deleteAccountProfileImage(db, user.image, user.email);
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    plugins: [
        jwt({
            jwt: {
                issuer: authBaseURL,
                audience: authBaseURL,
            },
        }),
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 3 * 24 * 60 * 60,
        }
    }
});