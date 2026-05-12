import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Rooms from "@/pages/Rooms";
import RoomDetail from "@/pages/RoomDetail";
import Gallery from "@/pages/Gallery";
import Restaurant from "@/pages/Restaurant";
import Activities from "@/pages/Activities";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="site-root">
      <Topbar />
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
