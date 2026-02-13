import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// Services & Constants
import { API_ENDPOINTS } from "./constants/apiConstants";

// Components - Direct imports for above-fold content
import Nav from "./components/Nav/Nav";
import Banner from "./components/Banner/Banner";

// Lazy load components for better performance
const Row = React.lazy(() => import("./components/Row/Row"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const MovieDetail = React.lazy(() => import("./pages/MovieDetail"));
const CategoryDetail = React.lazy(() => import("./pages/CategoryDetail"));

// Loading Skeleton for Row
const RowSkeleton = () => (
  <div style={{ padding: "20px", opacity: 0.6 }}>
    <div
      style={{
        height: "20px",
        background: "#2d2d2d",
        borderRadius: "4px",
        marginBottom: "20px",
        width: "200px",
      }}
    />
    <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            flex: "0 0 140px",
            height: "210px",
            background: "linear-gradient(90deg, #2d2d2d 0%, #3d3d3d 50%, #2d2d2d 100%)",
            borderRadius: "8px",
          }}
        />
      ))}
    </div>
  </div>
);

/**
 * Home Page Component
 * Main Netflix clone interface with navigation, banner, and content rows
 */
function HomePage() {
  return (
    <div>
      <Nav />
      <Banner />

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={API_ENDPOINTS.NETFLIX_ORIGINALS}
          isLargeRow
          categoryRoute="/category/netflix_originals"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Trending Now"
          fetchUrl={API_ENDPOINTS.TRENDING}
          categoryRoute="/category/trending"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Top Rated"
          fetchUrl={API_ENDPOINTS.TOP_RATED}
          categoryRoute="/category/top_rated"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Action Movies"
          fetchUrl={API_ENDPOINTS.ACTION_MOVIES}
          categoryRoute="/category/action"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Comedy Movies"
          fetchUrl={API_ENDPOINTS.COMEDY_MOVIES}
          categoryRoute="/category/comedy"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Horror Movies"
          fetchUrl={API_ENDPOINTS.HORROR_MOVIES}
          categoryRoute="/category/horror"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Romance Movies"
          fetchUrl={API_ENDPOINTS.ROMANCE_MOVIES}
          categoryRoute="/category/romance"
        />
      </Suspense>

      <Suspense fallback={<RowSkeleton />}>
        <Row
          title="Documentaries Movies"
          fetchUrl={API_ENDPOINTS.DOCUMENTARIES}
          categoryRoute="/category/documentaries"
        />
      </Suspense>

      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </div>
  );
}

/**
 * Main App Component
 * Sets up routing for the Netflix clone application
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movie/:id/:mediaType"
            element={
              <Suspense fallback={<div className="movie-detail-loading" />}>
                <MovieDetail />
              </Suspense>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Suspense fallback={<div className="category-detail-loading" />}>
                <CategoryDetail />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
