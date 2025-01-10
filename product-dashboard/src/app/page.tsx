import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Product Dashboard</h1>
      <Link href="/products" className="text-blue-200 hover:underline text-lg">
        View Products
      </Link>
    </div>
  );
}
