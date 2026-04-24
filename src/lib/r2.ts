import fs from 'fs/promises'
import path from 'path'

/**
 * Local upload helper — writes files to `public/uploads` and returns a public path
 * Keeps the same signature as `uploadToR2(buffer, key, contentType)` used by the upload API.
 */
export async function uploadToR2(buffer: ArrayBuffer, key: string, contentType?: string){
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  // normalize filename to avoid directories in key
  const filename = path.basename(key).replace(/[^a-zA-Z0-9._-]/g, '_')
  const dest = path.join(uploadsDir, filename)

  await fs.writeFile(dest, Buffer.from(buffer))

  // Return a relative public URL that matches Next.js static serving from /public
  return `/uploads/${encodeURIComponent(filename)}`
}

export default null
