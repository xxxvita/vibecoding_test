"use server";

import { createProfile } from "../../../app/db/queries/profiles-queries";
import { insertProfile, selectProfile as SelectProfile } from "../../../app/db/schema";
import { ActionState } from "../../../app/types";
import { revalidatePath } from "next/cache";
import { getProfileByUserId } from "../../../app/db/queries/profiles-queries";
export async function createProfileAction(
    data: insertProfile
): Promise<ActionState<SelectProfile>> {
    try {
        const profile = await createProfile(data);
        revalidatePath("/");
        return {
            isSuccess: true,
            message: "Profile created successfully",
            data: profile,
        };
    } catch (error) {
        console.error("Error creating profile", error);
        return {
            isSuccess: false,
            message: "Error creating profile",
        };
    }
}

export async function getProfileByUserIdAction(
    userId: string
): Promise<ActionState<SelectProfile>> {
    try {
        const profile = await getProfileByUserId(userId);
        return {
            isSuccess: true,
            message: "Profile fetched successfully",
            data: profile,
        };
    } catch (error) {
        console.error("Error getting profile by user id", error);
        return {
            isSuccess: false,
            message: "Error fetching the profile",
        };
    }
}