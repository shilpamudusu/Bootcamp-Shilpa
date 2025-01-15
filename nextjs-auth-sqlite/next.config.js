module.exports = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/login',  // Ensure this is not causing a redirect loop or wrong routing
        permanent: false,
      },
    ]
  },
}
