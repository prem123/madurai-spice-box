"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const ORDERS = [
  { name: "Priya", city: "Chennai", item: "Sambar Powder" },
  { name: "Karthik", city: "Madurai", item: "Chicken Masala" },
  { name: "Lakshmi", city: "Coimbatore", item: "Health Mix" },
  { name: "Arun", city: "Trichy", item: "Idly Podi" },
  { name: "Deepa", city: "Bengaluru", item: "Garam Masala" },
  { name: "Suresh", city: "Salem", item: "Coriander Powder" },
  { name: "Meena", city: "Tirunelveli", item: "Turmeric Powder" },
  { name: "Ramesh", city: "Madurai", item: "Kuzhambu Powder" },
];

export function SocialProof() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let i = 0;
    const cycle = () => {
      setIndex(i % ORDERS.length);
      setVisible(true);
      i++;
      setTimeout(() => setVisible(false), 4500);
    };
    const first = setTimeout(cycle, 6000);
    const interval = setInterval(cycle, 13000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;
  const order = ORDERS[index];
  const mins = 2 + (index % 9);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-24 left-4 z-30 max-w-[17rem] md:bottom-6 md:left-6"
        >
          <div className="relative flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-3 pr-8 shadow-card">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-whatsapp/15">
              <CheckCircle2 className="h-5 w-5 text-whatsapp-dark" />
            </div>
            <div className="text-xs leading-tight">
              <p className="font-semibold text-brand-800">
                {order.name} from {order.city}
              </p>
              <p className="text-muted-foreground">
                ordered <span className="font-medium">{order.item}</span>
              </p>
              <p className="mt-0.5 text-[10px] text-spice">{mins} mins ago · ✅ verified</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-muted-foreground hover:text-brand-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
