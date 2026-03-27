import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AdminProvider } from "@/hooks/useAdmin";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SafeDealPage from "./pages/SafeDealPage";
import SubsidiesPage from "./pages/SubsidiesPage";
import AIAssistantsPage from "./pages/AIAssistantsPage";
import EducationPage from "./pages/EducationPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SellPage from "./pages/SellPage";
import FavoritesPage from "./pages/FavoritesPage";
import AgroShopPage from "./pages/AgroShopPage";
import ClassifiedsPage from "./pages/ClassifiedsPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminListingsPage from "./pages/admin/AdminListingsPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminAIPage from "./pages/admin/AdminAIPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminShopsPage from "./pages/admin/AdminShopsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/safe-deal" element={<SafeDealPage />} />
        <Route path="/subsidies" element={<SubsidiesPage />} />
        <Route path="/ai-assistants" element={<AIAssistantsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/agro-shop" element={<AgroShopPage />} />
        <Route path="/classifieds" element={<ClassifiedsPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="listings" element={<AdminListingsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="ai" element={<AdminAIPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="shops" element={<AdminShopsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AdminProvider>
          <AppLayout />
        </AdminProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
