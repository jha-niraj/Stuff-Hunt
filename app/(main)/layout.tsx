'use client'

import OnboardingCheck from '@/components/onboardingcheck';
import { CompareProvider } from '@/contexts/compare-context';
import { CompareFloatingButton } from '@/components/compare-floating-button';
import MainNavbar from '@/components/mainnavbar';

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {

	return (
		<OnboardingCheck>
			<CompareProvider>
				<div className="flex h-screen">
					<MainNavbar isCollapsed={false} />
					<div className="w-full flex flex-col flex-1">
						<main className={`w-full backdrop-blur-sm transition-all duration-300 pt-16`}>
							<div className="max-w-7xl mx-auto h-full pb-16 md:pb-0">
								{children}
							</div>
						</main>
					</div>
					<CompareFloatingButton />
				</div>
			</CompareProvider>
		</OnboardingCheck>
	);
};

export default Layout;