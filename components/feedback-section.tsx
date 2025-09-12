"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Star, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Feedback {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

export default function FeedbackSection() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchFeedback()

    if (!dbError) {
      const channel = supabase
        .channel("feedback_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "feedback",
          },
          (payload) => {
            setFeedbacks((prev) => [payload.new as Feedback, ...prev])
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [dbError])

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false })

      if (error) {
        if (error.message.includes("table") && error.message.includes("feedback")) {
          setDbError("The feedback system is not yet set up. Please run the database setup script first.")
        } else {
          throw error
        }
      } else {
        setFeedbacks(data || [])
        setDbError(null)
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
      setDbError("Unable to connect to the feedback system. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (dbError) {
      alert("The feedback system is not available right now. Please try again later.")
      return
    }

    if (!name.trim() || !message.trim() || rating === 0) {
      alert("Please fill in all fields and select a rating")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("feedback").insert({
        name: name.trim(),
        message: message.trim(),
        rating,
      })

      if (error) {
        if (error.message.includes("table") && error.message.includes("feedback")) {
          setDbError("The feedback system is not yet set up. Please run the database setup script first.")
          alert("The feedback system is not available right now. Please contact the administrator.")
        } else {
          throw error
        }
      } else {
        setName("")
        setMessage("")
        setRating(0)
        setHoveredRating(0)

        alert("Thank you for your feedback!")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = interactive ? starValue <= (hoveredRating || rating) : starValue <= currentRating

      return (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer transition-colors ${
            isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      )
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="feedback" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Feedback</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and help me improve. Your feedback is valuable!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {dbError && (
            <Card className="mb-8 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-800">Setup Required</h3>
                    <p className="text-orange-700 mt-1">{dbError}</p>
                    <p className="text-sm text-orange-600 mt-2">
                      To enable the feedback system, please run the SQL script:{" "}
                      <code className="bg-orange-100 px-2 py-1 rounded">scripts/001_create_feedback_table.sql</code>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or comments..."
                    rows={4}
                    className="w-full resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center space-x-1">
                    {renderStars(rating, true)}
                    <span className="ml-2 text-sm text-gray-600">{rating > 0 ? `${rating}/5` : "Select a rating"}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !!dbError}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Submitting..." : dbError ? "System Unavailable" : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Others Are Saying</h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading feedback...</p>
              </div>
            ) : dbError ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Feedback display is currently unavailable.</p>
                <p className="text-gray-500 text-sm mt-2">Please set up the database to view feedback.</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No feedback yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {feedbacks.map((feedback) => (
                  <Card
                    key={feedback.id}
                    className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{feedback.name}</h4>
                          <div className="flex items-center mt-1">{renderStars(feedback.rating)}</div>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(feedback.created_at)}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
