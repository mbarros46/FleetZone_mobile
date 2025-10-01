#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build do Android...\n');

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

  // Configurar projeto se necessário
  if (!fs.existsSync('eas.json')) {
    console.log('⚙️ Configurando EAS...');
    execSync('eas build:configure', { stdio: 'inherit' });
  }

  console.log('📱 Gerando APK para desenvolvimento...');
  execSync('eas build --platform android --profile development', { stdio: 'inherit' });

  console.log('📱 Gerando AAB para produção...');
  execSync('eas build --platform android --profile production', { stdio: 'inherit' });

  console.log('\n✅ Builds concluídos com sucesso!');
  console.log('📋 Acesse https://expo.dev/accounts/[seu-usuario]/projects/fleetzone/builds para baixar os arquivos.');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
