/** Campus Comic Editorial shell: public routes lead into a distinct, high-utility member workspace. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MemberProfileProvider } from "./contexts/MemberProfileContext";
import Home from "./pages/Home";
import { AboutPage, CommunitiesPage, ContactPage, InvestorsPage, StartupDetailPage, StartupsPage } from "./pages/PublicPages";
import { LoginPage, OnboardingPage, SignupPage, WelcomePage } from "./pages/AuthPages";
import MemberApp from "./pages/MemberApp";
import AdminPortal from "./pages/AdminPortal";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={AboutPage} />
    <Route path="/communities" component={CommunitiesPage} />
    <Route path="/startups" component={StartupsPage} />
    <Route path="/startups/:slug" component={StartupDetailPage} />
    <Route path="/investors" component={InvestorsPage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/onboarding" component={OnboardingPage} />
    <Route path="/welcome" component={WelcomePage} />
    <Route path="/app" component={() => <MemberApp section="home" />} />
    <Route path="/app/tasks" component={() => <MemberApp section="tasks" />} />
    <Route path="/app/community" component={() => <MemberApp section="community" />} />
    <Route path="/app/startup" component={() => <MemberApp section="startup" />} />
    <Route path="/admin" component={AdminPortal} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable={true}>
        <MemberProfileProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" />
            <Router />
          </TooltipProvider>
        </MemberProfileProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
