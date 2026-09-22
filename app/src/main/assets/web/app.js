// Shop BD - Main React Application Entry Point

const { useState, useEffect } = React;

function App() {
  // Navigation State
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/");

  // App Data State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [settings, setSettings] = useState(window.StoreService.getSettings());

  // User & Commerce State
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopbd_current_user")) || null;
    } catch (e) {
      return null;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopbd_cart")) || [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopbd_wishlist")) || [];
    } catch (e) {
      return [];
    }
  });

  // UI Modals & Notifications
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [shareProduct, setShareProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize Catalog if empty
  useEffect(() => {
    let prods = window.StoreService.getProducts();
    let cats = window.StoreService.getCategories();
    if (prods.length === 0 || cats.length === 0) {
      const seeded = window.StoreService.seedDefaultStore();
      prods = seeded.products;
      cats = seeded.categories;
    }
    setProducts(prods);
    setCategories(cats);
    setBanners(window.StoreService.getBanners());
    setSettings(window.StoreService.getSettings());
  }, []);

  // Hash Navigation Listener
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1) || "/";
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync Cart & Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("shopbd_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopbd_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Navigate helper
  const navigate = (path) => {
    window.location.hash = path;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Cart Operations
  const handleAddToCart = (product, quantity = 1, size = "Standard", color = "Default") => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.sellingPrice,
            image: product.images?.[0] || "",
            size,
            color,
            quantity
          }
        ];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId, size, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, size, color) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color)
      )
    );
    showToast("Item removed from cart", "info");
  };

  // Wishlist Toggle
  const handleToggleFavorite = (product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== product.id);
      } else {
        showToast("Added to wishlist!");
        return [...prev, product.id];
      }
    });
  };

  // Auth Operations
  const handleLogin = async (email, password) => {
    const adminEmail = "xmlcreator372@gmail.com";
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      const adminUser = {
        uid: "admin_master",
        email: adminEmail,
        name: "Store Administrator",
        role: "admin"
      };
      setUser(adminUser);
      localStorage.setItem("shopbd_current_user", JSON.stringify(adminUser));
      return adminUser;
    }

    // Customer Login
    const customerUser = {
      uid: "usr_" + Math.abs(email.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)),
      email,
      name: email.split("@")[0].toUpperCase(),
      role: "user"
    };
    setUser(customerUser);
    localStorage.setItem("shopbd_current_user", JSON.stringify(customerUser));
    return customerUser;
  };

  const handleRegister = async (userData) => {
    const newUser = {
      uid: "usr_" + Date.now(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      username: userData.username,
      role: "user"
    };
    setUser(newUser);
    localStorage.setItem("shopbd_current_user", JSON.stringify(newUser));
    return newUser;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("shopbd_current_user");
    navigate("/");
    showToast("Logged out successfully");
  };

  const handleUpdateProfile = (profileData) => {
    const updated = { ...user, ...profileData };
    setUser(updated);
    localStorage.setItem("shopbd_current_user", JSON.stringify(updated));
  };

  const handlePlaceOrder = (orderData) => {
    const newOrder = window.StoreService.createOrder(orderData);
    setCart([]);
    // Trigger WhatsApp notification for admin
    window.StoreService.triggerWhatsAppConfirmation(newOrder, settings);
    return newOrder;
  };

  // Maintenance Mode Check (Storefront only)
  const isAdminRoute = currentPath.startsWith("/admin");
  if (settings.maintenanceMode && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-600 text-slate-950 font-serif font-black text-2xl flex items-center justify-center mx-auto">
            S
          </div>
          <h1 className="font-serif font-bold text-3xl">{settings.maintenanceTitle}</h1>
          <p className="text-xs text-slate-400">{settings.maintenanceMessage}</p>
          <p className="text-[11px] text-amber-500 font-semibold">Estimated return: {settings.maintenanceReturnTime}</p>
          <div className="pt-4">
            <button
              onClick={() => navigate("/admin/login")}
              className="text-xs text-slate-500 hover:text-white underline"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Routes Rendering
  if (isAdminRoute) {
    if (currentPath === "/admin/login") {
      return <AdminPages.AdminLoginPage onLogin={handleLogin} onNavigate={navigate} />;
    }

    // Check Role
    const isAdmin = user && (user.role === "admin" || user.email === "xmlcreator372@gmail.com");
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-950 text-red-400 flex items-center justify-center mx-auto">
              <Icons.Lock className="w-8 h-8" />
            </div>
            <h1 className="font-bold text-2xl">Access Denied (403)</h1>
            <p className="text-xs text-slate-400">
              Only authenticated administrators can access the Shop BD management portal.
            </p>
            <div className="pt-2 flex gap-3 justify-center">
              <button
                onClick={() => navigate("/admin/login")}
                className="px-6 py-2.5 bg-amber-600 text-slate-950 font-bold text-xs rounded-xl"
              >
                Admin Sign In
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2.5 bg-slate-800 text-white text-xs rounded-xl"
              >
                Return to Store
              </button>
            </div>
          </div>
        </div>
      );
    }

    const section = currentPath.split("/")[2] || "dashboard";

    let adminContent = null;
    if (section === "products") {
      adminContent = <AdminPages.ProductsView onNavigate={navigate} />;
    } else if (section === "orders") {
      adminContent = <AdminPages.OrdersView />;
    } else if (section === "settings") {
      adminContent = <AdminPages.SettingsView />;
    } else {
      adminContent = <AdminPages.DashboardView onNavigate={navigate} />;
    }

    return (
      <AdminPages.AdminLayout
        currentSection={section}
        onNavigate={navigate}
        onLogout={handleLogout}
        user={user}
      >
        {adminContent}
      </AdminPages.AdminLayout>
    );
  }

  // Storefront Routes Router
  let pageContent = null;

  if (currentPath === "/" || currentPath === "") {
    pageContent = (
      <UserPages.HomePage
        products={products}
        categories={categories}
        banners={banners}
        onNavigate={navigate}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
        onShare={setShareProduct}
        onToggleFavorite={handleToggleFavorite}
        wishlist={wishlist}
      />
    );
  } else if (currentPath === "/shop") {
    pageContent = (
      <UserPages.ShopPage
        products={products}
        categories={categories}
        onNavigate={navigate}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
        onShare={setShareProduct}
        onToggleFavorite={handleToggleFavorite}
        wishlist={wishlist}
      />
    );
  } else if (currentPath.startsWith("/product/")) {
    const prodId = currentPath.split("/")[2];
    pageContent = (
      <UserPages.ProductDetailsPage
        productId={prodId}
        products={products}
        onAddToCart={handleAddToCart}
        onBuyNow={(prod, qty, sz, clr) => {
          handleAddToCart(prod, qty, sz, clr);
          navigate("/checkout");
        }}
        onShare={setShareProduct}
        onToggleFavorite={handleToggleFavorite}
        wishlist={wishlist}
        onNavigate={navigate}
        user={user}
        onAddReview={(rev) => window.StoreService.addReview(rev)}
      />
    );
  } else if (currentPath.startsWith("/category/")) {
    const catSlug = currentPath.split("/")[2];
    const matchingCat = categories.find(
      (c) => c.slug?.toLowerCase() === catSlug.toLowerCase() || c.name.toLowerCase() === catSlug.toLowerCase()
    );
    const catName = matchingCat ? matchingCat.name : catSlug;
    const catProducts = products.filter(
      (p) => p.category?.toLowerCase() === catName.toLowerCase()
    );

    pageContent = (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif font-bold text-3xl text-slate-900 mb-6">{catName} Collection</h1>
        {catProducts.length === 0 ? (
          <Components.EmptyState
            icon="Package"
            title={`No items in ${catName}`}
            description="We are updating this collection with fresh stock."
            actionText="Browse All"
            onAction={() => navigate("/shop")}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {catProducts.map((p) => (
              <Components.ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
                onShare={setShareProduct}
                onNavigate={navigate}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={wishlist.includes(p.id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else if (currentPath === "/cart") {
    pageContent = (
      <UserPages.CartPage
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigate={navigate}
        user={user}
        settings={settings}
      />
    );
  } else if (currentPath === "/checkout") {
    pageContent = (
      <UserPages.CheckoutPage
        cart={cart}
        user={user}
        onNavigate={navigate}
        onPlaceOrder={handlePlaceOrder}
        settings={settings}
      />
    );
  } else if (currentPath.startsWith("/order-success/")) {
    const orderId = currentPath.split("/")[2];
    pageContent = <UserPages.OrderSuccessPage orderId={orderId} onNavigate={navigate} />;
  } else if (currentPath === "/orders") {
    pageContent = <UserPages.OrdersPage user={user} onNavigate={navigate} />;
  } else if (currentPath.startsWith("/orders/")) {
    const orderId = currentPath.split("/")[2];
    pageContent = <UserPages.OrderDetailsPage orderId={orderId} onNavigate={navigate} />;
  } else if (currentPath === "/wishlist") {
    const favProducts = products.filter((p) => wishlist.includes(p.id));
    pageContent = (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif font-bold text-3xl text-slate-900 mb-6">My Wishlist</h1>
        {favProducts.length === 0 ? (
          <Components.EmptyState
            icon="Heart"
            title="Your Wishlist is Empty"
            description="Save items you love to your wishlist and revisit them anytime."
            actionText="Discover Styles"
            onAction={() => navigate("/shop")}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favProducts.map((p) => (
              <Components.ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
                onShare={setShareProduct}
                onNavigate={navigate}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={true}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else if (currentPath === "/profile") {
    pageContent = (
      <UserPages.ProfilePage
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
        onNavigate={navigate}
      />
    );
  } else if (currentPath === "/login") {
    pageContent = <UserPages.LoginPage onLogin={handleLogin} onNavigate={navigate} />;
  } else if (currentPath === "/register") {
    pageContent = <UserPages.RegisterPage onRegister={handleRegister} onNavigate={navigate} />;
  } else if (currentPath === "/forgot-password") {
    pageContent = <UserPages.ForgotPasswordPage onNavigate={navigate} />;
  } else {
    // Default fallback to Shop
    pageContent = (
      <UserPages.ShopPage
        products={products}
        categories={categories}
        onNavigate={navigate}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
        onShare={setShareProduct}
        onToggleFavorite={handleToggleFavorite}
        wishlist={wishlist}
      />
    );
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans">
      <Components.Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        user={user}
        onNavigate={navigate}
        activePath={currentPath}
        categories={categories}
      />

      <main className="flex-1">{pageContent}</main>

      <Components.Footer onNavigate={navigate} />

      {/* Quick View Modal */}
      <Components.QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onNavigate={navigate}
      />

      {/* Share Modal */}
      <Components.ProductShareModal
        product={shareProduct}
        isOpen={!!shareProduct}
        onClose={() => setShareProduct(null)}
        onCopyLink={(url) => {
          navigator.clipboard.writeText(url);
          showToast("Product link copied to clipboard!");
        }}
      />

      {/* Toast Alert */}
      <Components.Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

// Mount the App to DOM
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
