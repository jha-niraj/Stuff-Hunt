'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import OnboardingCheck from '@/components/onboardingcheck';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		const savedState = localStorage.getItem('mainSidebarCollapsed');
		if (savedState !== null) {
			setSidebarCollapsed(JSON.parse(savedState));
		}
	}, []);

	// const toggleSidebar = () => {
	// 	const newState = !sidebarCollapsed;
	// 	setSidebarCollapsed(newState);
	// 	localStorage.setItem('mainSidebarCollapsed', JSON.stringify(newState));
	// };

	return (
		<OnboardingCheck>
			<div className="flex h-screen">
				<Navbar />
				<div className="w-full flex flex-col flex-1">
					<main className={`w-full backdrop-blur-sm transition-all duration-300 pt-16`}>
						<div className="max-w-7xl mx-auto h-full pb-16 md:pb-0">
							{children}
						</div>
					</main>
				</div>
			</div>
		</OnboardingCheck>
	);
};

export default Layout;