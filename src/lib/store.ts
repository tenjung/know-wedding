import { create } from "zustand";
import type { AvatarConfig } from './avatar/types';
import { DEFAULT_AVATAR } from './avatar/types';

interface Message {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface Reaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
  timestamp: number;
}

interface AppState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Virtual Room States
  roomStatus: "LOBBY" | "CEREMONY" | "ARCHIVE";
  setRoomStatus: (status: "LOBBY" | "CEREMONY" | "ARCHIVE") => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  incrementGuest: () => void;
  
  // Realtime Messages
  messages: Message[];
  addMessage: (msg: Message) => void;
  removeMessage: (id: string) => void;
  
  // Realtime Reactions (Emojis)
  reactions: Reaction[];
  addReaction: (reaction: Reaction) => void;
  removeOldReactions: () => void;
  
  // Master Billboard
  billboardText: string;
  setBillboardText: (text: string) => void;

  // Background Skin
  roomBackground: string;
  setRoomBackground: (url: string) => void;
  currentSkinId: string;
  setCurrentSkinId: (id: string) => void;

  // Avatar Config
  avatarConfig: AvatarConfig;
  setAvatarConfig: (config: AvatarConfig) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  activeTab: "HOME",
  setActiveTab: (tab) => set({ activeTab: tab.toUpperCase() }),
  
  roomStatus: "LOBBY",
  setRoomStatus: (status) => set({ roomStatus: status }),
  guestCount: 0,
  setGuestCount: (count) => set({ guestCount: count }),
  incrementGuest: () => set((state) => ({ guestCount: state.guestCount + 1 })),
  
  messages: [],
  addMessage: (msg) => set((state) => ({ 
    messages: [...state.messages, msg] 
  })),
  removeMessage: (id) => set((state) => ({
    messages: state.messages.filter(m => m.id !== id)
  })),
  
  reactions: [],
  addReaction: (reaction) => set((state) => ({ 
    reactions: [...state.reactions, reaction] 
  })),
  removeOldReactions: () => set((state) => ({
    reactions: state.reactions.filter(r => Date.now() - r.timestamp < 2000)
  })),

  billboardText: "",
  setBillboardText: (text) => set({ billboardText: text }),

  roomBackground: "/wedding-hall-2d.png",
  setRoomBackground: (url) => set({ roomBackground: url }),
  currentSkinId: "SKIN_1",
  setCurrentSkinId: (id) => set({ currentSkinId: id }),

  avatarConfig: DEFAULT_AVATAR,
  setAvatarConfig: (config) => set({ avatarConfig: config }),
}));
