"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      height="2px"
      color="#20ab8c"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
