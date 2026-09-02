import { ArrowRight, Check } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useMemberProfile } from "@/contexts/MemberProfileContext";
import { BrandLogo } from "@/components/BrandLogo";
import { useHeroReveal } from "@/hooks/useHeroReveal";

function AuthVisual() {
  return <aside className="auth-visual"><button onClick={() => window.location.assign("/")} className="auth-mark"><BrandLogo alt="HSL Logo" forceTheme="dark" /></button><div className="auth-visual-copy"><p className="eyebrow eyebrow--light">HSL Membership</p><h2>Bringing ideas to life.</h2><p>Join a community built around turning potential into a practice.</p></div><div className="auth-characters"><img src="/assets/lightgirl.png" alt="" /><img src="/assets/pasted_file_3v62K1_image.png" alt="" /></div></aside>;
}

function AuthPage({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useHeroReveal(rootRef);
  return (
    <div className="auth-page" ref={rootRef}>
      <AuthVisual />
      {children}
    </div>
  );
}

export function LoginPage() {
  const [, setLocation] = useLocation();
  const { startLogin } = useMemberProfile();
  return <AuthPage><main className="auth-main"><form className="auth-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); startLogin(String(data.get("email") || "")); setLocation("/app"); }}><p data-hero-kicker className="eyebrow">Member access</p><h1 data-hero-title><span>Welcome back.</span></h1><p data-hero-copy>Continue building with the HSL community.</p><label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label><label>Password<input name="password" required type="password" placeholder="••••••••" /></label><button className="button button--black" type="submit">Log in <ArrowRight size={14} /></button><button type="button" className="text-link" onClick={() => setLocation("/signup")}>New to HSL? Create your account.</button></form></main></AuthPage>;
}

export function SignupPage() {
  const [, setLocation] = useLocation();
  const { updateProfile } = useMemberProfile();
  return <AuthPage><main className="auth-main"><form className="auth-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); updateProfile({ fullName: String(data.get("fullName") || "Member").trim(), email: String(data.get("email") || "").trim().toLowerCase() }); setLocation("/onboarding"); }}><p data-hero-kicker className="eyebrow">Create your HSL account</p><h1 data-hero-title><span>Start with your details.</span></h1><p data-hero-copy>We'll use this to shape your membership journey.</p><label>Full name<input name="fullName" required autoComplete="name" placeholder="Your full name" /></label><label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Create password<input name="password" required type="password" autoComplete="new-password" placeholder="At least 8 characters" /></label><button className="button button--black" type="submit">Continue <ArrowRight size={14} /></button><button type="button" className="text-link" onClick={() => setLocation("/login")}>Already a member? Log in.</button></form></main></AuthPage>;
}

export function OnboardingPage() {
  const [, setLocation] = useLocation();
  const { updateProfile } = useMemberProfile();
  const [community, setCommunity] = useState("Creators");
  return <AuthPage><main className="auth-main"><form className="auth-form auth-form--wide" onSubmit={(event) => { event.preventDefault(); updateProfile({ community }); setLocation("/welcome"); }}><p data-hero-kicker className="eyebrow">Step 2 of 2</p><h1 data-hero-title><span>Complete your profile.</span></h1><p data-hero-copy>Pick the community where your work is most useful right now.</p><div className="choice-grid" data-hero-actions>{[["Creatives", "pink"], ["Creators", "blue"], ["Executors", "orange"], ["Founders", "purple"]].map(([name, accent]) => <button type="button" key={name} className={`choice-card ${community === name ? "is-selected" : ""}`} onClick={() => setCommunity(name)}><span className={`accent-block accent-block--${accent}`} /><strong>{name}</strong><small>{community === name ? "Selected" : "Choose"}</small></button>)}</div><label data-hero-actions>What are you hoping to build?<textarea required rows={3} placeholder="A concise project, problem, or ambition." /></label><button className="button button--black" data-hero-actions type="submit">Complete membership <Check size={14} /></button></form></main></AuthPage>;
}

export function WelcomePage() {
  const [, setLocation] = useLocation();
  const { firstName, profile } = useMemberProfile();
  const rootRef = useRef<HTMLElement>(null);
  useHeroReveal(rootRef);
  return <main className="welcome-page" ref={rootRef}><img className="welcome-mark" src="/assets/hsl3.png" alt="" /><p data-hero-kicker className="eyebrow eyebrow--pill">You're in — {profile.community}</p><h1 data-hero-title><span>Welcome to HSL,</span> <span>{firstName}.</span></h1><p data-hero-copy>Your membership is confirmed and your dashboard, tasks, and community are ready.</p><button data-hero-actions className="button button--white" onClick={() => setLocation("/app")}>Go to my dashboard <ArrowRight size={14} /></button></main>;
}