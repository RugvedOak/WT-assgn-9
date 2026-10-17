"use client";

import { RouteError } from "@/components/RouteError";

export default function PostsError({ reset }: { reset: () => void }) {
  return <RouteError reset={reset} title="The archive is unavailable" />;
}