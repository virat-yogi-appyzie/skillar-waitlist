import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import { WaitlistProvider } from "@/lib/waitlist-context";

export default function Home() {
  return (
    <WaitlistProvider>
      <div className="min-h-screen bg-background-primary text-foreground">
        <Header />
        <main>
          <Hero />
          <Features />
          <Testimonials />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </WaitlistProvider>
  );
}
