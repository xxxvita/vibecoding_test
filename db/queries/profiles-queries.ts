import {eq} from "drizzle-orm";
import {db} from "../db";
import {insertProfile, profilesTable} from "../schema";

export const createProfile = async (data: insertProfile) => {
    try {
        const [profile] = await db.insert(profilesTable).values(data).returning();
        return profile;
    } catch (error) {
        console.error("Error creating profile", error);
        throw new Error("Failed to create profile");
    }
};

export const getProfileByUserId = async (userId: string) => {
    try {
        const profile = await db.query.profiles.findFirst({
            where: eq(profilesTable.userId, userId),
        });
        return profile;
    } catch (error) {
        console.error("Error getting profile by user id", error);
        throw new Error("Failed to get profile by user id");
    }
};


export const updateProfileByUserId = async (
    userId: string,
    data: Partial<insertProfile>
) => {
    try {
        const [updatedProfile] = await db
            .update(profilesTable)
            .set(data)
            .where(eq(profilesTable.userId, userId))
            .returning();
        return updatedProfile;
    } catch (error) {
        console.error("Error updating profile by user id", error);
        throw new Error("Failed to update profile by user id");
    }
};

export const deleteProfileByUserId = async (userId: string) => {
    try {
        await db.delete(profilesTable).where(eq(profilesTable.userId, userId));
    } catch (error) {
        console.error("Error deleting profile by user id", error);
        throw new Error("Failed to delete profile by user id");
    }
};