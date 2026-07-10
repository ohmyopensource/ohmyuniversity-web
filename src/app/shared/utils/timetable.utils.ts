const DEGREE_TYPE_LABEL: Record<string, string> = {
  triennali: 'Triennale',
  magistrali: 'Magistrale',
  magistrali_ciclo_unico: 'Magistrale a ciclo unico',
};

/** Human-readable label for a timetable degree-type slug (e.g. "magistrali" → "Magistrale"). */
export function degreeTypeLabel(degreeType: string): string {
  return DEGREE_TYPE_LABEL[degreeType] ?? degreeType;
}

/** Formats an ISO date string using Italian locale conventions. */
export function formatScheduleDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('it-IT');
}

/** Extracts a readable course name from a timetable page URL slug. */
export function courseNameFromUrl(url: string): string {
  const match = url.match(/\/corso\/([^/]+)_lezioni/);
  if (!match) return '';
  return match[1].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/** Downloads a PDF via blob (falls back to opening it in a new tab on failure). */
export async function downloadScheduleFile(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = url.split('/').pop() ?? 'orario';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank');
  }
}
