import type { SkinOption, HairOption, PartOption } from './types';

export const SKIN_OPTIONS: SkinOption[] = [
  { id: 'SKIN_LIGHT',  label: '밝은 피부',   color: '#FDDBB4', emoji: '🌸' },
  { id: 'SKIN_MEDIUM', label: '중간 피부',   color: '#E8A77C', emoji: '🌺' },
  { id: 'SKIN_DARK',   label: '어두운 피부', color: '#C77B3C', emoji: '🌻' },
];

export const HAIR_OPTIONS: HairOption[] = [
  { id: 'HAIR_BOB_BROWN',     label: '단발 갈색',     style: 'bob',      color: '#6B3F1E', emoji: '🟫' },
  { id: 'HAIR_LONG_BLACK',    label: '긴 생머리 흑색', style: 'long',     color: '#1A1A1A', emoji: '⬛' },
  { id: 'HAIR_BUN_BLONDE',    label: '업스타일 금색',  style: 'bun',      color: '#E8C55C', emoji: '🟡' },
  { id: 'HAIR_WAVY_BROWN',    label: '웨이브 갈색',   style: 'wavy',     color: '#8B5E3C', emoji: '🟤' },
  { id: 'HAIR_PONYTAIL_PINK', label: '포니테일 핑크', style: 'ponytail', color: '#E87C9B', emoji: '🩷' },
  { id: 'HAIR_SHORT_SILVER',  label: '숏컷 실버',     style: 'short',    color: '#C0C0C0', emoji: '⬜' },
];

export const OUTFIT_OPTIONS: PartOption[] = [
  { id: 'OUTFIT_DRESS_WHITE', label: '웨딩 드레스', emoji: '👗' },
  { id: 'OUTFIT_SUIT_BLACK',  label: '블랙 수트',   emoji: '🤵' },
  { id: 'OUTFIT_DRESS_PINK',  label: '핑크 드레스', emoji: '🩷' },
  { id: 'OUTFIT_SUIT_BEIGE',  label: '베이지 수트', emoji: '🧥' },
];

export const ACC_OPTIONS: PartOption[] = [
  { id: 'ACC_NONE',         label: '없음',      emoji: '—' },
  { id: 'ACC_VEIL',         label: '베일',      emoji: '🤍' },
  { id: 'ACC_FLOWER_CROWN', label: '꽃 화관',   emoji: '🌸' },
  { id: 'ACC_GLASSES',      label: '안경',      emoji: '👓' },
  { id: 'ACC_BOW_TIE',      label: '나비넥타이', emoji: '🎀' },
];

export const EFFECT_OPTIONS: PartOption[] = [
  { id: 'FX_NONE',     label: '없음',  emoji: '—' },
  { id: 'FX_HEARTS',   label: '하트',  emoji: '💕' },
  { id: 'FX_SPARKLES', label: '반짝이', emoji: '✨' },
];
