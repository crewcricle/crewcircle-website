"use client";

import { useCallback, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { Organization, OrganizationMember, Role } from "./types";
import {
  createAuthClient,
  getSession,
  getUser,
  getActiveOrg,
  signOut as clientSignOut,
  onAuthStateChange,
} from "./client";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createAuthClient();

    getSession(client).then((s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = onAuthStateChange(client, (_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = useCallback(async () => {
    const client = createAuthClient();
    await clientSignOut(client);
    setUser(null);
    setSession(null);
  }, []);

  return { user, session, loading, signOut: handleSignOut };
}

export interface OrgState {
  org: Organization | null;
  membership: OrganizationMember | null;
  role: Role | null;
  loading: boolean;
}

/** Fetches org + membership from `user_metadata.org_id`. */
export function useOrg(): OrgState {
  const { user, loading: authLoading } = useAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [membership, setMembership] = useState<OrganizationMember | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setOrg(null);
      setMembership(null);
      setRole(null);
      setLoading(false);
      return;
    }

    const orgId =
      (user.user_metadata as Record<string, string>)?.org_id ??
      (user.app_metadata as Record<string, string>)?.org_id;

    if (!orgId) {
      setOrg(null);
      setMembership(null);
      setRole(null);
      setLoading(false);
      return;
    }

    const client = createAuthClient();

    Promise.all([
      client.from("organizations").select("*").eq("id", orgId).single(),
      client
        .from("organization_members")
        .select("*")
        .eq("org_id", orgId)
        .eq("user_id", user.id)
        .single(),
    ])
      .then(([orgRes, memberRes]) => {
        const member = (memberRes.data as OrganizationMember) ?? null;
        setOrg((orgRes.data as Organization) ?? null);
        setMembership(member);
        setRole(member?.role ?? null);
      })
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  return { org, membership, role, loading };
}

export function useIsMember(orgId: string | null): boolean {
  const { user, loading: authLoading } = useAuth();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (authLoading || !user || !orgId) {
      setIsMember(false);
      return;
    }

    const client = createAuthClient();

    client
      .from("organization_members")
      .select("id", { count: "exact", head: true })
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .then(({ count }) => {
        setIsMember((count ?? 0) > 0);
      });
  }, [user, authLoading, orgId]);

  return isMember;
}
