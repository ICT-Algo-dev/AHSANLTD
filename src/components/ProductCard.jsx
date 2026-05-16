import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const hasDiscount = Number(product.discountPercentage) > 0;
  const retailPrice = Number(product.retailPrice || 0);
  const salePrice = Number(product.salePrice || 0);
  const couponAmount = hasDiscount ? Math.max(retailPrice - salePrice, 0).toFixed(2) : '0.00';
  const clampTitleStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <div className="group flex h-full min-h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-50 p-5">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="mx-auto h-56 w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="h-[120px]">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.brand}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900" style={clampTitleStyle}>
            {product.name}
          </h3>
        </div>

        <div className="mt-4 flex min-h-[32px] flex-wrap items-center gap-2">
          {hasDiscount ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              {Number(product.discountPercentage).toFixed(0)}% OFF
            </span>
          ) : null}
        </div>

        <div className="mt-4 h-[124px] space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className={hasDiscount ? 'font-semibold text-slate-900' : 'font-semibold text-slate-900'}>£{salePrice.toFixed(2)}</span>
            {hasDiscount ? (
              <span className="text-xs text-slate-400 line-through">£{retailPrice.toFixed(2)}</span>
            ) : null}
          </div>

          {hasDiscount ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-700">
              <span className="text-rose-700">£{couponAmount} coupon</span>
            </div>
          ) : null}

          {hasDiscount ? (
            <p className="text-sm text-slate-700">
              £{salePrice.toFixed(2)} after coupon
            </p>
          ) : null}
        </div>

        <div className="mt-auto pt-4">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
