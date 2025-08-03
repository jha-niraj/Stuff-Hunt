"use client"

import type React from "react"
import { Search, ShoppingCart, CreditCard, Eye, TrendingUp, Zap } from "lucide-react"

// AI Product Recommendations Component
export const AIProductRecommendations: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center">
      {/* Background Message Box (Blurred) */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 scale-90 w-80 h-48 bg-gradient-to-b from-background to-transparent opacity-60 rounded-lg border border-border overflow-hidden backdrop-blur-md">
        <div className="border rounded-lg bg-card p-2 h-full overflow-hidden">
          <div className="font-mono text-xs leading-tight tracking-tight text-muted-foreground">
            <p className="m-0 whitespace-pre-wrap font-normal">{"const recommendations = {"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  trending: ["}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">
              {"    { name: 'Wireless Headphones', price: '$99' },"}
            </p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Smart Watch', price: '$299' },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Phone Case', price: '$25' }"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  ],"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  personalized: ["}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Running Shoes', match: '95%' },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Fitness Tracker', match: '87%' }"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  ]"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"}"}</p>
          </div>
        </div>
      </div>

      {/* Foreground Message Box (Main) */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 h-52 bg-background backdrop-blur-md rounded-lg border border-border overflow-hidden">
        <div className="bg-card border border-border p-2 h-full relative overflow-hidden">
          {/* Highlight backgrounds */}
          <div className="absolute left-0 right-0 w-full top-12 h-8 bg-foreground/8 z-10" />
          <div className="absolute left-0 right-0 w-full top-20 h-11 bg-primary/12 z-10" />

          <div className="font-mono text-xs leading-tight tracking-tight text-foreground relative z-20">
            <p className="m-0 whitespace-pre-wrap font-normal">{"const recommendations = {"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  trending: ["}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">
              {"    { name: 'Wireless Headphones', price: '$99' },"}
            </p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Smart Watch', price: '$299' },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Phone Case', price: '$25' }"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  ],"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  personalized: ["}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Running Shoes', match: '95%' },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'Fitness Tracker', match: '87%' }"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  ]"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"}"}</p>
          </div>

          <button className="absolute top-1/2 right-5 transform -translate-y-1/2 translate-y-7 z-30 flex items-center justify-center gap-1 bg-primary text-primary-foreground border-none cursor-pointer font-medium whitespace-nowrap transition-all duration-200 px-2 py-1 rounded text-xs leading-tight tracking-tight shadow-lg">
            <span className="font-medium">Add to Cart</span>
            <ShoppingCart className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Easy Store Setup Component
export const EasyStoreSetup: React.FC = () => {
  const logLines = [
    "[14:32:15.123] Setting up your StuffHunt store...",
    "[14:32:15.124] Store configuration: Premium plan, Global shipping",
    "[14:32:15.135] Configuring payment gateways...",
    "[14:32:15.201] Setting up inventory management...",
    "[14:32:15.445] Connecting to shipping providers...",
    "[14:32:16.123] Installing store themes...",
    "[14:32:16.234] Configuring SEO settings...",
    "[14:32:16.456] Setting up analytics tracking...",
    "[14:32:16.789] Configuring email notifications...",
    "[14:32:17.123] Installing security certificates...",
    "[14:32:17.456] Setting up backup systems...",
    "[14:32:17.789] Configuring CDN for fast loading...",
    "[14:32:18.123] ✓ Payment processing ready",
    "[14:32:18.456] ✓ Inventory system configured",
    "[14:32:18.789] ✓ Shipping rates calculated",
    "[14:32:19.123] ✓ Store theme applied",
    "[14:32:19.456] ✓ SEO optimization complete",
    "[14:32:19.789] Store setup completed successfully!",
    "🚀 Your store is now live and ready for customers!",
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative">
      {/* Console Terminal Panel */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-gradient-to-b from-background to-transparent backdrop-blur-sm rounded-lg overflow-hidden">
        {/* Inner translucent panel */}
        <div className="absolute inset-0.5 rounded-lg bg-foreground/8" />

        {/* Log text */}
        <div className="relative p-2 h-full overflow-hidden font-mono text-xs leading-4 text-foreground whitespace-pre">
          {logLines.map((line, index) => (
            <p key={index} className="m-0">
              {line}
            </p>
          ))}
        </div>

        {/* Inner border overlay */}
        <div className="absolute inset-0 border border-border rounded-lg pointer-events-none" />
      </div>

      {/* Call-to-action button */}
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-14 flex items-center justify-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground border-none cursor-pointer rounded-lg font-medium text-sm leading-6 tracking-tight font-sans whitespace-nowrap shadow-lg">
        🚀 Launch Your Store
      </button>
    </div>
  )
}

// Payment Integrations Component
export const PaymentIntegrations: React.FC = () => {
  const integrations = [
    { name: "Stripe", icon: "💳", installed: true },
    { name: "PayPal", icon: "🅿️", installed: false },
    { name: "Apple Pay", icon: "🍎", installed: true },
    { name: "Google Pay", icon: "🔵", installed: false },
    { name: "Razorpay", icon: "💰", installed: true },
    { name: "Square", icon: "⬜", installed: false },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative">
      {/* Main Message Box */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-6 w-80 h-64 bg-gradient-to-b from-background to-transparent backdrop-blur-md rounded-lg border border-border overflow-hidden">
        <div className="flex flex-col h-full w-full">
          {/* Search Header */}
          <div className="flex items-center gap-3 p-3 border-b border-border w-full">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="font-sans text-xs leading-5 text-muted-foreground font-normal whitespace-nowrap">
              Search payment providers
            </span>
          </div>

          {/* Integration List */}
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`flex items-center justify-between p-3 w-full ${
                index < integrations.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-lg">{integration.icon}</div>
                <span className="font-sans text-xs leading-5 text-muted-foreground font-normal whitespace-nowrap">
                  {integration.name}
                </span>
              </div>
              {integration.installed && (
                <div className="bg-primary/8 px-1.5 py-0.5 rounded flex items-center justify-center">
                  <span className="font-sans text-xs leading-4 text-primary font-medium whitespace-nowrap">
                    Connected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Live Store Preview Component
export const LiveStorePreview: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-transparent">
      {/* Left Panel - Store Editor */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-80 h-52 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm rounded-lg border border-border overflow-hidden">
        <div className="p-2 h-full relative overflow-hidden flex flex-col items-start justify-start">
          <div className="font-mono text-xs leading-4 tracking-tight text-foreground w-full relative flex-grow flex flex-col justify-center">
            <p className="m-0 whitespace-pre-wrap font-normal">{"const storeConfig = {"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  theme: 'modern',"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  colors: {"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    primary: '#3B82F6',"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    secondary: '#10B981'"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  layout: 'grid',"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  products: ["}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'iPhone 15', price: '$999' },"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"    { name: 'MacBook Pro', price: '$1999' }"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"  ]"}</p>
            <p className="m-0 whitespace-pre-wrap font-normal">{"}"}</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 translate-x-20 w-40 h-52 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="p-2 h-full relative overflow-hidden flex items-start justify-center bg-background/80">
          {/* Store Preview Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-primary text-primary-foreground border-none cursor-pointer font-medium whitespace-nowrap transition-all duration-200 px-3 py-1.5 rounded-lg shadow-lg">
            <Eye className="w-4 h-4" />
            <span className="font-sans text-sm leading-7 tracking-tight font-medium">Preview Store</span>
          </div>
        </div>
      </div>

      {/* Connection Line */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="relative w-0.5 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent w-full h-full" />
        </div>
      </div>
    </div>
  )
}

// Multi-Channel Sales Component
export const MultiChannelSales: React.FC = () => {
  const channels = [
    {
      icon: <TrendingUp className="w-4 h-4 text-foreground opacity-80" />,
      title: "Amazon Integration",
      revenue: "₹45k revenue",
      platform: "marketplace",
      status: "active",
    },
    {
      icon: <CreditCard className="w-4 h-4 text-foreground opacity-80" />,
      title: "Instagram Shop",
      revenue: "₹32k revenue",
      platform: "social-commerce",
      status: "syncing",
    },
    {
      icon: <Zap className="w-4 h-4 text-foreground opacity-80" />,
      title: "WhatsApp Business",
      revenue: "₹28k revenue",
      platform: "messaging",
      status: "active",
    },
  ]

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-card/20 to-transparent backdrop-blur-sm rounded-lg">
      {/* Inner content area */}
      <div className="flex flex-col items-center justify-start gap-4 p-5 h-full w-full bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-md rounded-lg border border-border overflow-hidden m-6 mt-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-1.5 bg-gradient-to-b from-card/20 to-transparent backdrop-blur-lg rounded-lg shadow-sm border border-border/50 w-full max-w-xs relative overflow-hidden"
          >
            {/* Icon container */}
            <div className="flex items-center justify-start gap-2 p-1 flex-shrink-0">
              <div className="w-4 h-4 flex items-center justify-center overflow-hidden flex-shrink-0">
                {channel.icon}
              </div>
            </div>

            {/* Content container */}
            <div className="flex flex-col items-start justify-center gap-0.5 flex-shrink-0">
              <div className="font-sans font-normal text-xs leading-4 text-foreground whitespace-pre flex-shrink-0">
                {channel.title}
              </div>
              <div className="font-sans font-normal text-xs leading-4 text-muted-foreground whitespace-pre flex-shrink-0">
                {`${channel.revenue} • ${channel.platform} • ${channel.status}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// E-commerce Integrations Component
export const EcommerceIntegrations: React.FC = () => {
  const integrations = Array(40)
    .fill(null)
    .map((_, i) => {
      const item: { logoText?: string; isActive?: boolean } = {}
      const row = Math.floor(i / 10)
      const col = i % 10

      // Assign integrations to specific positions
      if (row === 0 && col === 3) {
        item.logoText = "📦"
        item.isActive = true
      } else if (row === 1 && col === 5) {
        item.logoText = "💳"
        item.isActive = true
      } else if (row === 2 && col === 3) {
        item.logoText = "📊"
        item.isActive = true
      } else if (row === 2 && col === 7) {
        item.logoText = "📧"
        item.isActive = true
      } else if (row === 3 && col === 5) {
        item.logoText = "🚚"
        item.isActive = true
      }
      return item
    })

  return (
    <div className="w-full h-full relative">
      {/* Background radial gradient */}
      <div className="w-96 h-64 left-0 top-6 absolute bg-gradient-radial from-foreground/0 via-foreground/15 to-foreground/0" />

      {/* Main content container */}
      <div className="w-96 h-60 left-0.5 top-10 absolute backdrop-blur-sm flex flex-col justify-start items-center gap-4">
        {/* Render rows of integration boxes */}
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-start items-center gap-4">
            {integrations.slice(rowIndex * 10, (rowIndex + 1) * 10).map((item, colIndex) => (
              <div
                key={colIndex}
                className={`w-14 h-14 relative rounded-lg border border-border flex justify-center items-center overflow-hidden flex-shrink-0 ${
                  item.isActive
                    ? "bg-gradient-to-b from-foreground/20 to-transparent shadow-sm backdrop-blur-lg p-1.5"
                    : ""
                }`}
              >
                {item.logoText && (
                  <div className="w-8 h-8 relative overflow-hidden flex justify-center items-center text-2xl">
                    {item.logoText}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Bento Components Export
export const EcommerceBentoComponents = {
  AIProductRecommendations,
  EasyStoreSetup,
  PaymentIntegrations,
  LiveStorePreview,
  MultiChannelSales,
  EcommerceIntegrations,
}