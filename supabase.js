// ── SUPABASE CONFIG ─────────────────────────────────────────────────────────
// Reemplaza estos valores con los tuyos de Supabase
const SUPABASE_URL = 'https://vaefexlsjgdeoezyqbit.supabase.co/rest/v1/';
const SUPABASE_KEY = 'https://vaefexlsjgdeoezyqbit.supabase.co/rest/v1/';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const SAVE_KEY = 'construrama_sjg';

async function cloudSave(iD, nP, fL) {
  const payload = { iD, nP };
  const { error } = await db
    .from('progreso')
    .upsert({ id: SAVE_KEY, data: payload, updated_at: new Date().toISOString() });
  if (error) {
    console.error('Error guardando:', error);
    return false;
  }
  return true;
}

async function cloudLoad() {
  const { data, error } = await db
    .from('progreso')
    .select('data, updated_at')
    .eq('id', SAVE_KEY)
    .single();
  if (error || !data) return null;
  return data;
}
