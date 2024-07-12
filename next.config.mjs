/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        if (!config.experiments) {
            config.experiments = {};
        }
        config.experiments.topLevelAwait = true;
        return config
    },
    images: {
        domains: ['images.unsplash.com'],
      },
};


export default nextConfig;
