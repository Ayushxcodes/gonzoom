-- Migration: add threaded Comment model

CREATE TABLE IF NOT EXISTS "Comment" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "submissionId" TEXT NOT NULL,
  "authorId" TEXT,
  "parentId" TEXT,
  text TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE "Comment" ADD CONSTRAINT fk_comment_submission FOREIGN KEY ("submissionId") REFERENCES "Submission" (id) ON DELETE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT fk_comment_author FOREIGN KEY ("authorId") REFERENCES "Editor" (id) ON DELETE SET NULL;
ALTER TABLE "Comment" ADD CONSTRAINT fk_comment_parent FOREIGN KEY ("parentId") REFERENCES "Comment" (id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_comment_submission ON "Comment" ("submissionId");
CREATE INDEX IF NOT EXISTS idx_comment_parent ON "Comment" ("parentId");
