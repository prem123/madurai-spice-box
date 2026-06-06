import { Star, CheckCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

const reviews = [
  {
    name: "Priya Subramanian",
    city: "Chennai",
    time: "10:24 AM",
    text: "The sambar powder tastes exactly like my grandmother's! So fresh and aromatic. Ordering on WhatsApp was super easy too. 🙏",
    initial: "P",
    color: "bg-spice",
  },
  {
    name: "Karthik R.",
    city: "Madurai",
    time: "Yesterday",
    text: "Chicken masala is 🔥🔥. My whole family noticed the difference. Genuine homemade quality, no artificial smell at all.",
    initial: "K",
    color: "bg-brand-600",
  },
  {
    name: "Lakshmi Devi",
    city: "Coimbatore",
    time: "2 days ago",
    text: "Been using the Health Mix every morning for my kids. 31 ingredients and they actually love the taste. Highly recommend! ❤️",
    initial: "L",
    color: "bg-chilli",
  },
  {
    name: "Arun Prasad",
    city: "Trichy",
    time: "3 days ago",
    text: "Idly podi with ghee = pure bliss. Fast delivery to Trichy and lovely packaging. Will order again for sure.",
    initial: "A",
    color: "bg-brand-500",
  },
  {
    name: "Meena Krishnan",
    city: "Bengaluru",
    time: "5 days ago",
    text: "Finally found authentic Tamil masalas in Bengaluru. The turmeric colour is so natural and rich. Thank you Madurai Spice Box!",
    initial: "M",
    color: "bg-spice",
  },
  {
    name: "Suresh Kumar",
    city: "Salem",
    time: "1 week ago",
    text: "Ordered the kuzhambu powder, exactly the traditional taste I was missing. Payment on WhatsApp was quick and smooth. 👍",
    initial: "S",
    color: "bg-brand-600",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-beige/40">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Real Customers, Real Reviews"
          title="Loved on WhatsApp"
          subtitle="Messages from families who've made Madurai Spice Box part of their kitchen."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i % 3}>
              <div className="flex h-full flex-col rounded-2xl border border-brand-100 bg-[#E5F6E9] p-1 shadow-soft">
                {/* WhatsApp chat bubble */}
                <div className="relative flex-1 rounded-xl rounded-tl-sm bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${r.color} font-serif text-lg font-semibold text-white`}
                    >
                      {r.initial}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-800">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{r.city}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-spice text-spice"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-brand-700">
                    {r.text}
                  </p>
                  <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                    {r.time}
                    <CheckCheck className="h-3.5 w-3.5 text-[#34B7F1]" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
