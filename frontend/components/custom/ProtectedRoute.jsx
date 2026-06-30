"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user.store.js";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { checkme, user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkme();
      setIsChecking(false);
    };

    verifyAuth();
  }, [checkme]);

  const authPath = pathname.includes("auth");

  useEffect(() => {
    if (isChecking) return;

    if (user && authPath) {
      router.replace("/");
      return;
    }

    if (!user && !authPath) {
      router.replace("/auth/login");
    }
  }, [authPath, isChecking, router, user]);

  if (isChecking) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
