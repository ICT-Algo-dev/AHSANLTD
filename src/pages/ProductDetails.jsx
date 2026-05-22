import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ apiBaseUrl }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setMessage('');

      const response = await fetch(`${apiBaseUrl}/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Failed to add product to bag');
      }

      setMessage('Product added to bag');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage(error.message || 'Add to bag failed');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <img src={product.primaryImage} alt={product.name} className="w-full rounded-3xl object-contain bg-gray-100 p-8" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {product.imageUrls?.slice(0, 3).map((imageUrl) => (
              <div key={imageUrl} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <img src={imageUrl} alt={product.name} className="h-28 w-full object-contain bg-gray-50" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{product.brand}</span>
                <span className="border-l border-gray-300 pl-3">Item No. {product.sku}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>★★★★★</span>
                </div>
                <span className="underline">Write a review</span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                  {product.stockStatus}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                  {product.discountPercentage}% OFF
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Condition: {product.condition}
                </span>
              </div>

              <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-inner">
                {/* <p className="text-xs uppercase tracking-[0.24em] text-slate-400">£{product.discountPercentage ? `£${(product.retailPrice - product.salePrice).toFixed(2)} coupon` : '£0 coupon'}</p> */}
                <p className="mt-2 text-2xl font-semibold">{product.discountPercentage ? `${product.discountPercentage}% OFF` : 'Deal Price'}</p>
                <p className="text-4xl font-bold tracking-tight">£{product.salePrice.toFixed(2)}</p>
                <p className="mt-2 text-sm text-slate-400 line-through">Retail £{Number(product.retailPrice || 0).toFixed(2)}</p>
                <p className="mt-3 text-sm text-slate-300">Or as low as <span className="font-semibold">£512/mo</span> with affirm.</p>
                <p className="mt-1 text-slate-400">Prequalify now</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full rounded-3xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {addingToCart ? 'Adding...' : 'Add To Bag'}
                </button>

                <div className="flex items-center justify-between rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
                  <span className="font-semibold text-emerald-700">Enjoy Free Shipping</span>
                </div>

                <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span>🚚</span>
                    <span>Want it by Monday, May 18?</span>
                  </div>
                  <p className="mt-2 text-slate-500">Choose Next Day Shipping at Checkout. Order within <span className="font-semibold text-slate-900">2 hrs 14 mins</span>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Product details</h2>
            <p className="text-sm leading-7 text-slate-600">{product.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                <span className="block text-slate-500">Shipping</span>
                <span className="mt-2 block text-slate-900">£{Number(product.shippingPrice || 0).toFixed(2)} Shipped</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                <span className="block text-slate-500">Payment</span>
                <span className="mt-2 block text-slate-900">{product.paymentInfo || 'Flexible payment options available.'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
