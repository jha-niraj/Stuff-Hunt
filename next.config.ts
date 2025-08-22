import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	}
};

export default nextConfig;
