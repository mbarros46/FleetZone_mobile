import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useAccentColor } from '../../src/styles/theme';
import { getAppLang, t, setAppLang } from '../../src/i18n';
import AppButton from '../../src/components/AppButton';

async function readCommitHash(): Promise<string | null> {
  try {
    // 1) tentar ler app.json extra (Expo) - disponível no bundler via import
    // usamos require para evitar erro em runtime no bundler que maneja JSON
    // Nota: não é garantido que exista; em caso negativo, tentamos outras chaves
    // 2) tentar package.json gitHead
    // Como estamos no ambiente do app, acesso ao sistema de arquivos pode ser limitado.
    // Portanto fazemos tentativas seguras via require and optional chaining.

    let hash: string | undefined | null = null;

    try {
      // app.json normalmente está na raiz
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const appJson = require('../../app.json');
      hash = appJson?.extra?.commitHash ?? appJson?.expo?.extra?.commitHash ?? null;
      if (hash) return String(hash);
    } catch (e) {
      // ignore
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require('../../package.json');
      // alguns workflows populam gitHead
      hash = pkg?.gitHead ?? pkg?.version ?? null;
      if (hash) return String(hash);
    } catch (e) {
      // ignore
    }

    // fallback: tentar ler um arquivo criado em build chamado COMMIT_HASH na raiz
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // este arquivo pode não existir — se existir, o require lançará
      // Nota: bundlers normalmente não expõem leitura arbitrária de arquivos; este é um best-effort.
      // Tentamos só para ambientes de desenvolvimento local.
      // @ts-ignore
      const commitFile = require('../../COMMIT_HASH');
      if (commitFile) return String(commitFile).trim();
    } catch (e) {
      // ignore
    }

    return null;
  } catch (err) {
    return null;
  }
}

export default function SobreScreen() {
  const [commitHash, setCommitHash] = useState<string | null>(null);
  const { accentColor } = useAccentColor();
  const [lang, setLang] = useState<'pt'|'es'|'en'>('pt');

  useEffect(() => {
    let mounted = true;
    getAppLang().then((l) => {
      if (mounted) setLang(l as any);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    readCommitHash().then((h) => {
      if (mounted) setCommitHash(h);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.title, { color: accentColor }]}>{t('about_title', lang)}</Text>
          <Text style={styles.label}>{t('about_commit_label', lang)}</Text>
          <Text style={styles.hash}>{commitHash ?? (lang === 'es' ? 'desconocido' : lang === 'en' ? 'unknown' : 'desconhecido')}</Text>
          <Text style={styles.note}>{t('about_note', lang)}</Text>

          <AppButton
            title={lang === 'pt' ? 'Español' : 'Português'}
            variant="outline"
            color={accentColor}
            onPress={async () => {
              const target = lang === 'pt' ? 'es' : 'pt';
              await setAppLang(target as any);
              setLang(target as any);
            }}
            style={{ marginTop: 12 }}
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  card: { backgroundColor: '#fafafa', padding: 16, borderRadius: 8, elevation: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  label: { fontSize: 14, color: '#444', marginTop: 8 },
  hash: { fontFamily: Platform.OS === 'ios' ? 'Courier' : undefined, marginTop: 6, fontSize: 13, color: '#222' },
  note: { marginTop: 12, fontSize: 12, color: '#666' },
});
