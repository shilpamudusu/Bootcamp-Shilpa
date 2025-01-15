"use client"

import { useState } from "react"
import { Form } from "@/components/Form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null)

  const handleSubmit = (username: string) => {
    setGreeting(`Hello ${username}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Welcome to Kaminari Enhanced
          </h1>
          <Form onSubmit={handleSubmit} />
          {greeting && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Greeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{greeting}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
