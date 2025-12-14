import TopNavBar from './components/TopNavBar'
import HeroSection from './components/Hero'
import SetMenuSection from './components/SetMenuSection'
import IntroductionSection from './components/Intro'
import CoreValuesSection from './components/CoreValue'
import Footer from './components/Footer'
import TeamSection from './components/TeamSection'

export default function Home() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full">
              {/* TopNavBar */}
              <TopNavBar />
              <main className="flex-grow">
                {/* HeroSection */}
                <HeroSection />
                {/* Set Menu Section - displays available set menus */}
                <SetMenuSection />
                {/* Introduction Section */}
                <IntroductionSection />
                {/* Core Values Section */}
                <CoreValuesSection />
                {/* Team Section */}
                <TeamSection />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}