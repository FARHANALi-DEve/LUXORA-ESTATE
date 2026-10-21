/** Shared database settings; never return connection secrets to clients. */
export function getDatabaseConfig(env = process.env) {
  const uri = String(env.MONGODB_URI || '').trim();
  const requested = String(env.DATABASE_MODE || 'auto').toLowerCase();
  if (!['auto', 'mongodb', 'local'].includes(requested)) throw new Error('DATABASE_MODE must be auto, mongodb or local.');
  if (uri && !/^mongodb(?:\+srv)?:\/\/\S+$/i.test(uri)) throw new Error('Invalid MongoDB URI. Use mongodb:// or mongodb+srv://.');
  if (requested === 'mongodb' && !uri) throw new Error('Set MONGODB_URI to enable the MongoDB database.');
  if (requested === 'local' && uri) throw new Error('DATABASE_MODE=local conflicts with MONGODB_URI. Choose one backend.');
  const mode = uri ? 'mongodb' : 'local';
  if (mode === 'local' && env.NODE_ENV === 'production' && env.DEMO_MODE !== '1') {
    throw new Error('MONGODB_URI is required for persistent production storage.');
  }
  const raw = uri.replace(/^mongodb(?:\+srv)?:\/\//i, '');
  const slash = raw.indexOf('/');
  const uriName = slash < 0 ? '' : raw.slice(slash + 1).split('?')[0];
  const name = String(env.MONGODB_DB_NAME || uriName || 'luxora_estate');
  if (mode === 'mongodb' && !/^[A-Za-z0-9_-]+$/.test(name)) {
    throw new Error('Invalid MongoDB database name. Use only letters, digits, _ or -.');
  }
  return { mode, name, uri };
}
