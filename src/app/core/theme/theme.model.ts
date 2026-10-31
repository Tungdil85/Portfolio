export type ThemeName = 'light' | 'dark';

export interface Theme {
  bg: string;
  fg: string;
  mut: string;
  line: string;
  card: string;
  acc: string;
  /** Couleurs de la grille hexagonale WebGL. */
  hex: { top: number; acc: string; acc2: string };
}

export const THEMES: Record<ThemeName, Theme> = {
  light: {
    bg: '#faf8fc',
    fg: '#1a0b2e',
    mut: '#665a76',
    line: '#e4dcee',
    card: '#f1ebf8',
    acc: '#c8002c',
    hex: { top: 0xf3eef9, acc: '#dd0031', acc2: '#9710ff' },
  },
  dark: {
    bg: '#0c0714',
    fg: '#f3eef9',
    mut: '#a99dba',
    line: '#2a1f3a',
    card: '#160e23',
    acc: '#ff4d78',
    hex: { top: 0x241a33, acc: '#f60a48', acc2: '#9710ff' },
  },
};
