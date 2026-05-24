const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 text-left">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold tracking-[0.2em] uppercase">AHSAN E SALES LTD</h2>
            <p className="mt-2 text-sm text-gray-300">— Since 2022</p>
            {/* <p className="mt-4 text-sm text-gray-400">Never Pay Retail®</p> */}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/contact" className="hover:text-white">Customer Service</a></li>
              <li><a href="/order-status" className="hover:text-white">Order Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 mb-4">Company Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white">About AHSAN E SALES LTD</a></li>
              <li><a href="/reviews" className="hover:text-white">AHSAN E SALES LTD Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 mb-4">Help Center</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Order Information</a></li>
              <li><a href="#" className="hover:text-white">Shipping Options</a></li>
              <li><a href="#" className="hover:text-white">International Shipping</a></li>
              <li><a href="#" className="hover:text-white">Payment Options</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 mb-4">Returns & Warranty</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Returns & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-white">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-white">Warranty Repair Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-200 mb-4">Customer Service</h3>
            <p className="text-sm text-gray-300">+44 7828 729275</p>
            <p className="mt-3 text-sm text-gray-400">03 St. Awdry’s Road Barking IG11 7QB</p>
          </div>
        </div>
      </div>
      

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full border border-gray-700 bg-gray-900 px-5 py-2 text-base uppercase tracking-[0.2em]">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full">
                <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden="true" focusable="false">
                  <rect width="60" height="30" fill="#012169" />
                  <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
                  <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
                </svg>
              </span>
              UK
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-10 w-16 items-center justify-center rounded-md bg-white text-xs font-semibold text-black">VISA</span>
              <span className="inline-flex h-10 w-16 items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-red-600 text-xs font-semibold text-white">MC</span>
              <span className="inline-flex h-10 w-20 items-center justify-center rounded-md bg-blue-600 text-xs font-semibold text-white">AMEX</span>
              <span className="inline-flex h-10 w-20 items-center justify-center rounded-md bg-blue-700 text-xs font-semibold text-white">PayPal</span>
              <span className="inline-flex h-10 w-16 items-center justify-center rounded-md bg-yellow-400 text-xs font-semibold text-black">BTC</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <a href="#" className="hover:text-white">Terms & Conditions</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              {/* <a href="#" className="hover:text-white">Careers</a> */}
            </div>

            <div className="text-center md:text-right text-gray-400">
              <span>Customer # 113 156 400</span>
              <span className="mx-2">|</span>
              <span>© 2022 AHSAN E SALES LTD. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
