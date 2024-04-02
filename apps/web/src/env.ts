import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TEST_BEARER_TOKEN: z.string().min(1),
  },
  runtimeEnv: {
    TEST_BEARER_TOKEN: process.env.TEST_BEARER_TOKEN,
  },
});
