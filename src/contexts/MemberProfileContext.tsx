/** Campus Comic Editorial identity: dashboard copy always reflects the active member, not a fixed demo name. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type MemberProfile = { fullName: string; email: string; community: string };

const STORAGE_KEY = "hsl-member-profile";
const fallbackProfile: MemberProfile = { fullName: "Member", email: "", community: "Creators" };

function titleCase(value: string) {
  return value.split(/[.\-_\s]+/).filter(Boolean).map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`).join(" ") || "Member";
}

function readStoredProfile(): MemberProfile {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? { ...fallbackProfile, ...JSON.parse(value) } : fallbackProfile;
  } catch { return fallbackProfile; }
}

function writeStoredProfile(profile: MemberProfile) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch { /* Local persistence is optional. */ }
}

type MemberProfileContextValue = {
  profile: MemberProfile;
  firstName: string;
  initials: string;
  updateProfile: (updates: Partial<MemberProfile>) => void;
  startLogin: (email: string) => void;
  resetProfile: () => void;
};

const MemberProfileContext = createContext<MemberProfileContextValue | null>(null);

export function MemberProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<MemberProfile>(fallbackProfile);

  const persist = useCallback((next: MemberProfile) => {
    setProfile(next);
    writeStoredProfile(next);
  }, []);

  useEffect(() => {
    persist(readStoredProfile());
  }, [persist]);

  const value = useMemo<MemberProfileContextValue>(() => ({
    profile,
    firstName: profile.fullName.trim().split(/\s+/)[0] || "Member",
    initials: profile.fullName.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "M",
    updateProfile: (updates) => persist({ ...profile, ...updates }),
    startLogin: (email) => {
      const current = readStoredProfile();
      const cleanEmail = email.trim().toLowerCase();
      persist(current.email.toLowerCase() === cleanEmail && current.fullName !== "Member" ? current : { fullName: titleCase(cleanEmail.split("@")[0]), email: cleanEmail, community: current.community || "Creators" });
    },
    resetProfile: () => persist(fallbackProfile),
  }), [persist, profile]);

  return <MemberProfileContext.Provider value={value}>{children}</MemberProfileContext.Provider>;
}

export function useMemberProfile() {
  const context = useContext(MemberProfileContext);
  if (!context) throw new Error("useMemberProfile must be used inside MemberProfileProvider");
  return context;
}
