"use client";
import { Session } from "@/lib/types";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
        setLoading(false);
      })
      .catch(() => {
        setSession({} as Session);
        setLoading(false);
      });
  }, []);

  return { session, loading };
}
