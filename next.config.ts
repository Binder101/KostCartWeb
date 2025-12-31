import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites(){
    return[
      {
        source : "/api/v1/:path*",
        destination : "https://api.kostcart.com/api/v1/:path*",
      }
    ]
  }
};

export default nextConfig;
