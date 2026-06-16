/** @type {import('next').NextConfig} */
const nextConfig = {
  // node-postgres should run on the server, not be bundled for the edge
  serverExternalPackages: ["pg"],
};

export default nextConfig;
