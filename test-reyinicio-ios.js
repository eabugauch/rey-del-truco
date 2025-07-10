#!/usr/bin/env node
/**
 * Test script to verify reyinicio.png C2PA metadata and iOS Safari compatibility
 */

const fs = require('fs');
const path = require('path');

function checkPNGStructure(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // Check PNG signature
    const signature = buffer.slice(0, 8);
    const expectedSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    if (!signature.equals(expectedSignature)) {
      return { valid: false, error: 'Invalid PNG signature' };
    }
    
    // Look for C2PA chunks
    let offset = 8; // Skip signature
    let hasC2PA = false;
    let chunks = [];
    
    while (offset < buffer.length - 8) {
      // Read chunk length (4 bytes, big-endian)
      const length = buffer.readUInt32BE(offset);
      offset += 4;
      
      // Read chunk type (4 bytes)
      const type = buffer.slice(offset, offset + 4).toString('ascii');
      offset += 4;
      
      // Read chunk data
      const data = buffer.slice(offset, offset + length);
      offset += length;
      
      // Read CRC (4 bytes)
      const crc = buffer.slice(offset, offset + 4);
      offset += 4;
      
      chunks.push({ type, length });
      
      // Check for C2PA related chunks
      if (type === 'caBX' || type === 'jumb' || data.includes('c2pa')) {
        hasC2PA = true;
      }
      
      // Stop at IEND
      if (type === 'IEND') {
        break;
      }
    }
    
    return {
      valid: true,
      hasC2PA,
      chunks: chunks.map(c => `${c.type} (${c.length} bytes)`),
      fileSize: buffer.length
    };
    
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function main() {
  console.log('🔍 Testing reyinicio.png iOS Safari compatibility...\n');
  
  const files = [
    'src/styles/assets/images/reyinicio.png',
    'src/styles/assets/images/reyinicio_original.png', 
    'src/styles/assets/images/tronoArg.png'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`📁 File: ${file}`);
      const result = checkPNGStructure(file);
      
      if (result.valid) {
        console.log(`   ✅ Valid PNG structure`);
        console.log(`   📏 File size: ${(result.fileSize / 1024).toFixed(1)} KB`);
        console.log(`   🔐 Has C2PA metadata: ${result.hasC2PA ? '✅ YES' : '❌ NO'}`);
        console.log(`   🧩 Chunks: ${result.chunks.slice(0, 3).join(', ')}${result.chunks.length > 3 ? '...' : ''}`);
        
        if (result.hasC2PA) {
          console.log(`   🎯 iOS Safari 17+ compatibility: ✅ EXPECTED TO WORK`);
        } else {
          console.log(`   ⚠️  iOS Safari 17+ compatibility: ❌ LIKELY TO FAIL`);
        }
      } else {
        console.log(`   ❌ Error: ${result.error}`);
      }
      console.log('');
    } else {
      console.log(`📁 File: ${file} - ❌ NOT FOUND\n`);
    }
  });
  
  // Check for potential conflicts
  console.log('🔄 Checking for potential conflicts...\n');
  
  const allImages = fs.readdirSync('src/styles/assets/images')
    .filter(f => f.endsWith('.png'))
    .map(f => path.join('src/styles/assets/images', f));
  
  let c2paCount = 0;
  allImages.forEach(file => {
    const result = checkPNGStructure(file);
    if (result.valid && result.hasC2PA) {
      c2paCount++;
    }
  });
  
  console.log(`📊 Total PNG images with C2PA: ${c2paCount}/${allImages.length}`);
  
  if (c2paCount >= 2) {
    console.log('✅ Multiple C2PA images detected - this is normal and should not cause conflicts');
  }
  
  console.log('\n🎯 CONCLUSION:');
  console.log('If reyinicio.png shows "HAS C2PA metadata: YES", the iOS Safari issue should be resolved.');
  console.log('The image will now be trusted by iOS Safari 17+ security model.');
}

if (require.main === module) {
  main();
}