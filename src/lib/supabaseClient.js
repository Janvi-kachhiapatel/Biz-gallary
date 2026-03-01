import { createClient } from '@supabase/supabase-js';

// Replace these with your actual keys from Supabase
const supabaseUrl = 'https://pkoezuuocecsoycrcali.supabase.co';
const supabaseKey = 'sb_publishable_4yoHC38Cynwpoz_C8wbKwg_P6FqWXQS';

export const supabase = createClient(supabaseUrl, supabaseKey);