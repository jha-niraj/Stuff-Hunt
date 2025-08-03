"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { checkOnboardingStatus } from "@/actions/onboarding.action"

function SellerAuthCheck({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        async function checkAccess() {
            if (status === "loading") return

            // Redirect to sign-in if not authenticated
            if (!session) {
                router.push("/signin?role=seller")
                return
            }

            // Redirect to main site if not a seller
            if (session.user.role !== "SELLER") {
                router.push("/")
                return
            }

            // Check if seller needs onboarding
            try {
                const result = await checkOnboardingStatus()
                if (result.needsOnboarding) {
                    router.push("/onboarding")
                    return
                }
            } catch (error) {
                console.error("Error checking onboarding status:", error)
            }

            setIsChecking(false)
        }

        checkAccess()
    }, [session, status, router])

    if (status === "loading" || isChecking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                    <p className="text-white text-lg">Verifying access...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SellerAuthCheck>
            {children}
        </SellerAuthCheck>
    )
}
