"use client"

import { useEffect } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { useSession } from "next-auth/react"
import { ProfileForm } from "./profileform"
import { SettingsForm } from "./settingsform"
import { BusinessForm } from "./businessform"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Settings, Calendar, Shield, Building, Store } from "lucide-react"

export function MainProfile() {
    const { data: session } = useSession()
    const { user, loading, error, fetchUser } = useUserStore()

    useEffect(() => {
        if (session?.user && !user) {
            fetchUser()
        }
    }, [session, user, fetchUser])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white text-lg">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-2">Error loading profile</h1>
                    <p className="text-gray-300">{error || "Profile not found"}</p>
                </div>
            </div>
        )
    }

    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <Card className="sticky top-8 bg-white/5 backdrop-blur-sm border-white/10">
                            <CardHeader className="text-center">
                                <div className="relative mx-auto">
                                    <Avatar className="h-32 w-32 mx-auto border-4 border-white/20 shadow-xl">
                                        <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                                        <AvatarFallback className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] text-white text-2xl font-bold">
                                            {user.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-2xl font-bold mt-4 text-white">
                                    {user.name}
                                </CardTitle>
                                <CardDescription className="text-lg text-gray-300">
                                    {user.email}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-center">
                                    <Badge variant="outline" className="flex items-center gap-2 border-[#FF6EC7]/30 text-[#FF6EC7]">
                                        <Shield className="h-4 w-4" />
                                        {user.role === 'ADMIN' ? 'Administrator' :
                                            user.role === 'SELLER' ? 'Seller' : 'Customer'}
                                    </Badge>
                                </div>

                                <Separator className="bg-white/10" />

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <Calendar className="h-4 w-4 text-[#DF87F3]" />
                                        <span>Member since {memberSince}</span>
                                    </div>
                                </div>

                                {
                                    user.role === 'SELLER' && (
                                        <>
                                            <Separator className="bg-white/10" />
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                                                    <Store className="h-4 w-4 text-[#FF6EC7]" />
                                                    Business Status
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-400">KYC Status</span>
                                                        <Badge
                                                            variant={user.kycStatus === 'APPROVED' ? 'default' : 'secondary'}
                                                            className={`text-xs ${user.kycStatus === 'APPROVED'
                                                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                                                }`}
                                                        >
                                                            {user.kycStatus}
                                                        </Badge>
                                                    </div>
                                                    {
                                                        user.verificationBadge && (
                                                            <div className="flex items-center gap-2">
                                                                <Shield className="h-4 w-4 text-green-400" />
                                                                <span className="text-xs text-green-400">Verified Seller</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:w-2/3">
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className={`grid w-full ${user.role === 'SELLER' ? 'grid-cols-3' : 'grid-cols-2'} bg-white/5 backdrop-blur-sm border border-white/10`}>
                                <TabsTrigger
                                    value="profile"
                                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6EC7] data-[state=active]:to-[#DF87F3] data-[state=active]:text-white"
                                >
                                    <User className="h-4 w-4" />
                                    Profile
                                </TabsTrigger>
                                {
                                    user.role === 'SELLER' && (
                                        <TabsTrigger
                                            value="business"
                                            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6EC7] data-[state=active]:to-[#DF87F3] data-[state=active]:text-white"
                                        >
                                            <Building className="h-4 w-4" />
                                            Business
                                        </TabsTrigger>
                                    )
                                }
                                <TabsTrigger
                                    value="settings"
                                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6EC7] data-[state=active]:to-[#DF87F3] data-[state=active]:text-white"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="mt-6">
                                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white">
                                            Profile Information
                                        </CardTitle>
                                        <CardDescription className="text-gray-300">
                                            Update your profile information and interests to personalize your StuffHunt experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ProfileForm user={user} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            {
                                user.role === 'SELLER' && (
                                    <TabsContent value="business" className="mt-6">
                                        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                                            <CardHeader>
                                                <CardTitle className="text-white flex items-center gap-2">
                                                    <Building className="h-5 h-5 text-[#FF6EC7]" />
                                                    Business Information
                                                </CardTitle>
                                                <CardDescription className="text-gray-300">
                                                    Manage your business details and seller information
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <BusinessForm user={user} />
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                )
                            }
                            <TabsContent value="settings" className="mt-6">
                                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white">
                                            Account Settings
                                        </CardTitle>
                                        <CardDescription className="text-gray-300">
                                            Manage your account preferences and security settings
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <SettingsForm user={user} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}