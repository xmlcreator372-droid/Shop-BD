// Shop BD - Ultra Clean Component System (Exact Match to Reference Design)

window.Components = {
  // Toast Alert Notification
  Toast: ({ toast, onClose }) => {
    if (!toast) return null;
    const isError = toast.type === "error";
    return (
      <div className="fixed bottom-6 right-6 z-50 max-w-sm flex items-center gap-3 px-4 py-3 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 animate-slide-up">
        {isError ? (
          <Icons.AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        ) : (
          <Icons.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <div className="text-xs font-semibold flex-1">{toast.message}</div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          <Icons.X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  },

  // Empty State
  EmptyState: ({ icon = "Package", title, description, actionText, onAction }) => {
    const IconComp = Icons[icon] || Icons.Package;
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
          <IconComp className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">{description}</p>
        {actionText && (
          <button
            onClick={onAction}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            {actionText}
          </button>
        )}
      </div>
    );
  },

  // Product Card - Identical to Reference Image
  ProductCard: ({ product, onQuickView, onShare, onNavigate, onToggleFavorite, isFavorite, onAddToCart }) => {
    const isOutOfStock = product.stock <= 0;
    const hasDiscount = product.originalPrice && product.originalPrice > product.sellingPrice;
    const discountPercent = hasDiscount
      ? Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100)
      : product.discount || 0;

    return (
      <div
        onClick={() => onNavigate(`/product/${product.id}`)}
        className="group bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden"
      >
        {/* Product Image Area */}
        <div className="relative aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center">
          <img
            src={product.images?.[0] || "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
            loading="lazy"
          />

          {/* Wishlist Heart Icon (Top Right) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            aria-label="Wishlist"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 shadow-sm flex items-center justify-center transition"
          >
            <Icons.Heart className="w-3.5 h-3.5" filled={isFavorite} />
          </button>
        </div>

        {/* Product Details Area */}
        <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
          <div>
            <h4 className="font-semibold text-slate-900 text-xs md:text-sm line-clamp-1 group-hover:text-slate-700 transition">
              {product.name}
            </h4>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400">★</span>
                ))}
              </div>
              <span className="text-slate-500 font-medium text-[10px] ml-0.5">
                {product.rating || 4.5}
              </span>
            </div>
          </div>

          {/* Price Line & Discount Badge */}
          <div className="flex items-center justify-between mt-2 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs md:text-sm font-bold text-slate-900">
                ৳ {product.sellingPrice?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-slate-400 line-through">
                  ৳ {product.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>

            {hasDiscount && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },

  // Quick View Modal
  QuickViewModal: ({ product, isOpen, onClose, onAddToCart, onNavigate }) => {
    if (!isOpen || !product) return null;
    const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0] || "M");
    const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0] || "#2E4A32");
    const [qty, setQty] = React.useState(1);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
            <Icons.X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{product.brand || "Shop BD"}</p>
              <h3 className="font-bold text-base text-slate-900">{product.name}</h3>

              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">৳ {product.sellingPrice?.toLocaleString()}</span>
                {product.originalPrice > product.sellingPrice && (
                  <span className="text-xs text-slate-400 line-through">৳ {product.originalPrice?.toLocaleString()}</span>
                )}
              </div>

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Size</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                          selectedSize === s ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {product.colors?.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-6 h-6 rounded-full border ${
                          selectedColor === c ? "ring-2 ring-slate-900 ring-offset-1" : "border-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product, qty, selectedSize, selectedColor);
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate(`/product/${product.id}`);
                  }}
                  className="px-3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Product Share Modal
  ProductShareModal: ({ product, isOpen, onClose, onCopyLink }) => {
    if (!isOpen || !product) return null;
    const url = window.location.href;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Share Product</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
              <Icons.X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <img src={product.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
              <p className="text-xs text-slate-500 font-bold">৳ {product.sellingPrice?.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${product.name}: ${url}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-medium hover:bg-emerald-100 transition"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition"
            >
              Facebook
            </a>
            <button
              onClick={() => onCopyLink(url)}
              className="p-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    );
  },

  // Main Header - Identical to Reference Image
  Header: ({ cartCount = 0, wishlistCount = 0, user, onNavigate, activePath }) => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onNavigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    };

    const navItems = [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
      { label: "Men", path: "/category/men" },
      { label: "Women", path: "/category/women" },
      { label: "Kids", path: "/category/kids" },
      { label: "Shoes", path: "/category/shoes" },
      { label: "Bags", path: "/category/bags" },
      { label: "Accessories", path: "/category/accessories" },
      { label: "New Arrivals", path: "/shop?filter=new" },
      { label: "Sale", path: "/shop?filter=sale", isSale: true }
    ];

    return (
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div
              onClick={() => onNavigate("/")}
              className="cursor-pointer font-bold text-xl text-slate-950 tracking-tight shrink-0 flex items-center gap-1.5"
            >
              <span>Shop BD</span>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-slate-700">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.path)}
                  className={`transition hover:text-slate-950 ${
                    item.isSale
                      ? "text-red-500 font-bold hover:text-red-600"
                      : activePath === item.path
                      ? "text-slate-950 font-bold"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xs relative hidden sm:block">
              <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
              />
            </form>

            {/* Right Icons: Wishlist, Cart, Profile */}
            <div className="flex items-center gap-3.5 text-slate-700">
              {/* Wishlist */}
              <button
                onClick={() => onNavigate("/wishlist")}
                className="p-1.5 hover:text-slate-950 relative"
                aria-label="Wishlist"
              >
                <Icons.Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate("/cart")}
                className="p-1.5 hover:text-slate-950 relative"
                aria-label="Shopping Cart"
              >
                <Icons.ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar */}
              <button
                onClick={() => onNavigate(user ? "/profile" : "/login")}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center overflow-hidden transition"
                aria-label="Account"
              >
                <Icons.User className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sub Navigation bar */}
        <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-3 overflow-x-auto text-xs whitespace-nowrap scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className={`px-2 py-1 rounded-md ${
                item.isSale
                  ? "text-red-500 font-bold"
                  : activePath === item.path
                  ? "bg-slate-100 text-slate-950 font-bold"
                  : "text-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
    );
  },

  // Clean Footer - Identical to Reference Image
  Footer: ({ onNavigate }) => {
    return (
      <footer className="bg-white border-t border-slate-200/80 mt-16 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-slate-950 tracking-tight">Shop BD</h3>
              <p className="text-slate-500 text-xs">Fashion for a better you.</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-1.5 text-slate-500">
                <li><button onClick={() => onNavigate("/")} className="hover:text-slate-900">Home</button></li>
                <li><button onClick={() => onNavigate("/shop")} className="hover:text-slate-900">Shop</button></li>
                <li><button onClick={() => onNavigate("/about")} className="hover:text-slate-900">About Us</button></li>
                <li><button onClick={() => onNavigate("/contact")} className="hover:text-slate-900">Contact</button></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Customer Service</h4>
              <ul className="space-y-1.5 text-slate-500">
                <li><span className="hover:text-slate-900 cursor-pointer">Shipping Policy</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Return Policy</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Terms & Conditions</span></li>
                <li><span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Follow Us</h4>
              <div className="flex items-center gap-3 text-slate-600">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">
                  <Icons.Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">
                  <Icons.Instagram className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">
                  <Icons.Smartphone className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">
                  <Icons.Youtube className="w-4 h-4" />
                </a>
                <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">
                  <Icons.MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-[11px] gap-2">
            <p>© 2025 Shop BD. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate("/admin/login")} className="hover:text-slate-600">
                Admin Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};
