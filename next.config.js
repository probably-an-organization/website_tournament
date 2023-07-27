/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && require("./src/env.js");

// const { i18n } = require("./next-i18next.config.js");

// You can remove the following 2 lines when integrating our example.
const { loadCustomBuildParams } = require("./next-utils.config.js");
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  // i18n,
  images: {
    unoptimized: true,
  },
  output: "export", // static export (NOT WORKING WITH SOCKET.IO)
  // pageExtensions: ["active.tsx"],
  reactStrictMode: true,
  typescript: {
    tsconfigPath,
  },
};

module.exports = nextConfig;
