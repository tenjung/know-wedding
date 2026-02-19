"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Phone, Calendar, Clock, CheckCircle2, PhoneCall } from "lucide-react";
import { toast } from "sonner";

// DB 제약: PENDING | CONTACTED | COMPLETED | CANCELLED
type InquiryStatus = "PENDING" | "CONTACTED" | "COMPLETED" | "CANCELLED";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  wedding_date: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

const STATUS_LABEL: Record<InquiryStatus, string> = {
  PENDING: "대기중",
  CONTACTED: "연락완료",
  COMPLETED: "상담완료",
  CANCELLED: "취소",
};

const STATUS_CLASS: Record<InquiryStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-slate-100 text-slate-500 line-through",
};

export function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // public 스키마에 생성된 뷰(consult_inquiries)를 통해 접근
  // 실제 데이터는 nowedding.consult_inquiries에 저장됨

  useEffect(() => {
    fetchInquiries();

    // 뷰(public.consult_inquiries)는 realtime 직접 구독 불가
    // → 30초 폴링으로 신규 상담 신청 감지
    const timer = setInterval(() => {
      fetchInquiries();
    }, 30_000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchInquiries() {
    const { data, error } = await supabase
      .from("consult_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[InquiryList] fetch error:", error.message, error.code);
      toast.error(`데이터 로딩 실패: ${error.message}`);
    } else {
      setInquiries((data as Inquiry[]) || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: InquiryStatus) {
    const { error } = await supabase
      .from("consult_inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error(`상태 업데이트 실패: ${error.message}`);
    } else {
      toast.success(`${STATUS_LABEL[status]}으로 변경되었습니다.`);
      fetchInquiries();
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass p-6 rounded-3xl animate-pulse">
            <div className="h-4 bg-muted/40 rounded w-1/3 mb-3" />
            <div className="h-3 bg-muted/30 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          상담 신청 현황
          <span className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-full">
            LIVE
          </span>
        </h3>
        <span className="text-xs text-muted-foreground">
          총 {inquiries.length}건
        </span>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center glass rounded-3xl text-sm text-muted-foreground border-dashed border-2">
            접수된 상담 신청이 없습니다.
          </div>
        ) : (
          inquiries.map((item) => (
            <div
              key={item.id}
              className="glass p-6 rounded-3xl border border-muted/30 hover:border-accent/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">
                      {item.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                        STATUS_CLASS[item.status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {STATUS_LABEL[item.status] ?? item.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {item.phone}
                    </div>
                    {item.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {item.email}
                      </div>
                    )}
                    {item.wedding_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.wedding_date}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.created_at).toLocaleString("ko-KR")}
                    </div>
                  </div>

                  {item.message && (
                    <p className="text-sm text-primary/70 bg-black/5 p-4 rounded-2xl italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}
                </div>

                {/* 상태 전환 버튼: CANCELLED 이 아닌 건만 액션 노출 */}
                {item.status !== "CANCELLED" && (
                  <div className="flex gap-2 flex-shrink-0">
                    {item.status === "PENDING" && (
                      <button
                        onClick={() => updateStatus(item.id, "CONTACTED")}
                        className="h-10 px-4 bg-blue-600 text-white rounded-xl text-xs font-bold hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <PhoneCall className="h-4 w-4" />
                        연락완료
                      </button>
                    )}
                    {(item.status === "PENDING" ||
                      item.status === "CONTACTED") && (
                      <button
                        onClick={() => updateStatus(item.id, "COMPLETED")}
                        className="h-10 px-4 bg-primary text-white rounded-xl text-xs font-bold hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        상담완료
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus(item.id, "CANCELLED")}
                      className="h-10 px-4 glass text-muted-foreground rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-700 transition-all"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
