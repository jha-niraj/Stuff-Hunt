"use client"

import { useState } from "react"
import { useUserStore } from "@/stores/useUserStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, Building, MapPin, Phone, FileText, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import { User } from "@prisma/client"
import { UserProfileUpdateData } from "@/types/user"

interface BusinessFormProps {
    user: User
}

export function BusinessForm({ user }: BusinessFormProps) {
    const { updateProfile, loading } = useUserStore()
    const [formData, setFormData] = useState({
        companyName: user.companyName || "",
        businessType: user.businessType || "",
        gstNumber: user.gstNumber || "",
        panNumber: user.panNumber || "",
        businessAddress: user.businessAddress || "",
        phoneNumber: user.phoneNumber || ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // This would typically call a different API endpoint for business info
            // For now, we'll use the same updateProfile endpoint
            await updateProfile(formData as UserProfileUpdateData)
            toast.success("Business information updated successfully!")
        } catch (error) {
            console.log("Error updating business information:", error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Failed to update business information")
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        Business Verification Status
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        Your current business verification and KYC status
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">KYC Status</Label>
                        <Badge
                            variant={user.kycStatus === 'APPROVED' ? 'default' : 'secondary'}
                            className={`${user.kycStatus === 'APPROVED'
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : user.kycStatus === 'REJECTED'
                                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                }`}
                        >
                            {user.kycStatus === 'APPROVED' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {user.kycStatus === 'REJECTED' && <AlertCircle className="mr-1 h-3 w-3" />}
                            {user.kycStatus}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Verification Badge</Label>
                        <Badge
                            variant={user.verificationBadge ? 'default' : 'secondary'}
                            className={`${user.verificationBadge
                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                }`}
                        >
                            {
                                user.verificationBadge ? (
                                    <>
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Verified
                                    </>
                                ) : (
                                    'Not Verified'
                                )
                            }
                        </Badge>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Building className="h-5 w-5 text-[#FF6EC7]" />
                        Business Details
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        Update your business information for compliance and verification
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-white">
                                Company Name *
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessType" className="text-white">
                                Business Type *
                            </Label>
                            <Select
                                value={formData.businessType}
                                onValueChange={(value) => handleSelectChange("businessType", value)}
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="private_limited">Private Limited Company</SelectItem>
                                    <SelectItem value="public_limited">Public Limited Company</SelectItem>
                                    <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="panNumber" className="text-white flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-[#DF87F3]" />
                                    PAN Number *
                                </Label>
                                <Input
                                    id="panNumber"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleChange}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gstNumber" className="text-white flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#FF6EC7]" />
                                    GST Number (Optional)
                                </Label>
                                <Input
                                    id="gstNumber"
                                    name="gstNumber"
                                    value={formData.gstNumber}
                                    onChange={handleChange}
                                    placeholder="22AAAAA0000A1Z5"
                                    maxLength={15}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessAddress" className="text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#DF87F3]" />
                                Business Address *
                            </Label>
                            <Textarea
                                id="businessAddress"
                                name="businessAddress"
                                value={formData.businessAddress}
                                onChange={handleChange}
                                placeholder="Enter your complete business address"
                                rows={3}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-white flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#FF6EC7]" />
                                Phone Number *
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="9876543210"
                                maxLength={10}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
                            >
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Business Information"
                                    )
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-300 mb-1">
                                Need Help with Verification?
                            </h4>
                            <p className="text-sm text-blue-200/80">
                                Make sure all your business information is accurate and up-to-date.
                                Our verification team will review your details and update your KYC status.
                                This may take 2-3 business days.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}