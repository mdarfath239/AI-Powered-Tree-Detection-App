
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { TreePine, Users, Book, Heart, Menu, DollarSign, MessageSquare, LogOut } from 'lucide-react';
import Index from '@/pages/Index';
import PlantDatabase from './pages/PlantDatabase';
import PlantCareTips from './pages/PlantCareTips';
import Community from '@/pages/Community';
import NotFound from '@/pages/NotFound';
import TreeModels from '@/pages/TreeModels';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Pricing from '@/pages/Pricing';
import Posts from '@/pages/Posts';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <TreePine className="h-6 w-6" />
          <span>Tree Detection</span>
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <TreePine className="h-4 w-4 mr-2" />
              Detect
            </Button>
          </Link>
          <Link to="/database">
            <Button variant="ghost" size="sm">
              <Book className="h-4 w-4 mr-2" />
              Database
            </Button>
          </Link>
          <Link to="/care-tips">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Care Tips
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Posts
            </Button>
          </Link>
          <Link to="/community">
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
          </Link>
          <Link to="/tree-models">
            <Button variant="ghost" size="sm">
              3D Models
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navigation />

            {/* Main Content */}
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route path="/database" element={<PlantDatabase />} />
                <Route path="/care-tips" element={<PlantCareTips />} />
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <Posts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
                <Route path="/tree-models" element={<TreeModels />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                  <TreePine className="h-6 w-6" />
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with AI-powered tree detection technology.
                    <br className="hidden md:inline" />
                    Helping you identify and learn about trees around you.
                  </p>
                </div>
              </div>
            </footer>
          </div>

          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
