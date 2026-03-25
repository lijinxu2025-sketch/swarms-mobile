import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'
import { join, basename } from 'path'

const IMAGE_DIR = 'C:/Users/13270/Desktop/swarms-marketplace/image'

const files = readdirSync(IMAGE_DIR).filter(f => f.endsWith('.png'))

console.log(`Found ${files.length} PNG files. Converting...`)

let ok = 0, fail = 0
for (const file of files) {
  const src  = join(IMAGE_DIR, file)
  const dest = join(IMAGE_DIR, file.replace(/\.png$/, '.webp'))
  try {
    await sharp(src).webp({ quality: 90 }).toFile(dest)
    unlinkSync(src)
    console.log(`  ✓ ${file} → ${basename(dest)}`)
    ok++
  } catch (e) {
    console.error(`  ✗ ${file}: ${e.message}`)
    fail++
  }
}

console.log(`\nDone: ${ok} converted, ${fail} failed.`)
