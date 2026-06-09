import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import MarqueeStrip from '../components/landing/MarqueeStrip';
import StatsStrip from '../components/landing/StatsStrip';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StatsStrip />
      <HowItWorks />
      <div className="h-px bg-border mx-6 md:mx-14" />
      <FeaturesSection />
      <div className="h-px bg-border mx-6 md:mx-14" />
      <PricingSection />
      <div className="h-px bg-border mx-6 md:mx-14" />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}