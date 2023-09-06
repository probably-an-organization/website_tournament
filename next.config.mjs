/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import env from "./src/env.mjs";
!process.env.SKIP_ENV_VALIDATION && env;

// import { i18 } from "./next-i18next.config.js";

// You can remove the following 2 lines when integrating our example.
import { nextUtilsConfig } from "./next-utils.config.mjs";
const { esmExternals = false, tsconfigPath } = nextUtilsConfig();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  // i18n,
  images: {
    unoptimized: true,
  },
  /* output ... export = static (not working with socket.io), standalone = ??? (docker) */
  output: "standalone",
  // pageExtensions: ["active.tsx"],
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath,
  },
};

export default nextConfig;
