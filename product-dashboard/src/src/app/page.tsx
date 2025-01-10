import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Product Dashboard</h1>
      <Link href="/products" className="text-blue-500 hover:underline">
        View Products
      </Link>
    </div>
  );
}

