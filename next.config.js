/** @type {import('next').NextConfig} */
const {networkInterfaces} = require('os')

const getIPAddress = () => {
  const nets = networkInterfaces()
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family == "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
      }
    }
  }

  const nicNames = Object.keys(results)
  if (nicNames.length > 0) {
    const firstNICAddresses = results[nicNames[0]]
    if (firstNICAddresses.length > 0) {
      return firstNICAddresses[0]
    }
  }
  return null;
}

const ipAddress = getIPAddress()

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_API_URL:`${ipAddress}:3000`
    // NEXT_API_URL:'http://localhost:3000'
  },
}

module.exports = nextConfig
