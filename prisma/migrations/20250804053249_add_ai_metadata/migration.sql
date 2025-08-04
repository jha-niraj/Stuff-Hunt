-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "aiMetadata" JSONB;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "website" TEXT;
