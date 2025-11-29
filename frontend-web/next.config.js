/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    // Set Turbopack root to avoid workspace detection warning
    turbopack: {
        root: __dirname,
    },
};

module.exports = nextConfig;
