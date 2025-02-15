"use client"

import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConsolePage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Interactive Console</h1>
      <div className="grid gap-8">
        <div className="space-y-4">
          <label className="text-sm font-medium">Select Model</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mistral">Mistral 7B</SelectItem>
              <SelectItem value="llama">LLaMA 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-medium">Temperature: 0.7</label>
            <Slider defaultValue={[0.7]} max={1} step={0.1} />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium">Max Tokens: 2048</label>
            <Slider defaultValue={[2048]} max={4096} step={128} />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium">Top P: 0.9</label>
            <Slider defaultValue={[0.9]} max={1} step={0.1} />
          </div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          Please select a model to begin
        </div>
      </div>
    </div>
  )
}