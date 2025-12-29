
import Header from "@/app/layouts/Header";
import Hero from "@/app/layouts/Hero";
import ContactPage from "@/app/contact/page";
import ProblemStatementSection from "@/app/layouts/ProblemStatementSection";

export default function Home() {
  return (
    <div className="">
      <main className="pt-14 sm:pt-12 lg:pt-16">
        <Header/>
          <Hero/>
          <ProblemStatementSection/>
          <ContactPage/>
      </main>
    </div>
  );
}
