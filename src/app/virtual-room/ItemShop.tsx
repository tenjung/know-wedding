"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Gift, 
  Sparkles, 
  Music, 
  Star, 
  Zap,
  ShoppingBag,
  CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Item {
  id: string;
  name: string;
  type: string;
  price: number;
  payload_schema: any;
}

interface ItemShopProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: Item) => void;
}

export function ItemShop({ isOpen, onClose, onPurchase }: ItemShopProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  async function fetchItems() {
    setLoading(true);
    // nowedding.items는 public.nowedding_items 뷰를 통해 접근 (PGRST106 방지)
    const { data, error } = await supabase
      .from("nowedding_items")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("[ItemShop] fetch error:", error.message, error.code);
      toast.error(`아이템 목록 로딩 실패: ${error.message}`);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  const getItemIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'EFFECT': return <Sparkles className="h-5 w-5" />;
      case 'BILLBOARD': return <Zap className="h-5 w-5" />;
      case 'AURA': return <Star className="h-5 w-5" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          
          {/* Shop Modal */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl px-6"
          >
            <div className="glass-card bg-white/90 p-8 rounded-[40px] shadow-2xl border-accent/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Wedding Registry & Items</h2>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Celebrate with Special Effects</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="h-10 w-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:bg-rose-50 hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="glass p-5 rounded-3xl border-muted/30 hover:border-accent/40 hover:bg-accent/5 transition-all group flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => onPurchase(item)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          {getItemIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-primary">₩{item.price.toLocaleString()}</p>
                        <span className="text-[9px] font-bold text-accent uppercase underline decoration-accent/30 underline-offset-4">Purchase</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-muted/30 flex items-center justify-between">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Secure Payment by Know Wedding
                </p>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-6 w-6 rounded-full border-1 border-white bg-secondary" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
