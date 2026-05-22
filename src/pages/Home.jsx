import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';

const FEATURED_CATEGORIES = [
  { name: 'Beauty & Personal Care', slug: 'Beauty And Personal Care', image: '/Beauty & Personal Care.jpg' },
  { name: 'Health & Household', slug: 'Health and Household', image: '/Health & Household.jpg' },
  { name: 'Pet Supplies', slug: 'Pet Supplies', image: '/Pet Supplies.jpg' },
  { name: 'Automotives', slug: 'Automotives', image: '/Automotives.jpg' },
  { name: 'Sports & Outdoor', slug: 'Sports and Outdoor', image: '/Sports & Outdoor.jpg' },
];

const Home = ({ products, category, searchTerm, loading, error }) => {
  const title =
    category === 'beauty-personal-care'
      ? 'Beauty And Personal Care'
      : category === 'all'
        ? 'Featured Products'
        : 'Products';

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      {/* Hero Section & Category Boxes (Only on pure home page) */}
      {category === 'all' && !searchTerm && (
        <>
          <CategoryBanner />
          
          <section className="pb-10 pt-2">
            <div className="container mx-auto px-4 max-w-[1450px]">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {FEATURED_CATEGORIES.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    to={`/?category=${cat.slug}`} 
                    className="group relative overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-square shadow-lg block border border-gray-100"
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                      <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md leading-tight">{cat.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Product Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">
              {searchTerm ? `Search: ${searchTerm}` : `${products.length} products`}
            </p>
          </div>
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
              No products found for this category yet.
            </div>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-6 items-stretch">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
