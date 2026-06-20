"use client";
import React, { useEffect } from "react";
import { useUserStore } from "../../store/user.store.js";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { checkme, user } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    checkme();
  }, []);
  const pathname = usePathname();

  const authPath = pathname.includes("auth");

  if (user && authPath) {
    router.replace("/");
  }
  return <>{children}</>;
};

export default ProtectedRoute;
