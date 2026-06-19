-- Dedicated table for Bulk / Wholesale enquiries — richer schema for analysis.
CREATE TABLE public.bulk_enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),

  -- Applicant details
  name text NOT NULL,
  phone text NOT NULL,
  email text,

  -- Bulk-specific fields
  product_interested text,
  quantity text,
  message text,

  -- Analysis helpers
  status text NOT NULL DEFAULT 'new',   -- new | contacted | quoted | closed
  notes text                            -- internal admin notes
);

-- Permissions: service_role can do everything; authenticated users can read
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bulk_enquiries TO authenticated;
GRANT ALL ON public.bulk_enquiries TO service_role;

-- Row Level Security
ALTER TABLE public.bulk_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view bulk enquiries"
  ON public.bulk_enquiries FOR SELECT TO authenticated USING (true);
