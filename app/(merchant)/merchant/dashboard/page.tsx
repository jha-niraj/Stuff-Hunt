"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
    Package, IndianRupee, Plus, Eye, ShoppingCart,
    Star, BarChart3, Bell, Settings, Store, ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMerchantStore } from "@/stores/useMerchantStore"
import { format } from "date-fns"

export default function SellerDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const {
        dashboardData,
        dashboardLoading,
        dashboardError,
        fetchDashboardData
    } = useMerchantStore()

    useEffect(() => {
        if (status === "loading") return

        if (!session) {
            router.push("/signin?role=seller")
            return
        }

        if (session.user.role !== "SELLER") {
            router.push("/")
            return
        }

        // Fetch dashboard data
        fetchDashboardData()
    }, [session, status, router, fetchDashboardData])

    if (status === "loading" || dashboardLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <p className="text-white text-lg">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (dashboardError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white text-lg mb-2">Error loading dashboard</p>
                    <p className="text-gray-400 mb-4">{dashboardError}</p>
                    <Button onClick={fetchDashboardData}>Try Again</Button>
                </div>
            </div>
        )
    }

    if (!dashboardData) {
        return null
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE": return "bg-green-500"
            case "INACTIVE": return "bg-red-500"
            case "DRAFT": return "bg-yellow-500"
            case "DELIVERED": case "COMPLETED": return "bg-green-500"
            case "SHIPPED": return "bg-blue-500"
            case "PROCESSING": return "bg-orange-500"
            case "PENDING": return "bg-yellow-500"
            case "CONFIRMED": return "bg-blue-500"
            default: return "bg-gray-500"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-xl flex items-center justify-center">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Seller Dashboard</h1>
                                <p className="text-gray-400">Welcome back, {session?.user?.name || 'Seller'}!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                            <Bell className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Notifications</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                            <Settings className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Settings</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Avatar>
                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                <AvatarFallback className="bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] text-white">
                                    {session?.user?.name?.charAt(0) || 'S'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Total Products</CardTitle>
                                <Package className="h-4 w-4 text-[#FF6EC7]" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{dashboardData.stats.totalProducts}</div>
                                <p className="text-xs text-gray-400 flex items-center">
                                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                    +{dashboardData.stats.monthlyGrowth.products}% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-[#DF87F3]" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{dashboardData.stats.totalOrders}</div>
                                <p className="text-xs text-gray-400 flex items-center">
                                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                    +{dashboardData.stats.monthlyGrowth.orders}% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                                <IndianRupee className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">₹{dashboardData.stats.totalRevenue.toLocaleString()}</div>
                                <p className="text-xs text-gray-400 flex items-center">
                                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                    +{dashboardData.stats.monthlyGrowth.revenue}% from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Average Rating</CardTitle>
                                <Star className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{dashboardData.stats.averageRating.toFixed(1)}</div>
                                <p className="text-xs text-gray-400 flex items-center">
                                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                    +{dashboardData.stats.monthlyGrowth.rating.toFixed(1)} from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8"
                >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Quick Actions</CardTitle>
                            <CardDescription className="text-gray-400">
                                Common tasks to manage your store
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button
                                    className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white h-auto p-4 flex-col gap-2"
                                    onClick={() => router.push('/merchant/products/upload')}
                                >
                                    <Plus className="w-6 h-6" />
                                    <span className="font-semibold">Add New Product</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#FF6EC7] text-[#FF6EC7] hover:bg-[#FF6EC7] hover:text-white h-auto p-4 flex-col gap-2"
                                    onClick={() => router.push('/merchant/orders')}
                                >
                                    <Eye className="w-6 h-6" />
                                    <span className="font-semibold">View Orders</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#DF87F3] text-[#DF87F3] hover:bg-[#DF87F3] hover:text-white h-auto p-4 flex-col gap-2"
                                    onClick={() => router.push('/merchant/analytics')}
                                >
                                    <BarChart3 className="w-6 h-6" />
                                    <span className="font-semibold">View Analytics</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <div className="grid lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[#FF6EC7]" />
                                    Recent Products
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Your latest product listings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {
                                    dashboardData.recentProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                            <div>
                                                <p className="font-medium text-white">{product.name}</p>
                                                <p className="text-sm text-gray-400">₹{product.price.toLocaleString()}</p>
                                                <p className="text-xs text-gray-500">
                                                    {product.viewCount} views • {product.orderCount} orders
                                                </p>
                                            </div>
                                            <Badge className={`${getStatusColor(product.status)} text-white`}>
                                                {product.status}
                                            </Badge>
                                        </div>
                                    ))
                                }
                                <Button
                                    variant="ghost"
                                    className="w-full text-[#FF6EC7] hover:bg-[#FF6EC7]/10"
                                    onClick={() => router.push('/merchant/products')}
                                >
                                    View All Products
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-[#DF87F3]" />
                                    Recent Orders
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Latest customer orders
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {
                                    dashboardData.recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                            <div>
                                                <p className="font-medium text-white">{order.customerName}</p>
                                                <p className="text-sm text-gray-400">{format(new Date(order.createdAt), 'MMM d, yyyy')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-white">₹{order.amount.toLocaleString()}</p>
                                                <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                }
                                <Button
                                    variant="ghost"
                                    className="w-full text-[#DF87F3] hover:bg-[#DF87F3]/10"
                                    onClick={() => router.push('/merchant/orders')}
                                >
                                    View All Orders
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}