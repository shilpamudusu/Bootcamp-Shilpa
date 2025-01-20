import GeneEssentialityMap from "../components/GeneEssentialityMap"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white text-center shadow-text">
          Gene Essentiality – Cancer DepMap
        </h1>
        <GeneEssentialityMap />
      </div>
    </main>
  )
}

