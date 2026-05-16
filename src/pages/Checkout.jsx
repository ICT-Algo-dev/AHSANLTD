import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../lib/api';

const Checkout = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/cart`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        setCart({ items: [] });
        setError('Please log in first to view your cart.');
        return;
      }

      if (!response.ok) {
        throw new Error('Cart load failed');
      }

      const data = await response.json();
      setCart(data);
      setError('');
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart({ items: [] });
      setError('Cart load nahi ho saki');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.salePrice || 0) * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.15);
  const total = Math.round(subtotal + tax);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-gray-600">Review your cart and complete payment for your order.</p>
          </div>
          <Link to="/cart" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Cart
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-gray-600 shadow-sm">Loading your cart...</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">First Name</span>
                    <input type="text" placeholder="Enter your name" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Last Name</span>
                    <input type="text" placeholder="Enter your last name" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                  </label>
                </div>

                <label className="block mt-4">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input type="email" placeholder="Enter your email" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                </label>

                <label className="block mt-4">
                  <span className="text-sm font-medium text-gray-700">Address</span>
                  <input type="text" placeholder="123 Baker Street" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                </label>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">City</span>
                    <input type="text" placeholder="London" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Postal Code</span>
                    <input type="text" placeholder="SW1A 1AA" className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black" />
                  </label>
                </div>

                <label className="block mt-4">
                  <span className="text-sm font-medium text-gray-700">Country</span>
                  <select className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-black">
                    <option>United Kingdom</option>
                  </select>
                </label>
              </section>

              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                {cart.items.length === 0 ? (
                  <p className="text-sm text-gray-500">No items in your cart yet.</p>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => {
                      const lineTotal = Number(item.product.salePrice || 0) * item.quantity;
                      return (
                        <div key={item.product._id} className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-slate-900">{item.product.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">£{lineTotal.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">£{Number(item.product.salePrice || 0).toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 cursor-pointer">
                    <input type="radio" name="payment" className="h-5 w-5 text-black" defaultChecked />
                    <div>
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 cursor-pointer">
                    <input type="radio" name="payment" className="h-5 w-5 text-black" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-500">Secure checkout with PayPal</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 cursor-pointer">
                    <input type="radio" name="payment" className="h-5 w-5 text-black" />
                    <div>
                      <p className="font-medium">Buy Now, Pay Later</p>
                      <p className="text-sm text-gray-500">Split payment over 4 interest-free instalments</p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Products</span>
                    <span>{totalItems} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>£{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-5">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>£{total.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Need help?</h2>
                <p className="text-sm text-gray-600">Contact our support team if you have questions about your order.</p>
                <p className="mt-4 text-sm text-gray-800 font-semibold">support@jomashop.co.uk</p>
                <p className="text-sm text-gray-500">+44 20 7946 0018</p>
              </section>
            </aside>
          </div>
        )}

        {error ? (
          <div className="mt-6 rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>
        ) : null}

        <div className="mt-10 text-right">
          <button className="rounded-full bg-black px-8 py-4 text-white font-semibold hover:bg-gray-900">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
