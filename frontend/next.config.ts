const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://157.180.17.101:5001/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;