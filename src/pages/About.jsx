import React from 'react';

const BillboardGraphic = () => {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-[440px]" aria-hidden="true">
      <g stroke="#111827" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M172 98l22-12v148l-22 13z" fill="#fff" />
        <path d="M295 76l23-14v149l-23 14z" fill="#fff" />
        <path d="M173 98l26 0 0 148 -27 0z" fill="none" />
        <path d="M295 76l27 0 0 149 -27 0z" fill="none" />
        <path d="M195 132l-36 21M195 163l-36 22M195 196l-36 22M194 133l36 21M194 164l36 23M194 197l36 22" fill="none" />
        <path d="M318 110l-35 21M318 141l-35 21M318 173l-35 22M318 110l35 22M318 141l35 22M318 173l35 22" fill="none" />
        <path d="M132 143L395 22l44 17-264 121z" fill="#ffe065" />
        <path d="M132 143v92l43 17V160z" fill="#ffcf45" />
        <path d="M175 160L439 39v91L175 252z" fill="#ffd84d" />
        <path d="M132 235l263-121 44 16-264 122z" fill="#f9b53d" />
      </g>
      <g transform="translate(150 95) rotate(-24)">
        <text
          x="0"
          y="30"
          fill="#fff"
          fontSize="24"
          fontWeight="900"
          fontFamily="Arial Black, Arial, sans-serif"
          letterSpacing="2"
          stroke="#d9165b"
          strokeWidth="4"
          style={{ paintOrder: 'stroke fill' }}
        >
          AHSAN E SALES
        </text>
      </g>
    </svg>
  );
};

const DialGraphic = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px]" aria-hidden="true">
      <circle cx="100" cy="100" r="95" fill="none" stroke="#111827" strokeWidth="4" />
      <path d="M 35 135 A 75 75 0 1 1 165 135" fill="none" stroke="#111827" strokeWidth="6" strokeDasharray="2 12" strokeLinecap="round" />
      <path d="M 50 125 A 55 55 0 1 1 150 125" fill="none" stroke="#111827" strokeWidth="3" />
      <line x1="100" y1="100" x2="135" y2="140" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="100" r="4" fill="#111827" />
      <defs>
        <path id="textArc" d="M 28 145 A 75 75 0 0 0 172 145" />
      </defs>
      <text fill="#111827" fontSize="17" fontWeight="800" letterSpacing="1.5">
        <textPath href="#textArc" startOffset="50%" textAnchor="middle">
          • NEVER PAY RET •
        </textPath>
      </text>
    </svg>
  );
};

const BubblesGraphic = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full h-full opacity-90 px-4 py-8">
      <div className="flex gap-3 ml-8">
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
      </div>
      <div className="flex gap-3 mr-12">
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100 hidden sm:block">Never Pay Retail®</span>
      </div>
      <div className="flex gap-3">
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100 hidden sm:block">Never Pay Retail®</span>
        <span className="bg-blue-500 text-white text-[10px] sm:text-xs font-bold px-5 py-2 rounded-full whitespace-nowrap shadow-md">AHSAN E SALES</span>
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
      </div>
      <div className="flex gap-3 ml-6">
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100 hidden sm:block">Never Pay Retail®</span>
      </div>
      <div className="flex gap-3 mr-8">
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
        <span className="bg-white text-gray-500 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100">Never Pay Retail®</span>
      </div>
    </div>
  );
};

const BagGraphic = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[160px]" aria-hidden="true">
      <g stroke="#111827" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M 100 75 L 100 50 C 100 45, 120 45, 120 50 L 120 70" fill="none" />
        <path d="M 130 85 L 160 65 L 160 145 L 130 165 Z" fill="#e5e7eb" />
        <path d="M 80 100 L 110 80 L 160 65 L 130 85 Z" fill="#fbbf24" />
        <path d="M 80 100 L 130 85 L 130 165 L 80 180 Z" fill="#fff" />
        <path d="M 90 90 L 90 65 C 90 60, 110 55, 110 65 L 110 80" fill="none" />
      </g>
      <g transform="translate(105 135) rotate(-16)">
        <text
          x="0"
          y="0"
          fill="#111827"
          fontSize="11"
          fontWeight="900"
          fontFamily="Arial Black, sans-serif"
          textAnchor="middle"
        >
          AHSAN E SALES
        </text>
      </g>
    </svg>
  );
};

const PerfumeGraphic = () => {
  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[180px]" aria-hidden="true">
      <g stroke="#111827" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M 105 50 L 135 40 L 145 45 L 115 55 Z" fill="#2dd4bf" />
        <path d="M 105 50 L 115 55 L 115 70 L 105 65 Z" fill="#14b8a6" />
        <path d="M 115 55 L 145 45 L 145 60 L 115 70 Z" fill="#0f766e" />
        <path d="M 110 70 L 135 60 L 135 75 L 110 85 Z" fill="#e5e7eb" />
        <path d="M 115 100 L 165 85 L 165 155 L 115 170 Z" fill="#c0a6e3" />
        <path d="M 85 90 L 115 100 L 115 170 L 85 160 Z" fill="#d8c5ef" />
        <path d="M 85 90 L 135 75 L 165 85 L 115 100 Z" fill="#e8dff5" />
      </g>
      <g stroke="#111827" strokeWidth="4" strokeLinejoin="round" fill="#fff">
        <path d="M 92 105 L 108 110 L 108 155 L 92 150 Z" />
      </g>
      <g transform="translate(100 130) rotate(17)">
        <text x="0" y="-8" fill="#111827" fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle">NEVER</text>
        <text x="0" y="4" fill="#111827" fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle">PAY</text>
        <text x="0" y="16" fill="#111827" fontSize="10" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle">RETAIL®</text>
      </g>
      <path d="M 50 85 Q 60 85 60 75 Q 60 85 70 85 Q 60 85 60 95 Q 60 85 50 85 Z" fill="#fbd22e" stroke="#111827" strokeWidth="3" />
      <path d="M 165 185 Q 170 185 170 180 Q 170 185 175 185 Q 170 185 170 190 Q 170 185 165 185 Z" fill="#fbd22e" stroke="#111827" strokeWidth="3" />
    </svg>
  );
};

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1000px]">
        
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="bg-[#f0dfaa] rounded p-8 flex justify-center items-center h-[300px] md:h-[320px]">
             <BillboardGraphic />
          </div>
          <div className="flex flex-col justify-center py-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Who We Are</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">The Internet's Best Kept Secret</h2>
            <p className="text-[#333333] leading-relaxed text-[15px]">
              For over 20 years, AHSAN E SALES LTD has been building a premier online shop and selling some of the most sought after luxury and fashion items to customers around the globe.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="flex flex-col justify-center py-4 order-2 md:order-1">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">What Is Never Pay Retail</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">A Lifestyle</h2>
            <p className="text-[#333333] leading-relaxed text-[15px]">
              Never Pay Retail is a shopping attitude and lifestyle that so many of us try to live by. We believe that you should be able to access your favorite items at insider prices. If you believe in Never Pay Retail then you believe that you should be able to look amazing while not breaking the bank.
            </p>
          </div>
          <div className="bg-[#f4f5f7] rounded p-8 flex justify-center items-center h-[300px] md:h-[320px] order-1 md:order-2">
            <DialGraphic />
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="bg-[#f4f5f7] rounded p-8 flex justify-center items-center h-[300px] md:h-[320px]">
            <BubblesGraphic />
          </div>
          <div className="flex flex-col justify-center py-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">How It Works</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">We Make It Easy</h2>
            <p className="text-[#333333] leading-relaxed text-[15px]">
              This is the easy part. Go to AHSAN E SALES LTD and browse the over 75,000 unique items to find that perfect watch, handbag, sunglasses, shoe, fragrance etc. If you know what you want, we recommend that you use the search box to find that unique item. If you are searching for that perfect item, we recommend that you browse our categories, or our sale page for the current promotions. Be sure to follow @AHSANESALES on Instagram or Facebook for exclusive content and access to our most updated sales.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="flex flex-col justify-center py-4 order-2 md:order-1">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">The Brands</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">Over 650 Of Fashion<br className="hidden md:block" /> Top Brands</h2>
            <p className="text-[#333333] leading-relaxed text-[15px]">
              Most of the world's most iconic brands, in one convenient location. Finally, you can shop high end and affordable all in one place.
            </p>
          </div>
          <div className="bg-[#fae8e6] rounded p-8 flex justify-center items-center h-[300px] md:h-[320px] order-1 md:order-2">
            <BagGraphic />
          </div>
        </div>

        {/* Section 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="bg-[#f5eaff] rounded p-8 flex justify-center items-center h-[300px] md:h-[320px]">
            <PerfumeGraphic />
          </div>
          <div className="flex flex-col justify-center py-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Best Practices</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">#NeverPayRetail</h2>
            <p className="text-[#333333] leading-relaxed text-[15px] mb-4">
              To find exactly what you are looking for, you should use the filters to narrow down the results by brand, price, color, and size.
            </p>
            <p className="text-[#333333] leading-relaxed text-[15px]">
              Be sure to check out the sale page for the most updated sale events and promotions. Should you have any further questions about products you can reach AHSAN E SALES LTD by phone, chat or even whatsapp. Happy Shopping!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
