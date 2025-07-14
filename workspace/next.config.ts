import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle Firebase ESM modules
    config.resolve.alias['@firebase/auth'] =
      require.resolve('firebase/auth');
    config.resolve.alias['@firebase/firestore'] =
      require.resolve('firebase/firestore');

    return config;
  },
};

export default nextConfig;
