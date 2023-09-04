/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_API_URL:'http://localhost:3000'
  },
}

module.exports = nextConfig
