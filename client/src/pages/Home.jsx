import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import StepCard from "../components/ui/StepCard";
import Footer from "../components/Footer";
import DashboardPreviewSection from "../components/DashboarPreviewSection";
import DeveloperSection from "../components/DeveloperSection";
import Counter from "../components/ui/Counter";
import Testimonial from "../components/Testimonial";

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="space-y-28">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
          Take Control of Your
          <span className="text-emerald-500"> Finances </span>
          with MoNNi
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          MoNNi is a modern expense tracking platform designed to help you
          monitor spending, analyze trends, and make smarter financial decisions
          — all in one simple dashboard.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Powerful Features
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Everything you need to track, analyze, and optimize your spending.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Smart Expense Tracking"
            description="Add, edit, and categorize expenses easily with a clean and intuitive interface."
          />

          <FeatureCard
            title="Advanced Analytics"
            description="Visualize monthly and yearly spending trends with real-time insights."
          />

          <FeatureCard
            title="Secure Authentication"
            description="Your data is protected with secure JWT-based authentication and modern best practices."
          />

          <FeatureCard
            title="Export Reports"
            description="Download your financial reports in CSV, Excel, or PDF format anytime."
          />

          <FeatureCard
            title="Dark & Light Mode"
            description="Switch themes instantly for a personalized experience."
          />

          <FeatureCard
            title="Responsive Design"
            description="Access MoNNi seamlessly on desktop, tablet, or mobile."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          How It Works
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10">
          <StepCard number="1" title="Create Account">
            Sign up in seconds and set up your personal dashboard.
          </StepCard>

          <StepCard number="2" title="Track Expenses">
            Add daily expenses and categorize them for better visibility.
          </StepCard>

          <StepCard number="3" title="Analyze & Improve">
            Use insights to understand your spending habits and improve savings.
          </StepCard>
        </div>
      </section>
      <DashboardPreviewSection />
      <section className="py-28 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Trusted by Growing Users
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Real numbers reflecting real financial control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center shine">
            <Counter end={10000} label="Expenses Tracked" />

            <Counter end={2500} label="Active Users" />

            <Counter end={99} label="System Uptime (%)" />
          </div>
        </div>
      </section>
      {/* ================= CTA ================= */}
      <section className="text-center px-4">
        <div className="bg-emerald-500 text-white rounded-2xl py-16 px-6 max-w-4xl mx-auto shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Managing Your Money Smarter Today
          </h2>

          <p className="mt-4 opacity-90">
            Join MoNNi and take the first step toward financial clarity.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>
      <section className="py-28 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            What Users Say
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Testimonial
              name="Rahul Sharma"
              role="Freelancer"
              text="MoNNi helped me understand where my money was going every month. The analytics are super clean!"
            />

            <Testimonial
              name="Disha Pandey"
              role="Student"
              text="Simple, clean, and easy to use. I love the dark mode and mobile responsiveness."
            />

            <Testimonial
              name="Arjun Patel"
              role="Startup Founder"
              text="The export feature and dashboard insights are extremely helpful for tracking expenses."
            />
          </div>
        </div>
      </section>

      <DeveloperSection />
      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-28 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Let’s Connect
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Have feedback, collaboration ideas, or just want to say hello? Feel
            free to reach out directly.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href="mailto:abhic4170@gmail.com"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                   bg-gray-50 dark:bg-gray-950 
                   hover:shadow-xl hover:-translate-y-1 
                   transition-all duration-300"
            >
              <div className="text-3xl">📧</div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                Email
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                abhic4170@gmail.com
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919084987092"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                   bg-gray-50 dark:bg-gray-950 
                   hover:shadow-xl hover:-translate-y-1 
                   transition-all duration-300"
            >
              <div className="text-3xl">💬</div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                WhatsApp
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Chat directly
              </p>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/@AbhiChauhan21"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 
                   bg-gray-50 dark:bg-gray-950 
                   hover:shadow-xl hover:-translate-y-1 
                   transition-all duration-300"
            >
              <div className="text-3xl">✈</div>
              <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                Telegram
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                @AbhiChauhan21
              </p>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
