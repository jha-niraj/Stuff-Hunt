"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Store, Building, MapPin, Phone, FileText, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { completeSellerOnboarding, getUserOnboardingData } from "@/actions/onboarding.action"
import { toast } from "sonner"

interface FormData {
    companyName: string
    businessType: string
    gstNumber: string
    panNumber: string
    businessAddress: string
    phoneNumber: string
}

export default function OnboardingPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [userData, setUserData] = useState<any>(null)
    
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        businessType: "",
        gstNumber: "",
        panNumber: "",
        businessAddress: "",
        phoneNumber: ""
    })

    const [errors, setErrors] = useState<Partial<FormData>>({})

    useEffect(() => {
        async function fetchUserData() {
            if (status === "loading") return

            if (!session) {
                router.push("/signin")
                return
            }

            try {
                const data = await getUserOnboardingData()
                setUserData(data)
                
                // If already onboarded, redirect based on role
                if (data.onboardingCompleted) {
                    if (data.role === "SELLER") {
                        router.push("/merchant/dashboard")
                    } else {
                        router.push("/")
                    }
                    return
                }

                // Pre-fill form with existing data
                if (data.role === "SELLER") {
                    setFormData({
                        companyName: data.companyName || "",
                        businessType: data.businessType || "",
                        gstNumber: data.gstNumber || "",
                        panNumber: data.panNumber || "",
                        businessAddress: data.businessAddress || "",
                        phoneNumber: data.phoneNumber || ""
                    })
                }
                
                setLoading(false)
            } catch (error) {
                console.error("Error fetching user data:", error)
                toast.error("Failed to load user data")
                setLoading(false)
            }
        }

        fetchUserData()
    }, [session, status, router])

    const validateForm = () => {
        const newErrors: Partial<FormData> = {}

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required"
        }

        if (!formData.businessType) {
            newErrors.businessType = "Business type is required"
        }

        if (!formData.panNumber.trim()) {
            newErrors.panNumber = "PAN number is required"
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
            newErrors.panNumber = "Invalid PAN number format"
        }

        if (!formData.businessAddress.trim()) {
            newErrors.businessAddress = "Business address is required"
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required"
        } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number"
        }

        if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
            newErrors.gstNumber = "Invalid GST number format"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Please fix the errors in the form")
            return
        }

        setSubmitting(true)

        try {
            await completeSellerOnboarding({
                companyName: formData.companyName,
                businessType: formData.businessType,
                gstNumber: formData.gstNumber || undefined,
                panNumber: formData.panNumber,
                businessAddress: formData.businessAddress,
                phoneNumber: formData.phoneNumber
            })

            toast.success("Onboarding completed successfully!")
            router.push("/merchant/dashboard")
        } catch (error) {
            console.error("Error completing onboarding:", error)
            toast.error("Failed to complete onboarding. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <p className="text-white text-lg">Loading onboarding...</p>
                </div>
            </div>
        )
    }

    if (userData?.role !== "SELLER") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white">Onboarding Complete</CardTitle>
                        <CardDescription className="text-gray-300">
                            Welcome to StuffHunt! Your account is ready to use.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            onClick={() => router.push("/")}
                            className="w-full bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
                        >
                            Continue to StuffHunt
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Store className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">
                            Complete Your Seller Profile
                        </h1>
                        <p className="text-gray-300 text-lg">
                            We need some business information to set up your seller account
                        </p>
                    </div>

                    {/* Form */}
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Building className="w-5 h-5 text-[#FF6EC7]" />
                                Business Information
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                This information will be used for your seller profile and compliance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="companyName" className="text-white">
                                        Company Name *
                                    </Label>
                                    <Input
                                        id="companyName"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                                        placeholder="Enter your company name"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-400 text-sm">{errors.companyName}</p>
                                    )}
                                </div>

                                {/* Business Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="businessType" className="text-white">
                                        Business Type *
                                    </Label>
                                    <Select
                                        value={formData.businessType}
                                        onValueChange={(value) => handleInputChange("businessType", value)}
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
                                    {errors.businessType && (
                                        <p className="text-red-400 text-sm">{errors.businessType}</p>
                                    )}
                                </div>

                                {/* PAN Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="panNumber" className="text-white flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-[#DF87F3]" />
                                        PAN Number *
                                    </Label>
                                    <Input
                                        id="panNumber"
                                        value={formData.panNumber}
                                        onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    {errors.panNumber && (
                                        <p className="text-red-400 text-sm">{errors.panNumber}</p>
                                    )}
                                </div>

                                {/* GST Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="gstNumber" className="text-white flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-[#FF6EC7]" />
                                        GST Number (Optional)
                                    </Label>
                                    <Input
                                        id="gstNumber"
                                        value={formData.gstNumber}
                                        onChange={(e) => handleInputChange("gstNumber", e.target.value.toUpperCase())}
                                        placeholder="22AAAAA0000A1Z5"
                                        maxLength={15}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    {errors.gstNumber && (
                                        <p className="text-red-400 text-sm">{errors.gstNumber}</p>
                                    )}
                                </div>

                                {/* Business Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="businessAddress" className="text-white flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-[#DF87F3]" />
                                        Business Address *
                                    </Label>
                                    <Textarea
                                        id="businessAddress"
                                        value={formData.businessAddress}
                                        onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                                        placeholder="Enter your complete business address"
                                        rows={3}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    {errors.businessAddress && (
                                        <p className="text-red-400 text-sm">{errors.businessAddress}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-white flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-[#FF6EC7]" />
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                        placeholder="9876543210"
                                        maxLength={10}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-400 text-sm">{errors.phoneNumber}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white py-3 text-lg font-semibold"
                                >
                                    {submitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Completing Setup...
                                        </div>
                                    ) : (
                                        "Complete Setup & Go to Dashboard"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
