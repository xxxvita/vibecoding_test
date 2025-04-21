import {config} from "dotenv";
import {drizzle} from "drizzle-orm/node-postgres";
import postgres from "postgres";    
import {profilesTable} from "./schema";

config({path: ".env.local"});

const client = postgres(process.env.DATABASE_URL!);

const schema = {
    profiles: profilesTable,
}

export const db = drizzle(client, {schema});
