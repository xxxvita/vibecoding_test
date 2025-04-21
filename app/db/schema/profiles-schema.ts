import {pgTable, pgEnum, text, timestamp} from "drizzle-orm/pg-core";

export const enumMembership = pgEnum("membership", ["free", "pro"]);

export const profilesTable = pgTable("profiles", {
    userId: text("id").primaryKey().notNull(),
    membership: enumMembership("membership").notNull().default("free"),

    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export type insertProfile = typeof profilesTable.$inferInsert;
export type selectProfile = typeof profilesTable.$inferSelect;
