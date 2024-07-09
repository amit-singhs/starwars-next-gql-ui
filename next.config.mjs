/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        if (!config.experiments) {
            config.experiments = {};
        }
        config.experiments.topLevelAwait = true;
        return config
    },
};

export default nextConfig;
