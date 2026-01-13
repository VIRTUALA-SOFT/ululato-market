/**
 * ULULATO - Ancestral Futurism Marketplace
 * Main App Component with Routes
 * Design: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Market from "./pages/Market";
import ProductDetail from "./pages/ProductDetail";
import { LoginPage, RegisterPage } from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import SellerStudio from "./pages/SellerStudio";
import Favorites from "./pages/Favorites";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/market" component={Market} />
      <Route path="/product/:slug" component={ProductDetail} />
      
      {/* Auth Routes */}
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />
      
      {/* Cart & Checkout */}
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      
      {/* User Routes */}
      <Route path="/profile" component={Profile} />
      <Route path="/profile/orders" component={Profile} />
      <Route path="/favorites" component={Favorites} />
      
      {/* Seller Routes */}
      <Route path="/sell" component={SellerStudio} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(5, 5, 5, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
