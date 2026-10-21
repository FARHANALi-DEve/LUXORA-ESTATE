/** The public API returns useful errors but never emits connection strings. */
export function classifyError(error, fallback=500) {
  if (error?.code === 11000 || /slug already exists/i.test(error?.message||'')) {
    return {status:409,message:'That residence URL is already in use. Choose another name or slug.'};
  }
  if (/MongoDB connection failed|MONGODB_URI|required for persistent production storage|Invalid MongoDB URI/i.test(error?.message||'')) {
    return {status:503,message:'The property database is unavailable. Check your MongoDB connection and try again.'};
  }
  return {status:fallback,message:fallback===400?'Invalid request. Please check your input.':'The request could not be completed.'};
}
