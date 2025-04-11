import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BecomeHostPage from "./pages/BecomeHostPage";
import HomestaysPage from "./pages/HomestaysPage";
import HomestayDetailsPage from "./pages/HomestayDetailsPage";
import ToursPage from "./pages/ToursPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import EateriesPage from "./pages/EateriesPage";
import HotspotsPage from "./pages/HotspotsPage";
import ItineraryPage from "./pages/ItineraryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingChatbot from './components/FloatingChatbot';
import Loader from "./components/Loader";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 17000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="trip-and-treat-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/become-host" element={<BecomeHostPage />} />
              <Route path="/homestays" element={<HomestaysPage />} />
              <Route path="/homestays/:id" element={<HomestayDetailsPage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/eateries" element={<EateriesPage />} />
              <Route path="/hotspots" element={<HotspotsPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <FloatingChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;