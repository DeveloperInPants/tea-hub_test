/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Критично для работы на Спринтхосте (Фри-1)
  images: {
    unoptimized: true, // Нужно для экспорта картинок
  },
};

export default nextConfig;
