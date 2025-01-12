import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_KAKAO_API_KEY:process.env.NEXT_PUBLIC_KAKAO_API_KEY
  },
  images: {
    remotePatterns: [{
      protocol:'https',
      hostname: '**'
    },{
      protocol:'http',
      hostname:'**'
    }]
  }
};

export default nextConfig;
