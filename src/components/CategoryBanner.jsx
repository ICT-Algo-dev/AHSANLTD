import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { name: "Beauty & Personal Care", image: "/Beauty & Personal Care.jpg", rotation: -15, scale: 1, top: '15%', left: '12%' },
  { name: "Health & Household", image: "/Health & Household.jpg", rotation: 12, scale: 0.9, top: '65%', left: '18%' },
  { name: "Pet Supplies", image: "/Pet Supplies.jpg", rotation: -8, scale: 0.85, top: '10%', left: '78%' },
  { name: "Automotives", image: "/Automotives.jpg", rotation: 15, scale: 1.05, top: '60%', left: '82%' },
  { name: "Sports & Outdoor", image: "/Sports & Outdoor.jpg", rotation: -5, scale: 0.95, top: '40%', left: '88%' }
];

export default function CategoryBanner() {
  return (
    <div className="relative w-[96%] max-w-[1450px] aspect-[4/1.2] overflow-hidden rounded-[40px] shadow-2xl banner-gradient border border-white/80 mx-auto my-8">
      {/* Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute -top-1/2 -left-1/4 w-[80%] h-full bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[80%] h-full bg-purple-100/40 rounded-full blur-[120px]" />
      </div>

      {/* Products */}
      <div className="absolute inset-0">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: cat.scale, rotate: cat.rotation }}
            whileHover={{ scale: cat.scale * 1.1, zIndex: 50 }}
            style={{ position: 'absolute', top: cat.top, left: cat.left, width: '18%', aspectRatio: '1/1' }}
          >
            <div className="relative w-full h-full glass-card rounded-3xl overflow-hidden p-1 shadow-lg">
              <img src={cat.image} className="w-full h-full object-cover rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="font-heading font-semibold text-blue-600/70 tracking-[0.5em] text-[10px] uppercase mb-2">Elite Showcase</span>
        <h1 className="font-display italic text-3xl md:text-6xl text-slate-800">GRADUATION</h1>
        <h2 className="font-sans font-black text-6xl md:text-9xl text-slate-900 leading-[0.7] mb-8">SALE</h2>
        <button className="bg-blue-700 text-white px-10 py-4 rounded-full font-heading font-black text-sm tracking-widest flex items-center gap-2">
          SHOP EVENTS UP TO 75% OFF <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

