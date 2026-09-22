// Shop BD - Admin Panel (Exact Match to Reference UI Screens 7 & 8)
const ADMIN_EMAIL = "xmlcreator372@gmail.com";

window.AdminPages = {
  // Admin Login Screen
  AdminLoginPage: ({ onLogin, onNavigate }) => {
    const [email, setEmail] = React.useState(ADMIN_EMAIL);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        const user = await onLogin(email.trim(), password);
        if (user.role !== "admin" && user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          throw new Error("Access Denied (403): You do not have administrator permissions.");
        }
        onNavigate("/admin/dashboard");
      } catch (err) {
        setError(err.message || "Admin authentication failed.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6 text-slate-900">
          <div className="text-center">
            <h2 className="font-bold text-2xl text-slate-950">Shop BD Admin Portal</h2>
            <p className="text-xs text-slate-500 mt-1">Management & Operations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shopbd.com.bd"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:border-slate-800"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
                <Icons.AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              {loading ? "Authenticating..." : "Sign In to Admin"}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <button onClick={() => onNavigate("/")} className="hover:text-slate-900 transition">
              ← Return to Store
            </button>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    );
  },

  // Main Admin Layout Wrapper: Dark Navy Sidebar + Light Canvas (Screens 7 & 8)
  AdminLayout: ({ children, currentSection, onNavigate, onLogout, user }) => {
    const navItems = [
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
      { id: "products", label: "Products", icon: "Package" },
      { id: "categories", label: "Categories", icon: "Layers" },
      { id: "orders", label: "Orders", icon: "ShoppingBagAlt" },
      { id: "customers", label: "Customers", icon: "Users" },
      { id: "payments", label: "Payments", icon: "CreditCard" },
      { id: "coupons", label: "Coupons", icon: "Tag" },
      { id: "banners", label: "Banners", icon: "ImageIcon" },
      { id: "offers", label: "Offers", icon: "Tag" },
      { id: "reviews", label: "Reviews", icon: "Star" },
      { id: "notifications", label: "Notifications", icon: "Bell" },
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "profile", label: "Profile", icon: "User" }
    ];

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
        {/* Dark Navy Sidebar */}
        <aside className="w-60 bg-[#0F172A] text-slate-300 p-4 select-none shrink-0 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-white font-bold text-lg"
              onClick={() => onNavigate("/admin/dashboard")}
            >
              <div className="w-7 h-7 rounded-lg bg-white text-slate-950 font-serif font-black flex items-center justify-center text-sm">
                S
              </div>
              <span>Shop BD</span>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = Icons[item.icon] || Icons.Package;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(`/admin/${item.id}`)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-slate-800 text-white font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer User Info */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="px-3">
              <p className="text-xs font-bold text-white truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
            <div className="flex gap-2 px-3">
              <button
                onClick={() => onNavigate("/")}
                className="flex-1 py-1.5 text-center text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Storefront
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition"
                title="Logout"
              >
                <Icons.LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Light Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
          {/* Top Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-base text-slate-900 capitalize">
                {currentSection === "orders" ? "Order Management" : currentSection}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full w-48 focus:outline-none"
                />
              </div>

              <button className="p-2 text-slate-500 hover:text-slate-900 relative" aria-label="Notifications">
                <Icons.Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5"></span>
              </button>

              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                A
              </div>
            </div>
          </header>

          {/* Sub Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  },

  // 1. DASHBOARD VIEW (SCREEN 7)
  DashboardView: ({ onNavigate }) => {
    const products = window.StoreService.getProducts();
    const orders = window.StoreService.getOrders();

    return (
      <div className="space-y-6">
        {/* 4 Metric Cards in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold">Total Products</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">48</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Icons.Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold">Total Orders</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">124</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Icons.ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold">Total Revenue</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">৳ 248,750</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Icons.DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold">Customers</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">86</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Icons.Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview SVG Curve */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Sales Overview</h3>
              <span className="text-xs text-slate-400">Last 7 Days</span>
            </div>
            <div className="h-48 w-full flex items-center justify-center pt-2">
              <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 120 Q 70 80, 130 95 T 250 50 T 390 30 L 390 140 L 10 140 Z"
                  fill="url(#salesGrad)"
                />
                <path
                  d="M 10 120 Q 70 80, 130 95 T 250 50 T 390 30"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                />
                <circle cx="390" cy="30" r="4" fill="#3B82F6" />
                <circle cx="250" cy="50" r="3" fill="#3B82F6" />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Orders Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">Orders</h3>
              <span className="text-xs text-slate-400">Last 7 Days</span>
            </div>
            <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
              {[
                { day: "Mon", val: 40 },
                { day: "Tue", val: 65 },
                { day: "Wed", val: 50 },
                { day: "Thu", val: 85 },
                { day: "Fri", val: 70 },
                { day: "Sat", val: 95 },
                { day: "Sun", val: 60 }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    style={{ height: `${bar.val}%` }}
                    className="w-full max-w-[28px] bg-blue-500 rounded-t-md hover:bg-blue-600 transition"
                  />
                  <span className="text-[10px] text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Top Categories & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Categories Donut */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Top Categories</h3>
            <div className="flex items-center justify-center py-4">
              <svg viewBox="0 0 100 100" className="w-32 h-32">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="15" strokeDasharray="60 100" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="15" strokeDasharray="40 100" strokeDashoffset="-60" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#F59E0B" strokeWidth="15" strokeDasharray="30 100" strokeDashoffset="-100" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#6366F1" strokeWidth="15" strokeDasharray="30 100" strokeDashoffset="-130" />
              </svg>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Men</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Women</span>
                <span className="font-bold">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Kids</span>
                <span className="font-bold">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>Shoes</span>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Recent Orders</h3>
              <button
                onClick={() => onNavigate("/admin/orders")}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-mono font-bold text-slate-900">#{o.id}</td>
                      <td className="py-3">{o.customerName}</td>
                      <td className="py-3 font-bold text-slate-900">৳ {o.grandTotal?.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.orderStatus === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                          o.orderStatus === "Confirmed" ? "bg-emerald-50 text-emerald-600" :
                          o.orderStatus === "Processing" ? "bg-amber-50 text-amber-600" :
                          "bg-blue-50 text-blue-600"
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => onNavigate("/admin/orders")}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // 2. ORDER MANAGEMENT VIEW (SCREEN 8)
  OrdersView: () => {
    const [orders, setOrders] = React.useState(window.StoreService.getOrders());
    const [products, setProducts] = React.useState(window.StoreService.getProducts());
    const [activeTab, setActiveTab] = React.useState("All");
    const settings = window.StoreService.getSettings();

    const handleSendWhatsApp = (order) => {
      const { waUrl } = window.StoreService.triggerWhatsAppConfirmation(order, settings);
      window.open(waUrl, "_blank");
      alert(`WhatsApp confirmation generated for ${order.phone}!`);
    };

    return (
      <div className="space-y-6">
        {/* Top Header Row with "+ Add Product" button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Orders</h2>
          </div>
          <button
            onClick={() => alert("Add Product form opened.")}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <Icons.Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex gap-2 overflow-x-auto text-xs pb-1 border-b border-slate-200">
          {["All", "Pending", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product / Orders Catalog Table Matching Screen 8 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                  </td>
                  <td className="p-4 font-bold text-slate-900">{p.name}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4 font-bold text-slate-900">৳ {p.sellingPrice?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">May 14, 2025</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => alert(`Editing ${p.name}`)}
                      className="p-1 text-slate-400 hover:text-slate-900"
                    >
                      <Icons.Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`Details of ${p.name}`)}
                      className="p-1 text-slate-400 hover:text-slate-900"
                    >
                      <Icons.Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  // 3. PRODUCTS VIEW
  ProductsView: () => {
    return <AdminPages.OrdersView />;
  },

  // 4. SETTINGS VIEW
  SettingsView: () => {
    const [settings, setSettings] = React.useState(window.StoreService.getSettings());
    const handleSave = (e) => {
      e.preventDefault();
      window.StoreService.updateSettings(settings);
      alert("Settings saved successfully!");
    };

    return (
      <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
        <h3 className="font-bold text-base text-slate-900">Store Settings</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Store Name</label>
            <input
              type="text"
              value={settings.websiteName}
              onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Delivery Charge (Inside Dhaka)</label>
            <input
              type="number"
              value={settings.insideCityDeliveryCharge}
              onChange={(e) => setSettings({ ...settings, insideCityDeliveryCharge: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="px-5 py-2.5 bg-slate-950 text-white font-bold rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    );
  }
};
