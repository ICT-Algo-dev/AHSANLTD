import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ apiBaseUrl }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingItems, setUpdatingItems] = useState(new Set());

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/cart`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        setCart({ items: [] });
        setError('Please log in first to view the bag');
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
      setError('Cart load nahi ho saki');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      const response = await fetch(`${apiBaseUrl}/cart/items/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Quantity update fail ho gaya');
    } finally {
      setUpdatingItems(prev => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    setUpdatingItems(prev => new Set(prev).add(productId));

    try {
      const response = await fetch(`${apiBaseUrl}/cart/items/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Item remove nahi ho saka');
    } finally {
      setUpdatingItems(prev => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Kya aap pura cart clear karna chahte ho?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/cart`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setCart({ items: [] });
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Cart clear nahi ho saka');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto text-center">
          <p className="text-red-600 mb-4">{error}</p>
          {/* <button
            onClick={fetchCart}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Dobara Koshish Karein
          </button> */}
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalPrice = items.reduce((sum, item) => sum + (Number(item.product.salePrice || 0) * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getItemImage = (product) => {
  const path =
    product.primaryImage ||
    product.imageUrls?.[0] ||
    product.images?.[0] ||
    '';
  
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  return `http://localhost:5000${path}`;
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">Your bag is empty</h2>
            <p className="text-gray-600 mb-6">Browse products to start shopping</p>
            <Link to="/" className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {items.map((item) => (
                  <div key={item.product._id} className="border-b last:border-b-0 p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        {getItemImage(item.product) ? (
                          <img
                            src={getItemImage(item.product)}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-lg font-semibold hover:text-blue-600 line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">
                          Category: {item.product.category}
                        </p>
                        <p className="text-lg font-bold mt-3">
                          £{(Number(item.product.salePrice || 0) * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          disabled={updatingItems.has(item.product._id)}
                          className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                        >
                          Remove
                        </button>

                        <div className="flex items-center gap-2 border rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                            disabled={updatingItems.has(item.product._id) || item.quantity <= 1}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                            disabled={updatingItems.has(item.product._id)}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="font-semibold">£{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">£{Math.round(totalPrice * 0.15).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span>£{Math.round(totalPrice * 1.15).toLocaleString()}</span>
                </div>

                <Link to="/checkout" className="w-full inline-flex items-center justify-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 mb-3">
                  Checkout
                </Link>

                <button
                  onClick={handleClearCart}
                  className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50"
                >
                  Clear Cart
                </button>

                <Link
                  to="/"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
