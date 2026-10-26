import path from 'path'

/** Directory for new Payload Media uploads. Shipped plates and video stay in public/media. */
export function payloadMediaDir() {
  const configured = process.env.PAYLOAD_MEDIA_DIR?.trim() || 'media'
  return path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured)
}
