import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
}

export default withNextIntl(nextConfig)
