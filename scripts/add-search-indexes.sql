-- Additional PostgreSQL indexes for optimized product search
-- Run this script in your PostgreSQL database for better search performance

-- Full-text search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_name_fulltext 
ON "Product" USING gin(to_tsvector('english', name));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_description_fulltext 
ON "Product" USING gin(to_tsvector('english', coalesce("shortDescription", '') || ' ' || coalesce("detailedDescription", '')));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_features_fulltext 
ON "Product" USING gin(to_tsvector('english', coalesce("keyFeatures", '')));

-- Combined search vector for better performance
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Update search vector with combined text
UPDATE "Product" SET search_vector = 
  to_tsvector('english', 
    coalesce(name, '') || ' ' || 
    coalesce(brand, '') || ' ' || 
    coalesce(category, '') || ' ' || 
    coalesce(subcategory, '') || ' ' || 
    coalesce("shortDescription", '') || ' ' || 
    coalesce("detailedDescription", '') || ' ' || 
    coalesce("keyFeatures", '')
  );

-- Index on the search vector
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_search_vector 
ON "Product" USING gin(search_vector);

-- Trigger to automatically update search vector
CREATE OR REPLACE FUNCTION update_product_search_vector() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    coalesce(NEW.name, '') || ' ' || 
    coalesce(NEW.brand, '') || ' ' || 
    coalesce(NEW.category, '') || ' ' || 
    coalesce(NEW.subcategory, '') || ' ' || 
    coalesce(NEW."shortDescription", '') || ' ' || 
    coalesce(NEW."detailedDescription", '') || ' ' || 
    coalesce(NEW."keyFeatures", '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_product_search_vector_trigger ON "Product";
CREATE TRIGGER update_product_search_vector_trigger 
  BEFORE INSERT OR UPDATE ON "Product"
  FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Additional performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_price_range 
ON "Product" (price) WHERE "isActive" = true AND "inStock" = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_category_price 
ON "Product" (category, price) WHERE "isActive" = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_brand_category 
ON "Product" (brand, category) WHERE "isActive" = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_type_category 
ON "Product" ("productType", category) WHERE "isActive" = true;

-- Partial indexes for better performance on filtered queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_active_instock 
ON "Product" ("isActive", "inStock", "viewCount" DESC, "createdAt" DESC) 
WHERE "isActive" = true AND "inStock" = true;

-- Index for sorting by popularity
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_popularity 
ON "Product" ("viewCount" DESC, "likeCount" DESC, "createdAt" DESC) 
WHERE "isActive" = true;

-- Analyze tables for better query planning
ANALYZE "Product";
ANALYZE "Category";

-- Show index usage statistics (for monitoring)
-- SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch 
-- FROM pg_stat_user_indexes 
-- WHERE tablename = 'Product' 
-- ORDER BY idx_tup_read DESC;