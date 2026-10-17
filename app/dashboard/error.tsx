"use client";

import { RouteError } from "@/components/RouteError";

export default function DashboardError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} title="Dashboard data is unavailable" />;
}