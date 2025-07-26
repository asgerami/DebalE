"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Coffee, 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical,
  ArrowLeft,
  Star,
  Clock
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { messagesService } from "@/lib/database"

interface Conversation {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean | null
  created_at: string | null
  user_profiles_sender_id_fkey?: {
    full_name: string
  }
  user_profiles_receiver_id_fkey?: {
    full_name: string
  }
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Conversation[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSending, setIsSending] = useState(false)

  const { user } = useAuth()

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        const conversationsData = await messagesService.getConversations()
        setConversations(conversationsData)
      } catch (error) {
        console.error('Error loading conversations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConversations()
  }, [user])

  // Group conversations by other user
  const groupedConversations = conversations.reduce((acc, message) => {
    const otherUserId = message.sender_id === user?.id ? message.receiver_id : message.sender_id
    const otherUserName = message.sender_id === user?.id 
      ? message.user_profiles_receiver_id_fkey?.full_name 
      : message.user_profiles_sender_id_fkey?.full_name

    if (!acc[otherUserId]) {
      acc[otherUserId] = {
        userId: otherUserId,
        userName: otherUserName || 'Unknown User',
        lastMessage: message,
        unreadCount: 0
      }
    }

    if (!message.is_read && message.sender_id !== user?.id) {
      acc[otherUserId].unreadCount++
    }

    // Keep the most recent message
    if (new Date(message.created_at) > new Date(acc[otherUserId].lastMessage.created_at)) {
      acc[otherUserId].lastMessage = message
    }

    return acc
  }, {} as Record<string, any>)

  const conversationList = Object.values(groupedConversations)

  // Filter conversations by search query
  const filteredConversations = conversationList.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return

    setIsSending(true)
    try {
      const messageData = {
        sender_id: user.id,
        receiver_id: selectedConversation.sender_id === user.id 
          ? selectedConversation.receiver_id 
          : selectedConversation.sender_id,
        content: newMessage.trim(),
        room_id: null
      }

      const sentMessage = await messagesService.sendMessage(messageData)
      
      if (sentMessage) {
        setNewMessage("")
        // Refresh conversations
        const updatedConversations = await messagesService.getConversations()
        setConversations(updatedConversations)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getOtherUserName = (conversation: Conversation) => {
    return conversation.sender_id === user?.id 
      ? conversation.user_profiles_receiver_id_fkey?.full_name 
      : conversation.user_profiles_sender_id_fkey?.full_name
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFFEF7]">
        {/* Header */}
        <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#3C2A1E]" />
              </div>
              <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                  Dashboard
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="ghost" className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                  Search Rooms
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm h-full">
                <CardHeader className="border-b border-[#ECF0F1]">
                  <CardTitle className="text-lg font-bold text-[#3C2A1E] flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Messages
                  </CardTitle>
                  
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7F8C8D]" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-6 h-6 border-2 border-[#F6CB5A] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-[#7F8C8D] mx-auto mb-4" />
                      <p className="text-[#7F8C8D]">No conversations yet</p>
                      <p className="text-sm text-[#7F8C8D]">Start messaging room owners!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#ECF0F1]">
                      {filteredConversations.map((conversation) => (
                        <div
                          key={conversation.userId}
                          onClick={() => setSelectedConversation(conversation.lastMessage)}
                          className={`p-4 cursor-pointer hover:bg-[#FDF8F0] transition-colors duration-200 ${
                            selectedConversation?.sender_id === conversation.userId || 
                            selectedConversation?.receiver_id === conversation.userId
                              ? 'bg-[#FDF8F0] border-r-2 border-[#F6CB5A]'
                              : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-[#F6CB5A] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[#3C2A1E] font-bold text-sm">
                                  {conversation.userName[0]?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-[#3C2A1E] truncate">
                                    {conversation.userName}
                                  </h4>
                                  <span className="text-xs text-[#7F8C8D] flex-shrink-0">
                                    {formatTime(conversation.lastMessage.created_at)}
                                  </span>
                                </div>
                                <p className="text-sm text-[#7F8C8D] truncate">
                                  {conversation.lastMessage.content}
                                </p>
                              </div>
                            </div>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-[#F6CB5A] text-[#3C2A1E] text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm h-full flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="border-b border-[#ECF0F1]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedConversation(null)}
                            className="lg:hidden"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <div className="w-10 h-10 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                            <span className="text-[#3C2A1E] font-bold text-sm">
                              {getOtherUserName(selectedConversation)?.[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#3C2A1E]">
                              {getOtherUserName(selectedConversation) || 'Unknown User'}
                            </h3>
                            <p className="text-sm text-[#7F8C8D]">Active now</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {conversations
                        .filter(msg => 
                          (msg.sender_id === selectedConversation.sender_id && msg.receiver_id === selectedConversation.receiver_id) ||
                          (msg.sender_id === selectedConversation.receiver_id && msg.receiver_id === selectedConversation.sender_id)
                        )
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender_id === user?.id
                                  ? 'bg-[#F6CB5A] text-[#3C2A1E]'
                                  : 'bg-[#ECF0F1] text-[#3C2A1E]'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className={`flex items-center justify-end mt-1 ${
                                message.sender_id === user?.id ? 'text-[#3C2A1E]/70' : 'text-[#7F8C8D]'
                              }`}>
                                <Clock className="w-3 h-3 mr-1" />
                                <span className="text-xs">
                                  {formatTime(message.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-[#ECF0F1] p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                          className="flex-1 bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md px-3 py-2 text-sm resize-none"
                          rows={1}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isSending}
                          className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] px-4"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-[#7F8C8D] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#3C2A1E] mb-2">Select a conversation</h3>
                      <p className="text-[#7F8C8D]">Choose a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
