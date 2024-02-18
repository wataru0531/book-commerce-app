/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHubのアバター画像などを取得する場合はここで設定
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      }
    ]
  },
  // useEffectが2回発火するのを防ぐ
  // 本番環境が1度しか発火しないが、テスト環境でも1回の発火に抑える
  reactStrictMode: false, 

};

export default nextConfig;
