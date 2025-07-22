import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Send visit notification email
    const sendVisitNotification = async () => {
      // Only send notification once per session to avoid spam
      const hasNotified = sessionStorage.getItem('visit_notified');
      if (hasNotified) return;

      try {
        await supabase.functions.invoke('send-visit-notification', {
          body: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || undefined,
            location: window.location.href,
          },
        });
        
        // Mark as notified for this session
        sessionStorage.setItem('visit_notified', 'true');
      } catch (error) {
        console.error('Error sending visit notification:', error);
      }
    };

    sendVisitNotification();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingForm />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
