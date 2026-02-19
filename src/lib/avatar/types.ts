export interface AvatarConfig {
  gender: 'female' | 'male';
  skinId: string;
  hairId: string;
  outfitId: string;
  accId: string;
  effectId: string;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  gender: 'female',
  skinId: 'SKIN_LIGHT',
  hairId: 'HAIR_BOB_BROWN',
  outfitId: 'OUTFIT_DRESS_WHITE',
  accId: 'ACC_VEIL',
  effectId: 'FX_HEARTS',
};

export interface PartOption {
  id: string;
  label: string;
  emoji?: string;
}

export interface SkinOption extends PartOption {
  color: string;
}

export interface HairOption extends PartOption {
  style: 'bob' | 'long' | 'bun' | 'wavy' | 'ponytail' | 'short';
  color: string;
}
