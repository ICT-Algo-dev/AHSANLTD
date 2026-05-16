import React from 'react';

const TrustpilotLogo = ({ className = "" }) => (
  <img src="/Trustpilot.png" alt="Trustpilot" className={`max-w-[250px] object-contain ${className}`} />
);

const TrustpilotIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 512 512" className={`${className} text-[#00b67a]`} fill="currentColor" aria-hidden="true">
    <path d="M256 32c-123.7 0-224 100.3-224 224s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm102.5 168.3l-92.4 4.1-35.9-88c-1.6-4.1-5.7-6.7-10.1-6.7s-8.5 2.6-10.1 6.7l-35.9 88-92.4-4.1c-4.5-.2-8.7 2.4-10.5 6.5-1.9 4-1.2 8.8 1.8 12.2l70 77.2-21.9 90.3c-1.1 4.4.6 9.1 4.5 11.5 3.8 2.5 8.8 2.2 12.4-.6L256 334.3l78.2 63.1c3.6 2.9 8.6 3.1 12.4.6 3.8-2.5 5.6-7.1 4.5-11.5l-21.9-90.3 70-77.2c3-3.4 3.7-8.2 1.8-12.2-1.9-4.1-6-6.7-10.5-6.5z" />
  </svg>
);

const AmazonLogo = () => (
  <img src="/Amazon.png" alt="Amazon" className="max-w-[250px] object-contain" />
);

const EbayLogo = () => (
  <img src="/Ebay.png" alt="eBay" className="max-w-[200px] object-contain" />
);

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ name, date, title, text, source, avatar }) => (
  <div className="break-inside-avoid mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
    <div className="flex items-center gap-4 mb-5">
      <div className="w-14 h-14 bg-gray-200 text-gray-700 font-bold text-2xl rounded-full flex items-center justify-center">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <StarRating rating={5} />
        <p className="font-bold text-slate-900 text-lg mt-1">{name}</p>
      </div>
    </div>
    
    <div className="mb-5 text-base sm:text-lg text-gray-700">
      {title && <p className="font-bold mb-2 text-lg sm:text-xl">{title}</p>}
      <p className="leading-relaxed">{text}</p>
    </div>
    
    <p className="text-sm text-gray-500 mb-5">{date}</p>
    
    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
      <span>Source:</span>
      {source === 'Trustpilot' && (
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-base">
          <TrustpilotIcon className="w-6 h-6"/> Trustpilot
        </div>
      )}
      {source === 'eBay' && (
        <div className="flex items-center font-bold text-slate-800 tracking-tighter text-xl">
          <span className="text-[#e53238]">e</span><span className="text-[#0064d2]">b</span><span className="text-[#f5af02]">a</span><span className="text-[#86b817]">y</span>
        </div>
      )}
    </div>
  </div>
);

const reviewsData = [
  { name: 'Jonathan Madrid', date: '15 May, 2026', text: 'Excelente servicio', source: 'Trustpilot' },
  { name: 'Jennifer', date: '15 May, 2026', text: 'Easy order system. Simple and quick checkout. Auto applied discount codes. Great prices! Reasonable shipping.', source: 'Trustpilot' },
  { name: 'Brian Valle', date: '15 May, 2026', text: '👍👌 muy buenos', source: 'Trustpilot' },
  { name: 'Kenneth Powell', date: '15 May, 2026', text: 'Great prices, quality product!', source: 'Trustpilot' },
  { name: 'lapriest j burrell', date: '15 May, 2026', text: 'Nothing, But it takes a moment to get here.', source: 'Trustpilot' },
  { name: 'Abner Sanchez', date: '15 May, 2026', text: "It's a very good site and offers very good products.", source: 'Trustpilot' },
  { name: 'ivan gonzalez', date: '15 May, 2026', text: 'The authenticity of the products and quality', source: 'Trustpilot' },
  { name: 'Amanda Sandlin', date: '15 May, 2026', text: 'Easy to order and absolutely perfect quality at $200 less than retail', source: 'Trustpilot' },
  { name: 'abraham pino', date: '15 May, 2026', text: "Everything I got from here I've been good and fast", source: 'Trustpilot' },
  { name: 'Jael', date: '15 May, 2026', text: 'Low prices for renowned brands', source: 'Trustpilot' },
  { name: 'Majid Taher...', date: '15 May, 2026', text: 'Always have great deals on colognes!', source: 'Trustpilot' },
  { name: 'Oisnely Diaz Licor', date: '15 May, 2026', text: 'Muy buen precio', source: 'Trustpilot' }
];

const Reviews = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Customer AHSAN E SALES LTD Reviews</h1>
          <p className="text-gray-500 max-w-4xl mx-auto leading-relaxed text-sm md:text-base">
            Since our founding in 2022, AHSAN E SALES LTD has earned over 1 Million positive verified 5 star reviews! AHSAN E SALES LTD is determined to offer outstanding service before, during, and after the sale. Our goal is to earn the trust and satisfaction of the customer with great service and positive customer experience.
          </p>
        </div>

        <div className="space-y-12">
          {/* Trustpilot Block */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#eefbf3] rounded-sm p-12 flex justify-center items-center h-[350px]">
              <TrustpilotLogo />
            </div>
            <div className="flex flex-col justify-center px-4 md:px-12 text-center md:text-left">
              <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed mb-6">
                Fantastic service, speedy delivery and a great selection are some of the reasons why TrustPilot customers ranked us so high!
              </p>
              <p className="text-slate-800 font-bold mb-8 text-2xl sm:text-3xl">
                "Ease of Ordering, Customer Service, Selection On-Time Delivery"
              </p>
            </div>
          </div>

          {/* Amazon Block */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center px-4 md:px-12 text-center md:text-left order-2 md:order-1">
              <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed mb-6">
                4.9 stars over the past 12 months (77,000+ lifetime ratings)
              </p>
              <p className="text-slate-800 font-bold mb-8 text-2xl sm:text-3xl">
                "Good communication, everything about this sale was as it should be. Will buy from seller again in the future."
              </p>
            </div>
            <div className="bg-[#fdfbf0] rounded-sm p-12 flex justify-center items-center h-[350px] order-1 md:order-2">
              <AmazonLogo />
            </div>
          </div>

          {/* eBay Block */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#f4f5f7] rounded-sm p-12 flex justify-center items-center h-[350px]">
              <EbayLogo />
            </div>
            <div className="flex flex-col justify-center px-4 md:px-12 text-center md:text-left">
              <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed mb-6">
                99% positive over the past 12 months (186,732+ ratings)
              </p>
              <p className="text-slate-800 font-bold mb-8 text-2xl sm:text-3xl">
                "Thank you a lot! I am happy with my purchase! Good price quality and shipping"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Reviews Grid */}
      <div className="bg-[#fafafa] py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header Stats */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-800 tracking-widest uppercase mb-2">Average Rating</p>
              <div className="flex items-center justify-center gap-3 mb-1">
                <StarRating rating={5} />
                <span className="text-2xl font-bold text-slate-900">4.7</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                113363 Reviews
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap items-center justify-center gap-6 w-full max-w-md">
               <div className="flex items-center gap-1 font-bold text-sm"><TrustpilotIcon className="w-4 h-4"/> Trustpilot</div>
               <div className="font-bold text-sm tracking-tighter"><span className="text-[#e53238]">e</span><span className="text-[#0064d2]">b</span><span className="text-[#f5af02]">a</span><span className="text-[#86b817]">y</span></div>
               <div className="font-bold text-sm text-gray-500">Sitejabber</div>
               <div className="font-bold text-sm text-pink-600">ResellerRatings</div>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {reviewsData.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Reviews;
