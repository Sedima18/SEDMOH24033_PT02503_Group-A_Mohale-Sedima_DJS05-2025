import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShowDetailPage from "./pages/ShowDetailPage";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show/:id" element={<ShowDetailPage />} />
      </Routes>
    </>
  );
}