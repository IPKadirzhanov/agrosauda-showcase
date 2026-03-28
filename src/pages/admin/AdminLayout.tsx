import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShoppingBag, FolderTree, Bot,
  ShieldCheck, LogOut, Package, BarChart3
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Дашборд', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Пользователи', path: '/admin/users', icon: Users },
  { name: 'Товары', path: '/admin/listings', icon: ShoppingBag },
  { name: 'Категории', path: '/admin/categories', icon: FolderTree },
  { name: 'AI Агенты', path: '/admin/ai', icon: Bot },
  { name: 'Безопасные сделки', path: '/admin/orders', icon: ShieldCheck },
  { name: 'Agro Shop', path: '/admin/shops', icon: Package },
  { name: 'Аналитика', path: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">A</div>
            <span className="font-display font-bold text-lg">Agro<span className="text-primary">sauda</span></span>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">Панель администратора</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate mb-2">
            {user?.email}
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
