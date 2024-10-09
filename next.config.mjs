import { default as pwa } from "@ducanh2912/next-pwa";

const withPWA = pwa({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
};

export default withPWA(nextConfig);
