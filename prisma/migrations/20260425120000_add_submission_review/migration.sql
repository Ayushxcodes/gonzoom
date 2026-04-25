-- Migration: add persistent review fields to Submission

ALTER TABLE "Submission" ADD COLUMN IF NOT EXISTS "reviewNotes" TEXT;
ALTER TABLE "Submission" ADD COLUMN IF NOT EXISTS "reviewerId" TEXT;
ALTER TABLE "Submission" ADD COLUMN IF NOT EXISTS "reviewedAt" TIMESTAMP WITH TIME ZONE;

-- Add foreign key to Editor (if Editor table exists)
-- Add foreign key to Editor (if Editor table exists and constraint doesn't already exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Editor')
     AND NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_submission_reviewer') THEN
    ALTER TABLE "Submission"
      ADD CONSTRAINT fk_submission_reviewer
      FOREIGN KEY ("reviewerId") REFERENCES "Editor" (id) ON DELETE SET NULL;
  END IF;
END $$;
