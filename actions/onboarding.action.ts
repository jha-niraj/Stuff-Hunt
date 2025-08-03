"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function getUserOnboardingData() {
    const session = await auth()
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            onboardingCompleted: true,
            companyName: true,
            businessType: true,
            gstNumber: true,
            panNumber: true,
            businessAddress: true,
            phoneNumber: true,
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user
}

export async function checkOnboardingStatus() {
    const session = await auth()
    
    if (!session?.user?.email) {
        return { needsOnboarding: false }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            onboardingCompleted: true,
            role: true
        }
    })

    if (!user) {
        return { needsOnboarding: false }
    }

    return {
        needsOnboarding: !user.onboardingCompleted,
        userRole: user.role
    }
}

export async function completeUserOnboarding(data: {
    name: string
    phoneNumber?: string
}) {
    const session = await auth()
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated")
    }

    try {
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                onboardingCompleted: true,
            }
        })

        return { success: true }
    } catch (error) {
        console.error("Error completing user onboarding:", error)
        throw new Error("Failed to complete onboarding")
    }
}

export async function completeSellerOnboarding(data: {
    companyName: string
    businessType: string
    gstNumber?: string
    panNumber: string
    businessAddress: string
    phoneNumber: string
}) {
    const session = await auth()
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated")
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                companyName: data.companyName,
                businessType: data.businessType,
                gstNumber: data.gstNumber,
                panNumber: data.panNumber,
                businessAddress: data.businessAddress,
                phoneNumber: data.phoneNumber,
                onboardingCompleted: true,
            }
        })

        return { success: true, user: updatedUser }
    } catch (error) {
        console.error("Error completing seller onboarding:", error)
        throw new Error("Failed to complete seller onboarding")
    }
}
