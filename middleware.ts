import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Protected routes that require authentication
const protectedRoutes = [
	'/seller',
	'/admin',
	'/profile',
	'/settings',
	'/onboarding',
	'/orders',
	'/wishlist',
	'/cart',
	'/checkout'
]

// Seller-specific routes that require SELLER role
const sellerRoutes = [
	'/seller/dashboard',
	'/seller/products',
	'/seller/orders',
	'/seller/analytics',
	'/seller/settings'
]

// Admin-specific routes that require ADMIN role
const adminRoutes = [
	'/admin/dashboard',
	'/admin/users',
	'/admin/products',
	'/admin/orders',
	'/admin/analytics'
]

// Public routes that don't require authentication
const publicRoutes = [
	'/',
	'/products',
	'/categories',
	'/search',
	'/signin',
	'/signup',
	'/verify',
	'/waiting',
	'/forgotpassword',
	'/resetpassword',
	'/error',
	'/about',
	'/contact',
	'/privacy',
	'/terms',
	'/seller' // Seller landing page is public
]

// API routes that should be excluded from auth checks
const apiRoutes = [
	'/api/auth',
	'/api/health',
	'/api/register',
	'/api/verify',
	'/api/forgot-password',
	'/api/reset-password',
	'/api/resend-verification',
	'/api/products/public',
	'/api/categories'
]

export default auth((req) => {
	const { nextUrl } = req
	
	// Allow API routes to pass through
	if (apiRoutes.some(route => nextUrl.pathname.startsWith(route))) {
		return NextResponse.next()
	}

	// Allow static files and Next.js internals
	if (
		nextUrl.pathname.startsWith('/_next/') ||
		nextUrl.pathname.startsWith('/api/') ||
		nextUrl.pathname.includes('.')
	) {
		return NextResponse.next()
	}

	const isLoggedIn = !!req.auth
	const userRole = req.auth?.user?.role

	// Check if current path is a protected route
	const isProtectedRoute = protectedRoutes.some(route =>
		nextUrl.pathname.startsWith(route)
	)

	// Check if current path is a public route
	const isPublicRoute = publicRoutes.some(route =>
		nextUrl.pathname === route || (route !== '/' && nextUrl.pathname.startsWith(route))
	)

	// Check role-specific routes
	const isSellerRoute = sellerRoutes.some(route =>
		nextUrl.pathname.startsWith(route)
	)
	
	const isAdminRoute = adminRoutes.some(route =>
		nextUrl.pathname.startsWith(route)
	)

	// If user is not logged in and trying to access protected route
	if (!isLoggedIn && isProtectedRoute) {
		const signInUrl = new URL('/signin', nextUrl.origin)
		signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
		return NextResponse.redirect(signInUrl)
	}

	// Role-based access control
	if (isLoggedIn) {
		// Check seller route access
		if (isSellerRoute && userRole !== 'SELLER') {
			// If not a seller, redirect to seller landing page
			return NextResponse.redirect(new URL('/seller', nextUrl.origin))
		}

		// Check admin route access
		if (isAdminRoute && userRole !== 'ADMIN') {
			// If not an admin, redirect to home
			return NextResponse.redirect(new URL('/', nextUrl.origin))
		}

		// Handle post-login redirection logic
		if (nextUrl.pathname === '/signin' || nextUrl.pathname === '/signup') {
			// Redirect based on user role after login
			if (userRole === 'SELLER') {
				return NextResponse.redirect(new URL('/seller/dashboard', nextUrl.origin))
			} else if (userRole === 'ADMIN') {
				return NextResponse.redirect(new URL('/admin/dashboard', nextUrl.origin))
			} else {
				return NextResponse.redirect(new URL('/', nextUrl.origin))
			}
		}

		// For the root path, redirect based on role
		if (nextUrl.pathname === '/' && nextUrl.search === '') {
			if (userRole === 'SELLER') {
				return NextResponse.redirect(new URL('/seller/dashboard', nextUrl.origin))
			} else if (userRole === 'ADMIN') {
				return NextResponse.redirect(new URL('/admin/dashboard', nextUrl.origin))
			}
			// Regular users stay on home page
		}
	}

	return NextResponse.next()
})

export const config = {
	// More specific matcher to avoid catching static files and API routes
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder files
		 * - files with extensions (images, etc.)
		 * - webhook endpoints
		 */
		'/((?!api/auth|_next/static|_next/image|favicon.ico|public/|.*\\..*).*)',
	],
}