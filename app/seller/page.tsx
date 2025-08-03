"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, TrendingUp, Users, Zap, ArrowRight, Store, Package, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SellerLandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6EC7] via-[#DF87F3] to-transparent opacity-10" />
                
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-black bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] bg-clip-text text-transparent">
                                StuffHunt
                            </h1>
                        </div>

                        {/* Main heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight"
                        >
                            Start Selling
                            <span className="block bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] bg-clip-text text-transparent">
                                Your Products
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Join India's fastest-growing AI-powered marketplace. Reach millions of customers and grow your business with intelligent product discovery.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link href="/signin?role=seller">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                                >
                                    <Store className="w-5 h-5 mr-2" />
                                    Sign In as Seller
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            
                            <Link href="/signup?role=seller">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-[#FF6EC7] text-[#FF6EC7] hover:bg-[#FF6EC7] hover:text-white px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                                >
                                    <Users className="w-5 h-5 mr-2" />
                                    Create Seller Account
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-4xl font-black text-white mb-4">
                        Why Choose <span className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] bg-clip-text text-transparent">StuffHunt?</span>
                    </h3>
                    <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                        Powerful tools and AI-driven features to boost your sales and reach the right customers
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Zap className="w-8 h-8" />,
                            title: "AI-Powered Listings",
                            description: "Upload product images and let our AI generate compelling descriptions and categorizations automatically.",
                            color: "from-[#FF6EC7] to-[#DF87F3]"
                        },
                        {
                            icon: <TrendingUp className="w-8 h-8" />,
                            title: "Smart Product Discovery",
                            description: "Customers find your products through keyword search and image-based AI matching for maximum visibility.",
                            color: "from-[#DF87F3] to-[#FF6EC7]"
                        },
                        {
                            icon: <BarChart3 className="w-8 h-8" />,
                            title: "Advanced Analytics",
                            description: "Track product views, sales performance, and customer engagement with detailed insights and reports.",
                            color: "from-[#FF6EC7] to-[#DF87F3]"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 h-full">
                                <CardHeader className="text-center">
                                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-white`}>
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-white text-xl font-bold">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-300 text-center leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "10,000+", label: "Products Listed" },
                            { number: "1M+", label: "Monthly Searches" },
                            { number: "500+", label: "Active Sellers" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-black bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300 text-lg">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-r from-[#FF6EC7]/10 to-[#DF87F3]/10 rounded-3xl p-12 border border-[#FF6EC7]/20"
                >
                    <Package className="w-16 h-16 mx-auto mb-6 text-[#FF6EC7]" />
                    <h3 className="text-4xl font-black text-white mb-4">
                        Ready to Start Selling?
                    </h3>
                    <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of successful sellers and start growing your business today
                    </p>
                    <Link href="/signup?role=seller">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <Store className="w-6 h-6 mr-3" />
                            Create Your Seller Account
                            <ArrowRight className="w-6 h-6 ml-3" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
