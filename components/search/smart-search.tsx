"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { processSearchQuery, filtersToSearchParams } from "@/actions/search.action"
import { toast } from "sonner"

interface SmartSearchProps {
  placeholder?: string
  className?: string
  onSearch?: () => void
  showAIIndicator?: boolean
}

export function SmartSearch({ 
  placeholder = "Search products...", 
  className = "",
  onSearch,
  showAIIndicator = true
}: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = async () => {
    if (!query.trim()) return

    onSearch?.()
    
    startTransition(async () => {
      try {
        const result = await processSearchQuery(query.trim())
        
        if (result.success && result.filters) {
          // AI processing successful - use structured filters
          const searchParams = filtersToSearchParams(result.filters)
          searchParams.set("q", query.trim()) // Keep original query for display
          
          if (showAIIndicator && result.filters.confidence > 0.7) {
            toast.success("AI enhanced your search!", {
              description: result.processedQuery,
              duration: 3000,
            })
          }
          
          router.push(`/products?${searchParams.toString()}`)
        } else {
          // AI processing failed - fallback to text search
          const params = new URLSearchParams()
          params.set("q", query.trim())
          params.set("source", "text")
          
          if (result.error && showAIIndicator) {
            toast.info("Using text search", {
              description: "AI processing unavailable",
              duration: 2000,
            })
          }
          
          router.push(`/products?${params.toString()}`)
        }
      } catch (error) {
        console.error("Search error:", error)
        
        // Fallback to simple text search
        const params = new URLSearchParams()
        params.set("q", query.trim())
        params.set("source", "text")
        router.push(`/products?${params.toString()}`)
        
        if (showAIIndicator) {
          toast.error("Search failed, using basic search")
        }
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPending) {
      handleSearch()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-8 pr-12"
          disabled={isPending}
        />
        
        {/* AI Indicator */}
        {showAIIndicator && query.length > 2 && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          </div>
        )}
        
        {/* Loading/Search Button */}
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isPending}
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          variant="ghost"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {/* Search Suggestions (optional enhancement) */}
      {query.length > 0 && !isPending && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground px-3 py-1">
          {query.length > 2 ? (
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" />
              AI will enhance this search
            </span>
          ) : (
            <span>Type more for AI-enhanced search</span>
          )}
        </div>
      )}
    </div>
  )
}