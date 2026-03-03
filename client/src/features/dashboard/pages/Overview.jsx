import TopSection from "../sections/TopSection";
import AnalyticsSection from "../sections/AnalyticalSection";
import Footer from "../../../components/Footer";

export default function Overview() {
  return (
    <div className="space-y-10">
      <TopSection />
      <AnalyticsSection />
      <Footer/>
    </div>
  );
}