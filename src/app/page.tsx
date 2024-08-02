"use client";

// pages/index.tsx
import React from "react";
import { useRouter, usePathname } from 'next/navigation'; // Correct import for 'app'
import Welcome from "./components/Welcome";
import Chat from "./chat/page";


const Home: React.FC = () => {
  const pathname = usePathname()


  return (
    <div>
      {pathname === '/' ? <Welcome /> : <Chat />}
    </div>
  );
}

export default Home;
