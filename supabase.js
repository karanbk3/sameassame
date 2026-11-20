
import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// coreI Supabase connection

const SUPABASE_URL =
    "https://ppmeiqdtwcubvlktldub.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_4za4mwjtW7a8AW5Q3nqGgA_vesy00Uj";

// Connect coreI to Supabase
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
