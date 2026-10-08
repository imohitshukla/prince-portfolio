import { AnimatePresence } from "framer-motion";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { UIProvider } from "@/context/UIContext";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Work from "@/pages/Work";

/**
 * HashRouter is used deliberately: the production build is emitted as a single
 * index.html (vite-plugin-singlefile), so hash routes survive a hard refresh or
 * a static file host with no rewrite rules, and panel state (`?panel=work`,
 * `?project=id`) stays deep-linkable with working browser back/forward.
 */
function RoutedPages() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <UIProvider>
        <SiteLayout>
          <RoutedPages />
        </SiteLayout>
      </UIProvider>
    </HashRouter>
  );
}
