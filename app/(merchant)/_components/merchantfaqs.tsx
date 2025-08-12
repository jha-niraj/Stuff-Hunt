"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
    {
        question: "How do I get started selling on StuffHunt?",
        answer:
            "Getting started is simple! Sign up for a seller account, complete your store profile, and start listing products. Our AI will help generate descriptions and categorize your items automatically. You can be live and selling within minutes.",
    },
    {
        question: "What commission does StuffHunt charge?",
        answer:
            "Our commission structure is transparent and competitive. Starter plan charges 5% per sale, Professional plan charges 3%, and Enterprise plan charges only 2%. There are no hidden fees or setup costs.",
    },
    {
        question: "How does the AI product listing feature work?",
        answer:
            "Simply upload product images and our AI will automatically generate compelling descriptions, suggest relevant tags, categorize your products, and even recommend optimal pricing based on market data. This saves hours of manual work.",
    },
    {
        question: "When and how do I get paid?",
        answer:
            "Payments are processed weekly directly to your bank account. We support all major Indian banks and digital wallets. You can track all your earnings and payment history in your seller dashboard.",
    },
    {
        question: "Can I integrate with my existing inventory system?",
        answer:
            "Yes! Our Professional and Enterprise plans include API access and integrations with popular inventory management systems, accounting software, and other e-commerce platforms to keep everything in sync.",
    },
    {
        question: "What kind of support do sellers get?",
        answer:
            "We provide comprehensive support including onboarding assistance, dedicated account managers for higher tiers, 24/7 chat support, seller resources, and regular webinars to help you grow your business successfully.",
    },
]

interface FAQItemProps {
    question: string
    answer: string
    isOpen: boolean
    onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onToggle()
    }
    return (
        <div
            className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
            onClick={handleClick}
        >
            <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
                <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
                <div className="flex justify-center items-center">
                    <ChevronDown
                        className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
                    />
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                style={{
                    transitionProperty: "max-height, opacity, padding",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
                >
                    <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
                </div>
            </div>
        </div>
    )
}

export function MerchantFAQSection() {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set())
    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index)
        } else {
            newOpenItems.add(index)
        }
        setOpenItems(newOpenItems)
    }
    return (
        <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
            <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
            <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
                <div className="flex flex-col justify-start items-center gap-4">
                    <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
                        Frequently Asked Questions
                    </h2>
                    <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
                        Everything you need to know about selling on StuffHunt and growing your business
                    </p>
                </div>
            </div>
            <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
                {
                    faqData.map((faq, index) => (
                        <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
                    ))
                }
            </div>
        </section>
    )
}