"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { submitContactForm, type ContactFormData } from "@/actions/contact.action"
import { toast } from "sonner"
import { Mail, Phone, Clock, Users, Package, Zap, Shield, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

const productTypes = [
	"Apparel & Clothing",
	"Promotional Items",
	"Tech Accessories",
	"Office Supplies",
	"Bags & Totes",
	"Drinkware",
	"Awards & Recognition",
	"Trade Show Materials",
	"Custom Packaging",
	"Other"
]

const businessTypes = [
	"Corporate",
	"Non-profit",
	"Educational Institution",
	"Healthcare",
	"Government",
	"Retail",
	"Event Planning",
	"Marketing Agency",
	"Sports Team/Club",
	"Other"
]

const companySize = [
	"1-10 employees",
	"11-50 employees",
	"51-200 employees",
	"201-500 employees",
	"500+ employees"
]

const quantityRanges = [
	"25-100 items",
	"100-500 items",
	"500-1,000 items",
	"1,000-5,000 items",
	"5,000+ items"
]

const budgetRanges = [
	"Under $1,000",
	"$1,000 - $5,000",
	"$5,000 - $10,000",
	"$10,000 - $25,000",
	"$25,000+"
]

const timelineOptions = [
	"ASAP (Rush order)",
	"1-2 weeks",
	"3-4 weeks",
	"1-2 months",
	"3+ months",
	"Flexible"
]

const hearAboutOptions = [
	"Google Search",
	"Social Media",
	"Referral",
	"Trade Show",
	"Email Marketing",
	"Previous Customer",
	"Other"
]

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const formData = new FormData(e.currentTarget)

			const contactData: ContactFormData = {
				firstName: formData.get("firstName") as string,
				lastName: formData.get("lastName") as string,
				email: formData.get("email") as string,
				phone: formData.get("phone") as string || undefined,
				company: formData.get("company") as string,
				jobTitle: formData.get("jobTitle") as string || undefined,
				website: formData.get("website") as string || undefined,
				businessType: formData.get("businessType") as string,
				industryType: formData.get("industryType") as string || undefined,
				companySize: formData.get("companySize") as string,
				productTypes: selectedProductTypes,
				estimatedQuantity: formData.get("estimatedQuantity") as string,
				estimatedBudget: formData.get("estimatedBudget") as string || undefined,
				timeline: formData.get("timeline") as string || undefined,
				projectDescription: formData.get("projectDescription") as string,
				customizationNeeds: formData.get("customizationNeeds") as string || undefined,
				specialRequirements: formData.get("specialRequirements") as string || undefined,
				hearAboutUs: formData.get("hearAboutUs") as string || undefined,
				previousExperience: formData.get("previousExperience") === "on"
			}

			const result = await submitContactForm(contactData)

			if (result.success) {
				setIsSubmitted(true)
				toast.success("Thank you! Your inquiry has been submitted successfully.")
			} else {
				toast.error(result.error || "Failed to submit inquiry. Please try again.")
			}
		} catch (error) {
			console.error("Contact form error:", error)
			toast.error("An error occurred. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleProductTypeChange = (productType: string, checked: boolean) => {
		if (checked) {
			setSelectedProductTypes(prev => [...prev, productType])
		} else {
			setSelectedProductTypes(prev => prev.filter(type => type !== productType))
		}
	}

	if (isSubmitted) {
		return (
			<div className="min-h-dvh flex flex-col">
				<main className="flex-1">
					<section className="container mx-auto px-4 py-10 md:py-16">
						<div className="max-w-2xl mx-auto text-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<CheckCircle className="w-8 h-8 text-green-600" />
							</div>
							<h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
								Thank You!
							</h1>
							<p className="text-muted-foreground text-lg mb-6">
								Your bulk order inquiry has been submitted successfully. Our team will review your requirements and get back to you within 1-2 business days.
							</p>
							<div className="bg-muted/50 rounded-lg p-6 mb-8">
								<h3 className="font-semibold mb-2">What happens next?</h3>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Our bulk sales team will review your requirements</li>
									<li>• We&apos;ll prepare a customized quote based on your needs</li>
									<li>• A team member will contact you to discuss details</li>
									<li>• We&apos;ll provide samples if needed</li>
								</ul>
							</div>
							<div className="flex gap-4 justify-center">
								<Button asChild>
									<Link href="/products">Browse Products</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="/">Back to Home</Link>
								</Button>
							</div>
						</div>
					</section>
				</main>
			</div>
		)
	}

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
					<div className="container mx-auto px-4 py-16 md:py-24">
						<div className="max-w-4xl mx-auto text-center">
							<Badge variant="secondary" className="mb-4">Bulk Orders & Custom Solutions</Badge>
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
								Let&apos;s Create Something
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Amazing</span>
							</h1>
							<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
								From corporate gifts to promotional campaigns, we help businesses of all sizes create custom products that make an impact.
							</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
								<div className="text-center">
									<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
										<Zap className="w-6 h-6 text-blue-600" />
									</div>
									<p className="text-sm font-medium">Fast Turnaround</p>
								</div>
								<div className="text-center">
									<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
										<Shield className="w-6 h-6 text-green-600" />
									</div>
									<p className="text-sm font-medium">Quality Guaranteed</p>
								</div>
								<div className="text-center">
									<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
										<Users className="w-6 h-6 text-purple-600" />
									</div>
									<p className="text-sm font-medium">Dedicated Support</p>
								</div>
								<div className="text-center">
									<div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
										<Award className="w-6 h-6 text-orange-600" />
									</div>
									<p className="text-sm font-medium">Custom Branding</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="container mx-auto px-4 py-16">
					<div className="grid lg:grid-cols-[1fr_400px] gap-12 max-w-6xl mx-auto">
						<div>
							<h2 className="text-3xl font-semibold mb-6">Tell us about your project</h2>
							<form onSubmit={handleSubmit} className="space-y-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Mail className="w-5 h-5" />
											Contact Information
										</CardTitle>
										<CardDescription>
											Let us know how to reach you
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="firstName">First Name *</Label>
												<Input id="firstName" name="firstName" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="lastName">Last Name *</Label>
												<Input id="lastName" name="lastName" required />
											</div>
										</div>
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="email">Email *</Label>
												<Input id="email" name="email" type="email" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="phone">Phone</Label>
												<Input id="phone" name="phone" type="tel" />
											</div>
										</div>
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="company">Company *</Label>
												<Input id="company" name="company" required />
											</div>
											<div className="space-y-2">
												<Label htmlFor="jobTitle">Job Title</Label>
												<Input id="jobTitle" name="jobTitle" />
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="website">Company Website</Label>
											<Input id="website" name="website" type="url" placeholder="https://" />
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Users className="w-5 h-5" />
											Business Information
										</CardTitle>
										<CardDescription>
											Help us understand your business better
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="businessType">Business Type *</Label>
												<Select name="businessType" required>
													<SelectTrigger>
														<SelectValue placeholder="Select business type" />
													</SelectTrigger>
													<SelectContent>
														{businessTypes.map(type => (
															<SelectItem key={type} value={type}>{type}</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2">
												<Label htmlFor="companySize">Company Size *</Label>
												<Select name="companySize" required>
													<SelectTrigger>
														<SelectValue placeholder="Select company size" />
													</SelectTrigger>
													<SelectContent>
														{companySize.map(size => (
															<SelectItem key={size} value={size}>{size}</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="industryType">Industry (Optional)</Label>
											<Input id="industryType" name="industryType" placeholder="e.g., Technology, Healthcare, Education" />
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Package className="w-5 h-5" />
											Order Information
										</CardTitle>
										<CardDescription>
											Tell us about what you need
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label>Product Types * (Select all that apply)</Label>
											<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
												{
													productTypes.map(type => (
														<div key={type} className="flex items-center space-x-2">
															<Checkbox
																id={type}
																checked={selectedProductTypes.includes(type)}
																onCheckedChange={(checked) => handleProductTypeChange(type, checked as boolean)}
															/>
															<Label htmlFor={type} className="text-sm">{type}</Label>
														</div>
													))
												}
											</div>
										</div>
										<div className="grid md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="estimatedQuantity">Estimated Quantity *</Label>
												<Select name="estimatedQuantity" required>
													<SelectTrigger>
														<SelectValue placeholder="Select quantity range" />
													</SelectTrigger>
													<SelectContent>
														{
															quantityRanges.map(range => (
																<SelectItem key={range} value={range}>{range}</SelectItem>
															))
														}
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2">
												<Label htmlFor="estimatedBudget">Estimated Budget</Label>
												<Select name="estimatedBudget">
													<SelectTrigger>
														<SelectValue placeholder="Select budget range" />
													</SelectTrigger>
													<SelectContent>
														{
															budgetRanges.map(range => (
																<SelectItem key={range} value={range}>{range}</SelectItem>
															))
														}
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="timeline">Timeline</Label>
											<Select name="timeline">
												<SelectTrigger>
													<SelectValue placeholder="When do you need this?" />
												</SelectTrigger>
												<SelectContent>
													{
														timelineOptions.map(option => (
															<SelectItem key={option} value={option}>{option}</SelectItem>
														))
													}
												</SelectContent>
											</Select>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Project Details</CardTitle>
										<CardDescription>
											Provide more details about your project
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="projectDescription">Project Description *</Label>
											<Textarea
												id="projectDescription"
												name="projectDescription"
												placeholder="Describe your project, intended use, target audience, etc."
												className="min-h-[100px]"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="customizationNeeds">Customization Needs</Label>
											<Textarea
												id="customizationNeeds"
												name="customizationNeeds"
												placeholder="Describe any branding, logos, custom designs, or personalization needed"
												className="min-h-[80px]"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="specialRequirements">Special Requirements</Label>
											<Textarea
												id="specialRequirements"
												name="specialRequirements"
												placeholder="Any special packaging, shipping, or other requirements"
												className="min-h-[80px]"
											/>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Additional Information</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="hearAboutUs">How did you hear about us?</Label>
											<Select name="hearAboutUs">
												<SelectTrigger>
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>
												<SelectContent>
													{
														hearAboutOptions.map(option => (
															<SelectItem key={option} value={option}>{option}</SelectItem>
														))
													}
												</SelectContent>
											</Select>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox id="previousExperience" name="previousExperience" />
											<Label htmlFor="previousExperience">
												I have experience with bulk/custom orders
											</Label>
										</div>
									</CardContent>
								</Card>
								<Button type="submit" size="lg" className="w-full" disabled={isSubmitting || selectedProductTypes.length === 0}>
									{isSubmitting ? "Submitting..." : "Submit Inquiry"}
								</Button>
							</form>
						</div>
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Get in Touch</CardTitle>
									<CardDescription>
										Prefer to talk? We&apos;re here to help
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center gap-3">
										<Phone className="w-5 h-5 text-muted-foreground" />
										<div>
											<p className="font-medium">(555) 123-4567</p>
											<p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Mail className="w-5 h-5 text-muted-foreground" />
										<div>
											<p className="font-medium">bulk@stuffhunt.com</p>
											<p className="text-sm text-muted-foreground">For bulk inquiries</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Clock className="w-5 h-5 text-muted-foreground" />
										<div>
											<p className="font-medium">1-2 Business Days</p>
											<p className="text-sm text-muted-foreground">Average response time</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Why Choose Us?</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
										<div>
											<p className="font-medium">Quality Guarantee</p>
											<p className="text-sm text-muted-foreground">100% satisfaction or money back</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
										<div>
											<p className="font-medium">Competitive Pricing</p>
											<p className="text-sm text-muted-foreground">Best prices for bulk orders</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
										<div>
											<p className="font-medium">Custom Branding</p>
											<p className="text-sm text-muted-foreground">Your logo, your way</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
										<div>
											<p className="font-medium">Fast Turnaround</p>
											<p className="text-sm text-muted-foreground">Rush orders available</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}