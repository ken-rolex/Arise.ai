import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModelsPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Model Library</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mistral 7B</CardTitle>
            <CardDescription>Efficient and powerful language model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span>1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>5.0GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platforms:</span>
                <span>windows, linux, macos</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Install</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>LLaMA 2</CardTitle>
            <CardDescription>Meta&apos;s powerful open-source language model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version:</span>
                <span>2.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>7.0GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platforms:</span>
                <span>windows, linux, macos</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full">
              Uninstall
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}