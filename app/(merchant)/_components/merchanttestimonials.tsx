"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
    {
        quote:
            "StuffHunt's AI helped me list 500+ products in just 2 hours. My sales increased by 300% in the first month. The platform is incredibly user-friendly and the support team is amazing.",
        name: "Priya Sharma",
        company: "Fashion Store Owner, Mumbai",
        avatar: "/images/avatars/annette-black.png",
        type: "large-teal",
    },
    {
        quote: "The analytics dashboard gives me insights I never had before. I can see exactly what my customers want.",
        name: "Rajesh Kumar",
        company: "Electronics Seller",
        avatar: "/images/avatars/dianne-russell.png",
        type: "small-dark",
    },
    {
        quote: "Bulk upload feature saved me weeks of work. Listed my entire catalog in one day.",
        name: "Sneha Patel",
        company: "Home Decor",
        avatar: "/images/avatars/cameron-williamson.png",
        type: "small-dark",
    },
    {
        quote: "Customer discovery through AI search brought me customers I never would have reached otherwise.",
        name: "Amit Singh",
        company: "Sports Equipment",
        avatar: "/images/avatars/robert-fox.png",
        type: "small-dark",
    },
    {
        quote: "The commission structure is fair and the payment system is reliable. I get paid on time, every time.",
        name: "Kavya Reddy",
        company: "Beauty Products",
        avatar: "/images/avatars/darlene-robertson.png",
        type: "small-dark",
    },
    {
        quote: "Support team helped me optimize my listings and my conversion rate doubled within a week.",
        name: "Vikram Joshi",
        company: "Books & Stationery",
        avatar: "/images/avatars/cody-fisher.png",
        type: "small-dark",
    },
    {
        quote:
            "From ₹50,000 to ₹5 lakhs monthly revenue in 6 months. StuffHunt's AI recommendations and customer insights helped me understand market demand and optimize my inventory accordingly.",
        name: "Meera Agarwal",
        company: "Handicrafts & Gifts, Jaipur",
        avatar: "/images/avatars/albert-flores.png",
        type: "large-light",
    },
]

const TestimonialCard = ({ quote, name, company, avatar, type, index } : { quote: string; name: string; company: string; avatar: string; type: string; index: number; }) => {
    const isLargeCard = type.startsWith("large")
    const avatarSize = isLargeCard ? 48 : 36
    const avatarBorderRadius = isLargeCard ? "rounded-[41px]" : "rounded-[30.75px]"
    const padding = isLargeCard ? "p-6" : "p-[30px]"

    let cardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding}`
    let quoteClasses = ""
    let nameClasses = ""
    let companyClasses = ""
    let backgroundElements = null
    let cardHeight = ""
    const cardWidth = "w-full md:w-[384px]"

    if (type === "large-teal") {
        cardClasses += " bg-primary"
        quoteClasses += " text-primary-foreground text-2xl font-medium leading-8"
        nameClasses += " text-primary-foreground text-base font-normal leading-6"
        companyClasses += " text-primary-foreground/60 text-base font-normal leading-6"
        cardHeight = "h-[502px]"
        backgroundElements = (
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
            />
        )
    } else if (type === "large-light") {
        cardClasses += " bg-[rgba(231,236,235,0.12)]"
        quoteClasses += " text-foreground text-2xl font-medium leading-8"
        nameClasses += " text-foreground text-base font-normal leading-6"
        companyClasses += " text-muted-foreground text-base font-normal leading-6"
        cardHeight = "h-[502px]"
        backgroundElements = (
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
                style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
            />
        )
    } else {
        cardClasses += " bg-card outline outline-1 outline-border outline-offset-[-1px]"
        quoteClasses += " text-foreground/80 text-[17px] font-normal leading-6"
        nameClasses += " text-foreground text-sm font-normal leading-[22px]"
        companyClasses += " text-muted-foreground text-sm font-normal leading-[22px]"
        cardHeight = "h-[244px]"
    }

    return (
        <motion.div
            className={`${cardClasses} ${cardWidth} ${cardHeight}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            {backgroundElements}
            <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>{quote}</div>
            <div className="relative z-10 flex justify-start items-center gap-3">
                <Image
                    src={avatar || "/placeholder.svg"}
                    alt={`${name} avatar`}
                    width={avatarSize}
                    height={avatarSize}
                    className={`w-${avatarSize / 4} h-${avatarSize / 4} ${avatarBorderRadius}`}
                    style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
                />
                <div className="flex flex-col justify-start items-start gap-0.5">
                    <div className={nameClasses}>{name}</div>
                    <div className={companyClasses}>{company}</div>
                </div>
            </div>
        </motion.div>
    )
}

export function MerchantTestimonialsSection() {
    return (
        <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
            <motion.div
                className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col justify-start items-center gap-4">
                    <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
                        Success Stories from Our Sellers
                    </h2>
                    <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
                        {"See how sellers are growing their businesses and increasing revenue"} <br />{" "}
                        {"with StuffHunt's AI-powered marketplace platform"}
                    </p>
                </div>
            </motion.div>
            <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto">
                <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                    <TestimonialCard {...testimonials[0]} index={0} />
                    <TestimonialCard {...testimonials[1]} index={1} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                    <TestimonialCard {...testimonials[2]} index={2} />
                    <TestimonialCard {...testimonials[3]} index={3} />
                    <TestimonialCard {...testimonials[4]} index={4} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                    <TestimonialCard {...testimonials[5]} index={5} />
                    <TestimonialCard {...testimonials[6]} index={6} />
                </div>
            </div>
        </section>
    )
}