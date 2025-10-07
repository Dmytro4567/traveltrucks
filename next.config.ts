import type {NextConfig} from "next";

const nextConfig = {
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: 'ftp.goit.study', pathname: '/img/**'},
        ],
    },
};

export default nextConfig;
