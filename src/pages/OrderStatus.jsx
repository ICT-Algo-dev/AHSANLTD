import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchBy, setSearchBy] = useState('email');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Help Center</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Help Center</h2>
            <nav className="mt-6 space-y-2 text-sm">
              <Link to="/order-status" className="block rounded-2xl bg-black px-4 py-3 text-white hover:bg-slate-900">Order Status</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Order Information</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Shipping Options</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">International Shipping</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Payment Options</Link>
              {/* <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Sell Us Your Rolex</Link>
              <Link to="/contact" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Customer Service</Link> */}
            </nav>
          </aside>

          <main className="space-y-8">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900">Check My Order Status</h2>
              <p className="mt-4 max-w-2xl text-sm text-slate-600">
                Hi there, before we proceed we&apos;re going to need a little bit more information about the order you placed.
                Kindly provide us with the Order ID, the last name you used for your billing address and the email address associated with your account or zip code associated with the order.
                Thanks!
              </p>
              <p className="mt-6 text-sm text-slate-500">
                If you already have an account with AHSAN E SALES LTD, there&apos;s a simpler way to view your orders. Just <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">login here</Link>.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Order ID *</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Order ID"
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Billing Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Billing Last Name"
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Find Order By</label>
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-black"
                  >
                    <option value="email">Email Address</option>
                    <option value="zip">Zip Code</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Email Address"
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-black"
                  />
                </div>

                {/* <div className="rounded-3xl bg-slate-100 p-6">
                  <p className="text-sm font-medium text-slate-900">I&apos;m not a robot</p>
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-4">
                    <span className="text-sm text-slate-500">reCAPTCHA placeholder</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500">✓</span>
                  </div>
                </div> */}

                <button className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white hover:bg-slate-900">
                  Check Status
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
