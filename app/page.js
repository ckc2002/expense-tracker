'use client'
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";

export default function Home() {

  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter()

  useEffect(() => {
    isSignedIn && router.replace('/dashboard')
  }, [isSignedIn])

  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
