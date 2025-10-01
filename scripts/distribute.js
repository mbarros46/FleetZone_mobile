#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Configurando distribuição do FleetZone Mobile...\n');

try {
  // Verificar se o EAS CLI está instalado
  try {
    execSync('eas --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('📦 Instalando EAS CLI...');
    execSync('npm install -g @expo/eas-cli', { stdio: 'inherit' });
  }

  // Verificar se está logado no EAS
  try {
    execSync('eas whoami', { stdio: 'pipe' });
  } catch (error) {
    console.log('🔐 Faça login no EAS:');
    execSync('eas login', { stdio: 'inherit' });
  }

  console.log('📱 Opções de distribuição disponíveis:');
  console.log('1. Firebase App Distribution');
  console.log('2. Google Play Store (via EAS Submit)');
  console.log('3. Link direto para download');
  console.log('4. GitHub Releases');

  console.log('\n🚀 Para distribuir via Firebase App Distribution:');
  console.log('1. Configure o Firebase no seu projeto');
  console.log('2. Execute: eas build --platform android --profile preview');
  console.log('3. Use o Firebase CLI para distribuir o APK');

  console.log('\n📱 Para distribuir via Google Play Store:');
  console.log('1. Execute: eas build --platform android --profile production');
  console.log('2. Execute: eas submit --platform android');

  console.log('\n🔗 Para link direto:');
  console.log('1. Execute: eas build --platform android --profile preview');
  console.log('2. O link será fornecido após o build');

  console.log('\n📋 Scripts disponíveis:');
  console.log('- npm run build:android - Build para Android');
  console.log('- npm run build:ios - Build para iOS');
  console.log('- npm run submit:android - Submeter para Google Play');
  console.log('- npm run submit:ios - Submeter para App Store');

} catch (error) {
  console.error('❌ Erro na configuração:', error.message);
  process.exit(1);
}
