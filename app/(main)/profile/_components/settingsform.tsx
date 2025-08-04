"use client"

import { useState } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Shield, Eye, EyeOff } from "lucide-react"
import { User } from "@prisma/client"

interface SettingsFormProps {
    user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
    const { changePassword, loading } = useUserStore()
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords don't match")
            return
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long")
            return
        }

        try {
            await changePassword(passwordData)
            toast.success("Password changed successfully!")
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
        } catch (error) {
            // Error is already handled by the store and shown via toast
            console.error("Error changing password:", error)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const isPasswordValid = passwordData.newPassword.length >= 6
    const doPasswordsMatch = passwordData.newPassword === passwordData.confirmPassword
    const isSameAsCurrentPassword = passwordData.currentPassword && passwordData.newPassword && passwordData.currentPassword === passwordData.newPassword
    const canSubmit = passwordData.currentPassword && isPasswordValid && doPasswordsMatch && !isSameAsCurrentPassword

    return (
        <div className="space-y-6">
            {/* Account Information */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">
                        Account Information
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        Your basic account details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">
                                Name
                            </Label>
                            <Input
                                value={user.name || ""}
                                disabled
                                className="bg-white/10 border-white/20 text-gray-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">
                                Email
                            </Label>
                            <Input
                                value={user.email || ""}
                                disabled
                                className="bg-white/10 border-white/20 text-gray-300"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">
                        To change your name or email, please update your profile information in the Profile tab.
                    </p>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                        <Shield className="h-5 w-5 text-[#FF6EC7]" />
                        Change Password
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-medium text-white">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-10"
                                    placeholder="Enter your current password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium text-white">
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-10"
                                    placeholder="Enter a new password (min 6 characters)"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                            {passwordData.newPassword && !isPasswordValid && (
                                <p className="text-xs text-red-400">Password must be at least 6 characters long</p>
                            )}
                            {isSameAsCurrentPassword && (
                                <p className="text-xs text-red-400">New password cannot be the same as your current password</p>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                                Confirm New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 pr-10"
                                    placeholder="Confirm your new password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                            {passwordData.confirmPassword && !doPasswordsMatch && (
                                <p className="text-xs text-red-400">Passwords do not match</p>
                            )}
                        </div>
                        
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={loading || !canSubmit}
                                className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Changing...
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Security Tips */}
            <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-yellow-300 mb-1">
                                Security Tips
                            </h4>
                            <ul className="text-sm text-yellow-200/80 space-y-1">
                                <li>• Use a strong, unique password for your StuffHunt account</li>
                                <li>• Never share your password with anyone</li>
                                <li>• Consider using a password manager for better security</li>
                                <li>• If you suspect unauthorized access, change your password immediately</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
