
import Hero from "@/app/layouts/Hero";
import ContactSection from "@/app/layouts/ContactSection";
import ProblemStatementSection from "@/app/layouts/ProblemStatementSection";
import KeyFeaturesSection from "@/app/layouts/KeyFeaturesSection";

export default function Home() {
  return (
    <div className="">
      <main className="pt-14 sm:pt-12 lg:pt-16">
          <Hero/>
          <ProblemStatementSection/>
          <KeyFeaturesSection/>
          <ContactSection/>
      </main>
    </div>
  );
}
