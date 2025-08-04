"use client"

import { useState, useRef } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Upload, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "@prisma/client"

interface ProfileFormProps {
    user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
    const { updateProfile, uploadProfileImage, loading, updateUser } = useUserStore()
    const [imageUploading, setImageUploading] = useState(false)
    const imageInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        name: user.name || "",
        image: user.image || ""
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageUploading(true)

        try {
            const uploadFormData = new FormData()
            uploadFormData.append('image', file)

            await uploadProfileImage(uploadFormData)
            toast.success("Profile image uploaded successfully!")
        } catch (error) {
            console.error('Upload error:', error)
            toast.error("Failed to upload image")
        } finally {
            setImageUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateProfile({
                name: formData.name,
            })
            toast.success("Profile updated successfully!")
        } catch (error) {
            console.error("Error updating profile:", error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                console.error("Unexpected error:", error)
            }
            // Fallback error message
            console.error("Failed to update profile")
            setFormData(prev => ({ ...prev, name: user.name })) // Reset to original name
            toast.error("Failed to update profile")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            image: ""
        }))
        updateUser({ image: "" })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                            <AvatarImage src={user.image || undefined} alt="Profile" />
                            <AvatarFallback className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] text-white text-xl font-bold">
                                {formData.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Label htmlFor="profileImage" className="text-sm font-medium text-white">
                                Profile Image
                            </Label>
                            <p className="text-xs text-gray-400 mb-2">
                                Upload a profile picture (Max 5MB)
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => imageInputRef.current?.click()}
                                    disabled={imageUploading}
                                    className="border-[#FF6EC7]/30 text-[#FF6EC7] hover:bg-[#FF6EC7]/10"
                                >
                                    {imageUploading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Image
                                        </>
                                    )}
                                </Button>
                                {formData.image && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRemoveImage}
                                        className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Information */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-white">
                    Full Name *
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    placeholder="Enter your full name"
                />
            </div>

            {/* Coming Soon Section */}
            <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <h4 className="font-medium text-blue-300 mb-2">More Profile Features Coming Soon!</h4>
                        <p className="text-sm text-blue-200/80">
                            We&apos;re working on adding bio, location, website, and interests fields to help you create a more complete profile.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    disabled={loading || !formData.name.trim()}
                    className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update Profile"
                    )}
                </Button>
            </div>
        </form>
    )
}
