// Public verification uses a publishable Supabase key, never a service-role key.
// The page is not deployed until certificate issuance has been reviewed and enabled.
export const translations = {
  fr: { title: 'Vérifier une attestation', intro: 'Vérifiez une attestation de fin de parcours AzEasier.', label: 'Identifiant de l’attestation', action: 'Vérifier', valid: 'Attestation délivrée par AzEasier', missing: 'Attestation introuvable ou partage désactivé.', error: 'Vérification momentanément indisponible.', invalid: 'Saisissez un identifiant valide.', level: 'Niveau', path: 'Parcours', full: 'Complet', quick: 'Rapide', date: 'Délivrée le', note: 'Cette attestation confirme un parcours enregistré dans AzEasier. Elle ne vérifie ni l’identité du titulaire ni un niveau officiel de langue.' },
  en: { title: 'Verify a course record', intro: 'Verify an AzEasier course completion record.', label: 'Record ID', action: 'Verify', valid: 'Record issued by AzEasier', missing: 'Record not found or sharing is disabled.', error: 'Verification is temporarily unavailable.', invalid: 'Enter a valid record ID.', level: 'Level', path: 'Path', full: 'Full', quick: 'Quick', date: 'Issued on', note: 'This record confirms an AzEasier course completion. It does not verify the holder’s identity or an official language level.' },
  ru: { title: 'Проверить свидетельство', intro: 'Проверьте свидетельство о прохождении курса AzEasier.', label: 'Номер свидетельства', action: 'Проверить', valid: 'Свидетельство выдано AzEasier', missing: 'Свидетельство не найдено или доступ к нему отключён.', error: 'Проверка временно недоступна.', invalid: 'Введите корректный номер.', level: 'Уровень', path: 'Курс', full: 'Полный', quick: 'Быстрый', date: 'Дата выдачи', note: 'Свидетельство подтверждает прохождение курса AzEasier. Оно не подтверждает личность владельца или официальный уровень языка.' }
};

export function validID(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function verify(id, config, fetcher = fetch) {
  if (!validID(id)) return { status: 'invalid' };
  if (!config?.url || !config?.publishableKey) return { status: 'error' };
  try {
    const result = await fetcher(`${config.url.replace(/\/$/, '')}/rest/v1/rpc/verify_course_certificate`, {
      method: 'POST', headers: { apikey: config.publishableKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_id: id })
    });
    if (!result.ok) return { status: 'error' };
    const record = await result.json();
    if (!record) return { status: 'missing' };
    if (record.id?.toLowerCase() !== id.toLowerCase() || !['A1','A2','B1','B2','C1'].includes(record.level) ||
        !['full','quick'].includes(record.path) || typeof record.holder_name !== 'string' || Number.isNaN(Date.parse(record.issued_at))) {
      return { status: 'error' };
    }
    return { status: 'valid', record };
  } catch { return { status: 'error' }; }
}
