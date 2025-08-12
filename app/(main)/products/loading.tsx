import { Skeleton } from "@/components/ui/skeleton"

function FiltersSkeleton() {
	return (
		<div className="rounded-xl border p-4 md:p-5 grid gap-4">
			<div className="grid gap-2">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="grid gap-2">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="grid gap-2">
				<Skeleton className="h-4 w-12" />
				<Skeleton className="h-9 w-full" />
			</div>
			<Skeleton className="h-9 w-24" />
		</div>
	)
}

function CardSkeleton() {
	return (
		<div className="rounded-xl border overflow-hidden">
			<Skeleton className="aspect-square w-full" />
			<div className="p-4 space-y-3">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/3" />
				<Skeleton className="h-8 w-24" />
			</div>
		</div>
	)
}

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8 md:py-12">
			<div className="mb-6 md:mb-8">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="mt-2 h-4 w-80" />
			</div>
			<div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
				<aside className="hidden lg:block">
					<FiltersSkeleton />
				</aside>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{
						Array.from({ length: 8 }).map((_, i) => (
							<CardSkeleton key={i} />
						))
					}
				</div>
			</div>
		</div>
	)
}