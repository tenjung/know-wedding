import type { AvatarConfig } from './types';

/** 제단 신랑 */
export const GROOM_CONFIG: AvatarConfig = {
  gender: 'male', skinId: 'SKIN_LIGHT',
  hairId: 'HAIR_SHORT_SILVER', outfitId: 'OUTFIT_SUIT_BLACK',
  accId: 'ACC_BOW_TIE', effectId: 'FX_NONE',
};

/** 제단 신부 */
export const BRIDE_CONFIG: AvatarConfig = {
  gender: 'female', skinId: 'SKIN_LIGHT',
  hairId: 'HAIR_BUN_BLONDE', outfitId: 'OUTFIT_DRESS_WHITE',
  accId: 'ACC_VEIL', effectId: 'FX_HEARTS',
};

/** 30개 하객 더미 데이터 (재사용 가능한 컴포넌트) */
export const DUMMY_GUEST_CONFIGS: AvatarConfig[] = [
  // 여성 하객
  { gender:'female', skinId:'SKIN_LIGHT',  hairId:'HAIR_BOB_BROWN',     outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_FLOWER_CROWN', effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_LIGHT',  hairId:'HAIR_LONG_BLACK',    outfitId:'OUTFIT_DRESS_WHITE', accId:'ACC_VEIL',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_MEDIUM', hairId:'HAIR_BUN_BLONDE',    outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_NONE',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_DARK',   hairId:'HAIR_WAVY_BROWN',    outfitId:'OUTFIT_DRESS_WHITE', accId:'ACC_FLOWER_CROWN', effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_MEDIUM', hairId:'HAIR_PONYTAIL_PINK', outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_GLASSES',      effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_LIGHT',  hairId:'HAIR_SHORT_SILVER',  outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_NONE',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_DARK',   hairId:'HAIR_BOB_BROWN',     outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_GLASSES',      effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_MEDIUM', hairId:'HAIR_LONG_BLACK',    outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_FLOWER_CROWN', effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_LIGHT',  hairId:'HAIR_WAVY_BROWN',    outfitId:'OUTFIT_DRESS_WHITE', accId:'ACC_NONE',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_DARK',   hairId:'HAIR_PONYTAIL_PINK', outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_FLOWER_CROWN', effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_LIGHT',  hairId:'HAIR_BUN_BLONDE',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_NONE',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_MEDIUM', hairId:'HAIR_BOB_BROWN',     outfitId:'OUTFIT_DRESS_WHITE', accId:'ACC_VEIL',         effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_DARK',   hairId:'HAIR_SHORT_SILVER',  outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_GLASSES',      effectId:'FX_NONE' },
  { gender:'female', skinId:'SKIN_MEDIUM', hairId:'HAIR_LONG_BLACK',    outfitId:'OUTFIT_DRESS_PINK',  accId:'ACC_NONE',         effectId:'FX_NONE' },
  // 남성 하객
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_BOW_TIE', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_MEDIUM', hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_GLASSES', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_DARK',   hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_NONE',    effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_NONE',    effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_MEDIUM', hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_BOW_TIE', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_DARK',   hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_GLASSES', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_LONG_BLACK',   outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_NONE',    effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_MEDIUM', hairId:'HAIR_WAVY_BROWN',   outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_GLASSES', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_DARK',   hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_BOW_TIE', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_NONE',    effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_MEDIUM', hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_GLASSES', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_DARK',   hairId:'HAIR_LONG_BLACK',   outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_BOW_TIE', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_WAVY_BROWN',   outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_NONE',    effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_MEDIUM', hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_GLASSES', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_DARK',   hairId:'HAIR_SHORT_SILVER', outfitId:'OUTFIT_SUIT_BLACK',  accId:'ACC_BOW_TIE', effectId:'FX_NONE' },
  { gender:'male', skinId:'SKIN_LIGHT',  hairId:'HAIR_BOB_BROWN',    outfitId:'OUTFIT_SUIT_BEIGE',  accId:'ACC_NONE',    effectId:'FX_NONE' },
];
