"use client"

import { useState, useEffect } from "react"
import { Mic, Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        setTranscript(transcript)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [])

  const startListening = () => {
    setTranscript("")
    setIsListening(true)
    recognition?.start()
  }

  const stopListening = () => {
    setIsListening(false)
    recognition?.stop()
  }

  return (
    <div className="container flex flex-col items-center py-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold">Arise.AI</h1>
        <p className="text-xl text-muted-foreground">
          Experience the future of AI interaction with our seamless platform
        </p>
        <div className="flex gap-4">
          <Button>Start Chatting</Button>
          <Button 
            variant="outline" 
            onClick={isListening ? stopListening : startListening}
            className={isListening ? "bg-primary text-primary-foreground" : ""}
          >
            {isListening ? "Stop Talking" : "Start Talking"}
          </Button>
        </div>
      </div>
      <Card className="mt-8 flex h-[600px] w-full max-w-[800px] flex-col">
        <div className="relative flex-1 p-4">
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Animated rings */}
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-75 blur-md" />
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-md" style={{ animationDelay: "150ms" }} />
                {/* Center microphone */}
                <div className="relative h-32 w-32 rounded-full bg-background/80 backdrop-blur-sm">
                  <Mic className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform" />
                </div>
              </div>
            </div>
          )}
          {transcript && (
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm">{transcript}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 border-t p-4">
          <Input 
            placeholder="Enter your prompt..." 
            className="flex-1"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}