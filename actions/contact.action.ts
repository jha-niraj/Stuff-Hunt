"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
	// Contact Information
	firstName: string
	lastName: string
	email: string
	phone?: string
	company: string
	jobTitle?: string
	website?: string

	// Business Information
	businessType: string
	industryType?: string
	companySize: string

	// Order Information
	productTypes: string[]
	estimatedQuantity: string
	estimatedBudget?: string
	timeline?: string

	// Project Details
	projectDescription: string
	customizationNeeds?: string
	specialRequirements?: string

	// Additional Information
	hearAboutUs?: string
	previousExperience: boolean
}

// Submit contact form
export async function submitContactForm(data: ContactFormData) {
	try {
		// Create contact submission in database
		const submission = await prisma.contactSubmission.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				company: data.company,
				jobTitle: data.jobTitle,
				website: data.website,
				businessType: data.businessType,
				industryType: data.industryType,
				companySize: data.companySize,
				productTypes: data.productTypes,
				estimatedQuantity: data.estimatedQuantity,
				estimatedBudget: data.estimatedBudget,
				timeline: data.timeline,
				projectDescription: data.projectDescription,
				customizationNeeds: data.customizationNeeds,
				specialRequirements: data.specialRequirements,
				hearAboutUs: data.hearAboutUs,
				previousExperience: data.previousExperience,
			}
		})

		// Send notification email to admin
		try {
			await resend.emails.send({
				from: 'StuffHunt <noreply@stuffhunt.com>',
				to: ['admin@stuffhunt.com'], // Replace with actual admin email
				subject: `New Bulk Order Inquiry from ${data.company}`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Bulk Order Inquiry
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${data.company}</p>
              <p><strong>Job Title:</strong> ${data.jobTitle || 'Not provided'}</p>
              <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Business Information</h3>
              <p><strong>Business Type:</strong> ${data.businessType}</p>
              <p><strong>Industry:</strong> ${data.industryType || 'Not specified'}</p>
              <p><strong>Company Size:</strong> ${data.companySize}</p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Order Details</h3>
              <p><strong>Product Types:</strong> ${data.productTypes.join(', ')}</p>
              <p><strong>Estimated Quantity:</strong> ${data.estimatedQuantity}</p>
              <p><strong>Estimated Budget:</strong> ${data.estimatedBudget || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Project Description</h3>
              <p>${data.projectDescription}</p>
              
              ${data.customizationNeeds ? `
                <h4 style="color: #007bff;">Customization Needs</h4>
                <p>${data.customizationNeeds}</p>
              ` : ''}
              
              ${data.specialRequirements ? `
                <h4 style="color: #007bff;">Special Requirements</h4>
                <p>${data.specialRequirements}</p>
              ` : ''}
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Additional Information</h3>
              <p><strong>How they heard about us:</strong> ${data.hearAboutUs || 'Not specified'}</p>
              <p><strong>Previous bulk order experience:</strong> ${data.previousExperience ? 'Yes' : 'No'}</p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #007bff; color: white; border-radius: 8px;">
              <p style="margin: 0;"><strong>Submission ID:</strong> ${submission.id}</p>
              <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `
			})
		} catch (emailError) {
			console.error('Failed to send notification email:', emailError)
			// Don't fail the entire operation if email fails
		}

		// Send confirmation email to customer
		try {
			await resend.emails.send({
				from: 'StuffHunt <noreply@stuffhunt.com>',
				to: [data.email],
				subject: 'Thank you for your bulk order inquiry - StuffHunt',
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">Thank you for your inquiry!</h2>
            
            <p>Dear ${data.firstName},</p>
            
            <p>Thank you for reaching out to StuffHunt regarding your bulk order needs. We've received your inquiry and our team will review it shortly.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">What happens next?</h3>
              <ul style="padding-left: 20px;">
                <li>Our bulk sales team will review your requirements</li>
                <li>We'll prepare a customized quote based on your needs</li>
                <li>A team member will contact you within 1-2 business days</li>
                <li>We'll discuss customization options and timeline</li>
              </ul>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Your Inquiry Summary</h3>
              <p><strong>Company:</strong> ${data.company}</p>
              <p><strong>Product Types:</strong> ${data.productTypes.join(', ')}</p>
              <p><strong>Estimated Quantity:</strong> ${data.estimatedQuantity}</p>
              <p><strong>Timeline:</strong> ${data.timeline || 'To be discussed'}</p>
            </div>

            <p>If you have any urgent questions or need to add additional information, please don't hesitate to contact us at <a href="mailto:bulk@stuffhunt.com">bulk@stuffhunt.com</a> or call us at (555) 123-4567.</p>
            
            <p>We look forward to working with you!</p>
            
            <p>Best regards,<br>
            The StuffHunt Bulk Sales Team</p>
            
            <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
              <p style="margin: 0;"><strong>Reference ID:</strong> ${submission.id}</p>
            </div>
          </div>
        `
			})
		} catch (emailError) {
			console.error('Failed to send confirmation email:', emailError)
		}

		revalidatePath('/contact')
		return { success: true, submissionId: submission.id }
	} catch (error) {
		console.error('Error submitting contact form:', error)
		return { success: false, error: 'Failed to submit contact form. Please try again.' }
	}
}

// Get all contact submissions (for admin)
export async function getContactSubmissions(page: number = 1, limit: number = 20) {
	try {
		const skip = (page - 1) * limit

		const [submissions, total] = await Promise.all([
			prisma.contactSubmission.findMany({
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' }
			}),
			prisma.contactSubmission.count()
		])

		return {
			success: true,
			submissions,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		}
	} catch (error) {
		console.error('Error getting contact submissions:', error)
		return { success: false, error: 'Failed to get contact submissions' }
	}
}

// Update contact submission status
export async function updateContactStatus(id: string, status: string, notes?: string, assignedTo?: string) {
	try {
		const submission = await prisma.contactSubmission.update({
			where: { id },
			data: {
				status: status as any,
				notes,
				assignedTo,
				updatedAt: new Date()
			}
		})

		revalidatePath('/admin/contacts')
		return { success: true, submission }
	} catch (error) {
		console.error('Error updating contact status:', error)
		return { success: false, error: 'Failed to update contact status' }
	}
}