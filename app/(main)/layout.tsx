import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainPagesLayout;
