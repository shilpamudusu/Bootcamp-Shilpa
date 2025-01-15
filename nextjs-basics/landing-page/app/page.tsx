import FlippingCard from '@/components/FlippingCard'

const projects = [
  {
    title: "Next.js Starter",
    description: "A boilerplate for Next.js projects with essential configurations and optimizations.",
    link: "https://shilpa-nextjs-starter.bootcamp.aganitha.ai/"
  },
  {
    title: "Kaminari Starter",
    description: "A starter template for Kaminari-based projects with pre-configured settings.",
    link: "https://shilpa-kaminari.bootcamp.aganitha.ai/"
  },
  {
    title: "T3 App",
    description: "A full-stack, typesafe Next.js application using the T3 stack.",
    link: "https://github.com/shilpamudusu/Bootcamp-Shilpa/tree/main/nextjs-basics/t3-app"
  },
  {
    title: "Product Dashboard",
    description: "An interactive dashboard for product management and analytics.",
    link: "https://shilpa-product-dashboard.bootcamp.aganitha.ai/"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8 flex items-center justify-center">
      <div className="container mx-auto bg-white bg-opacity-10 rounded-xl p-4 sm:p-8 backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-12 tracking-wide">My Next.js Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <FlippingCard key={index} {...project} />
          ))}
        </div>
      </div>
    </main>
  )
}

