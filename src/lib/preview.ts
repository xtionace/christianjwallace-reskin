/** True when this deployment should stay out of search indexes. */
export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === 'preview'
}
