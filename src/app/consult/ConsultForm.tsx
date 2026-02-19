"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Heart,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STEPS = [
  { 
    id: "NAME", 
    question: "먼저, 가장 소중한 두 분의 성함을 알려주세요.", 
    field: "name", 
    icon: User, 
    placeholder: "성함 (예: 홍길동 & 김영희)" 
  },
  { 
    id: "PHONE", 
    question: "상담을 위해 연락 가능한 휴대폰 번호를 부탁드려요.", 
    field: "phone", 
    icon: Phone, 
    placeholder: "010-0000-0000" 
  },
  { 
    id: "DATE", 
    question: "그려오신 예식 예정일이 있으신가요? (선택사항)", 
    field: "weddingDate", 
    icon: Calendar, 
    type: "date" 
  },
  { 
    id: "MESSAGE", 
    question: "Know Wedding에 대해 궁금한 점이나 전하고 싶은 메시지가 있나요?", 
    field: "message", 
    icon: MessageSquare, 
    placeholder: "메시지를 남겨주세요." 
  }
];

export function ConsultForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    weddingDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const supabase = createClient();

  const handleNext = () => {
    if (currentStep === 0 && !formData.name.trim()) {
      toast.error("성함을 입력해 주세요.");
      return;
    }
    if (currentStep === 1 && !formData.phone.trim()) {
      toast.error("연락처를 입력해 주세요.");
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("consult_inquiries")
        .insert({
          name: formData.name,
          phone: formData.phone,
          wedding_date: formData.weddingDate || null,
          message: formData.message,
          status: "PENDING"
        });

      if (error) throw error;

      toast.success("상담 신청이 정상적으로 접수되었습니다.");
      setIsDone(true);
      
      // 실시간 알림 (Master Console에서 구독 중인 채널이 있다면 전파 가능)
      // channel.send({ type: 'broadcast', event: 'admin_alert', payload: { type: 'CONSULT', name: formData.name } })
      
    } catch (error) {
      console.error(error);
      toast.error("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 py-20"
      >
        <div className="mx-auto h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-primary">신청이 완료되었습니다.</h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            남겨주신 소중한 정보를 바탕으로 <br />
            웨딩 매니저가 곧 연락드리겠습니다.
          </p>
        </div>
        <button 
          onClick={() => router.push("/")}
          className="bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  const step = STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="space-y-12">
      {/* 프로그래스 바 */}
      <div className="flex justify-center gap-3">
        {STEPS.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 w-12 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-muted/30'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-10"
        >
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 text-accent">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[.3em]">Step 0{currentStep + 1}</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight">
               {step.question}
             </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Icon className="h-6 w-6" />
            </div>
            {step.type === "date" ? (
              <input 
                type="date"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className="w-full bg-white/50 border border-muted/50 rounded-3xl py-6 pl-16 pr-6 text-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              />
            ) : step.field === "message" ? (
              <textarea 
                placeholder={step.placeholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/50 border border-muted/50 rounded-[40px] py-10 pl-16 pr-6 text-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-40"
              />
            ) : (
              <input 
                type="text"
                placeholder={step.placeholder}
                value={(formData as any)[step.field]}
                onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className="w-full bg-white/50 border border-muted/50 rounded-full py-6 pl-16 pr-6 text-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-10">
        <button 
          onClick={handleBack}
          disabled={currentStep === 0 || isSubmitting}
          className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest disabled:opacity-0 transition-all hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-primary text-white pl-8 pr-6 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : (currentStep === STEPS.length - 1 ? "Start Wedding Journey" : "Next Step")}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="pt-20 text-center">
         <div className="flex justify-center gap-3">
            <Heart className="h-4 w-4 text-accent/30 fill-accent/10" />
            <Heart className="h-4 w-4 text-accent/30 fill-accent/10" />
            <Heart className="h-4 w-4 text-accent/30 fill-accent/10" />
         </div>
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mt-6">Secure & Private Consulting</p>
      </div>
    </div>
  );
}
