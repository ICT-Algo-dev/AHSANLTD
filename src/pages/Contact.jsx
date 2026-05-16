import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [questionTopic, setQuestionTopic] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">Need help with your order? Our customer service team is ready to assist you.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Customer Service</h2>
            <nav className="mt-6 space-y-2 text-sm">
              <Link to="/contact" className="block rounded-2xl px-4 py-3 text-slate-900 hover:bg-slate-100">Customer Service</Link>
              {/* <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Returns Center</Link> */}
              {/* <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Email Preference Center</Link> */}
              {/* <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Trade in Your Watch</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Sell Us Your Watch</Link>
              <Link to="#" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Sell Us Your Rolex</Link> */}
              <Link to="/order-status" className="block rounded-2xl px-4 py-3 text-slate-600 hover:bg-slate-100">Order Status</Link>
            </nav>
          </aside>

          <main className="space-y-8">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">Customer Service</h2>
                  <p className="mt-2 text-sm text-slate-500">Get help with orders, returns, account questions, and more.</p>
                </div>
                <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800">Back to Home</Link>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-100 p-6">
                <p className="text-sm text-slate-600">Mon – Thur: 9:00AM to 6:00PM GMT, Fri: 9:00AM to 3:00PM GMT</p>
                <p className="mt-4 text-base font-semibold text-slate-900">Phone: +44 7376 705595</p>
                <div className="mt-5 inline-flex items-center gap-3 rounded-3xl border border-slate-300 bg-white px-4 py-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700">💬</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Chat or Call +44 7376 705595</p>
                    <p className="text-sm text-slate-500">Our team is available during business hours.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Send us a message</h3>
              <p className="mt-2 text-sm text-slate-600">Fill out the form below and we&apos;ll respond as soon as possible.</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Name *</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email *</span>
                  <input
                    type="email"
                    placeholder="Please enter your email address"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-black"
                  />
                </label>
              </div>

              <div className="mt-6">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">My question is about *</span>
                  <select
                    value={questionTopic}
                    onChange={(e) => setQuestionTopic(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-black"
                  >
                    <option value="">Select a topic</option>
                    <option value="order-status">Order Status</option>
                    <option value="returns">Returns</option>
                    <option value="payment">Payment</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-100 p-6">
                <p className="text-sm font-medium text-slate-900">I&apos;m not a robot</p>
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-4">
                  <span className="text-sm text-slate-500">reCAPTCHA placeholder</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500">✓</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white hover:bg-slate-900">
                Submit
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;
