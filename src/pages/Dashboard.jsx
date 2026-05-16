import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/api';

const DEFAULT_CATEGORIES = [
  { value: 'beauty-personal-care', label: 'Beauty and Personal Care' },
  { value: 'pet-supplies', label: 'Pet Supplies' },
  { value: 'sports-outdoor', label: 'Sports and Outdoor' },
  { value: 'home-kitchen', label: 'Home and Kitchen' },
  { value: 'automotive', label: 'Automotive Parts & Accessories' },
  { value: 'household-health-baby', label: 'Household, Health & Baby Care' },
  { value: 'tools-home-improvement', label: 'Tools and Home Improvement' },
];

const Dashboard = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: 'beauty-personal-care',
    sku: '',
    condition: 'New',
    stockStatus: 'In Stock',
    description: '',
    salePrice: '',
    retailPrice: '',
    shippingPrice: '',
    discountPercentage: '',
    paymentInfo: '',
    quantity: '',
    tags: '',
    images: '',
  });
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const isAdmin = authUser?.role === 'admin';

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) return;

        const data = await response.json();
        const backendCategories = data.map((item) => ({ value: item.slug, label: item.label }));
        setCategories([
          ...DEFAULT_CATEGORIES,
          ...backendCategories.filter((item) => !DEFAULT_CATEGORIES.some((cat) => cat.value === item.value)),
        ]);
      } catch (error) {
        console.warn('Failed to load backend categories', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: 'include',
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setAuthUser(data.user);
        localStorage.setItem('authUser', JSON.stringify(data.user));
      } catch (error) {
        console.warn('Failed to restore dashboard auth user', error);
      }
    };

    restoreUser();
  }, []);

  useEffect(() => {
    if (!imageFiles.length) {
      setPreviews([]);
      return;
    }

    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setImageFiles((prev) => {
      const combined = [...prev, ...files];
      const unique = [];
      const seen = new Set();
      for (const f of combined) {
        const key = `${f.name}_${f.size}_${f.lastModified}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(f);
        }
      }
      return unique;
    });
    setForm((prev) => ({ ...prev, images: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('brand', form.brand);
      formData.append('category', form.category);
      formData.append('sku', form.sku);
      formData.append('condition', form.condition);
      formData.append('stockStatus', form.stockStatus);
      formData.append('description', form.description);
      formData.append('salePrice', String(Number(form.salePrice || 0)));
      formData.append('retailPrice', String(Number(form.retailPrice || 0)));
      formData.append('shippingPrice', String(Number(form.shippingPrice || 0)));
      formData.append('discountPercentage', String(Number(form.discountPercentage || 0)));
      formData.append('paymentInfo', form.paymentInfo);
      formData.append('quantity', String(Number(form.quantity || 0)));
      formData.append('tags', form.tags);

      if (form.images) {
        formData.append('images', form.images);
      }

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to add product');
      }

      setStatus({ type: 'success', message: 'Product added successfully!' });
      setForm({
        name: '',
        brand: '',
        category: 'beauty-personal-care',
        sku: '',
        condition: 'New',
        stockStatus: 'In Stock',
        description: '',
        salePrice: '',
        retailPrice: '',
        shippingPrice: '',
        discountPercentage: '',
        paymentInfo: '',
        quantity: '',
        tags: '',
        images: '',
      });
      setImageFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'Product add failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">
          Add a new product here and it will be saved to the backend database.
        </p>

        {!isAdmin ? (
          <div className="mb-6 rounded-lg bg-amber-100 px-4 py-3 text-amber-900">
            Only admin can add products.
          </div>
        ) : null}

        {status && (
          <div className={`mb-6 rounded-lg px-4 py-3 ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Brand</span>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">SKU</span>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Condition</span>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Stock Status</span>
              <select
                name="stockStatus"
                value={form.stockStatus}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="block">
              <span className="text-gray-700">Sale Price</span>
              <input
                type="number"
                name="salePrice"
                value={form.salePrice}
                onChange={handleChange}
                step="0.01"
                required
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Retail Price</span>
              <input
                type="number"
                name="retailPrice"
                value={form.retailPrice}
                onChange={handleChange}
                step="0.01"
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Shipping Price</span>
              <input
                type="number"
                name="shippingPrice"
                value={form.shippingPrice}
                onChange={handleChange}
                step="0.01"
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="block">
              <span className="text-gray-700">Discount %</span>
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={handleChange}
                step="0.01"
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Quantity</span>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Payment Info</span>
              <input
                name="paymentInfo"
                value={form.paymentInfo}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700">Tags</span>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="comma separated tags"
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Upload Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-2 w-full rounded-lg border-gray-300 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((url, index) => (
                <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2">
                  <img src={url} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !isAdmin}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
