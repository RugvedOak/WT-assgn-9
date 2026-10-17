"use client";

import { RouteError } from "@/components/RouteError";

export default function PostError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} title="This note could not be loaded" />;
}