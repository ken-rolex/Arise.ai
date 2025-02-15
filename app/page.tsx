import Link from "next/link"
import { FileText, Library, Terminal } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center space-y-8 py-8 md:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Welcome to Arise
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Your platform for managing and interacting with local AI models
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/models">
          <Card className="h-full">
            <CardHeader>
              <Library className="h-8 w-8" />
              <CardTitle>Model Library</CardTitle>
              <CardDescription>Browse and install AI models</CardDescription>
            </CardHeader>
            <CardContent>Browse and install AI models from our curated collection.</CardContent>
          </Card>
        </Link>
        <Link href="/console">
          <Card className="h-full">
            <CardHeader>
              <Terminal className="h-8 w-8" />
              <CardTitle>Interactive Console</CardTitle>
              <CardDescription>Chat with your models</CardDescription>
            </CardHeader>
            <CardContent>Interact with your installed models through a powerful console interface.</CardContent>
          </Card>
        </Link>
        <Link href="/docs">
          <Card className="h-full">
            <CardHeader>
              <FileText className="h-8 w-8" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Learn how to use Arise</CardDescription>
            </CardHeader>
            <CardContent>Learn how to use Arise to manage and interact with your local AI models.</CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
