"use client";

import { useState } from "react";

export function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button className="like-button" onClick={() => setLikes((count) => count + 1)} type="button" aria-live="polite">
      Appreciate this demo · {likes}
    </button>
  );
}