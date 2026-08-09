/**
 * Generates public/favicon.ico from the 16/32/48 PNG files derived from
 * public/bloxbot-svg.png. Modern ICO containers can embed PNG data directly,
 * so this produces a fully valid multi-resolution favicon without re-decoding.
 *
 * Run:  node scripts/generate-favicon-ico.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const images = [16, 32, 48].map((size) => ({
  size,
  data: readFileSync(join(publicDir, `favicon-${size}x${size}.png`)),
}))

// ICONDIR (6 bytes)
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: 1 = icon
header.writeUInt16LE(images.length, 4) // image count

const entries = []
const payloads = []
let offset = 6 + images.length * 16

for (const { size, data } of images) {
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
  entry.writeUInt8(0, 2) // palette count
  entry.writeUInt8(0, 3) // reserved
  entry.writeUInt16LE(1, 4) // color planes
  entry.writeUInt16LE(32, 6) // bits per pixel
  entry.writeUInt32LE(data.length, 8) // encoded size
  entry.writeUInt32LE(offset, 12) // offset in file
  entries.push(entry)
  payloads.push(data)
  offset += data.length
}

const ico = Buffer.concat([header, ...entries, ...payloads])
const out = join(publicDir, 'favicon.ico')
writeFileSync(out, ico)
console.log(`✓ wrote ${out} (${ico.length} bytes, ${images.length} sizes)`)