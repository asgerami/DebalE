"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Coffee,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMessages } from "../../hooks/useMessages";

const mockConversations = [
  {
    id: 1,
    name: "Meron Tadesse",
    lastMessage: "The room is still available. When would you like to visit?",
    timestamp: "2 min ago",
    unread: 2,
    avatar: "M",
    online: true,
    roomTitle: "Cozy Room Near AAU Campus",
    roomPrice: 1500,
  },
  {
    id: 2,
    name: "Daniel Kebede",
    lastMessage:
      "Thanks for your interest! Let me know if you have any questions.",
    timestamp: "1 hour ago",
    unread: 0,
    avatar: "D",
    online: false,
    roomTitle: "Modern Shared Apartment",
    roomPrice: 2200,
  },
  {
    id: 3,
    name: "Sara Mengistu",
    lastMessage: "I'm looking for a female roommate. Are you still interested?",
    timestamp: "3 hours ago",
    unread: 1,
    avatar: "S",
    online: true,
    roomTitle: "Female-Only Housing",
    roomPrice: 1800,
  },
  {
    id: 4,
    name: "Yohannes Alemu",
    lastMessage: "The deposit is 2 months rent in advance.",
    timestamp: "1 day ago",
    unread: 0,
    avatar: "Y",
    online: false,
    roomTitle: "Professional's Choice",
    roomPrice: 2800,
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "other",
    message: "Hi! I saw your inquiry about the room. It's still available.",
    timestamp: "10:30 AM",
    status: "delivered",
  },
  {
    id: 2,
    sender: "me",
    message:
      "Great! Can you tell me more about the neighborhood and the current roommates?",
    timestamp: "10:32 AM",
    status: "delivered",
  },
  {
    id: 3,
    sender: "other",
    message:
      "The area is very safe and close to AAU. My current roommates are both engineering students, very quiet and clean.",
    timestamp: "10:35 AM",
    status: "delivered",
  },
  {
    id: 4,
    sender: "other",
    message: "Here are some photos of the common areas",
    timestamp: "10:36 AM",
    status: "delivered",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: 5,
    sender: "me",
    message: "The place looks great! When would be a good time to visit?",
    timestamp: "10:40 AM",
    status: "delivered",
  },
  {
    id: 6,
    sender: "other",
    message: "The room is still available. When would you like to visit?",
    timestamp: "Just now",
    status: "delivered",
  },
];

export default function MessagesPage() {
  // Replace with actual matchId and userId from your app context
  const matchId = "REPLACE_WITH_MATCH_ID";
  const userId = "REPLACE_WITH_AUTH_USER_ID";
  const { messages, loading, error, send } = useMessages(matchId, userId);
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.roomTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFEF7]">
      {/* Header */}
      <header className="bg-[#FFFEF7] shadow-sm border-b border-[#ECF0F1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-[#7F8C8D]" />
              <span className="text-[#7F8C8D] hover:text-[#3C2A1E]">
                Back to Home
              </span>
            </Link>
          </div>

          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#3C2A1E]" />
            </div>
            <span className="text-xl font-bold text-[#3C2A1E]">DebalE</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm h-full">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Search Header */}
                <div className="p-4 border-b border-[#ECF0F1]">
                  <h2 className="text-xl font-bold text-[#3C2A1E] mb-4">
                    Messages
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7F8C8D]" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#FDF8F0] border border-[#ECF0F1] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-md text-[#3C2A1E] placeholder-[#7F8C8D]"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full p-4 border-b border-[#ECF0F1] hover:bg-[#FDF8F0] transition-colors text-left ${
                        selectedConversation.id === conversation.id
                          ? "bg-[#FDF8F0] border-r-2 border-r-[#F6CB5A]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                            <span className="text-[#3C2A1E] font-bold">
                              {conversation.avatar}
                            </span>
                          </div>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2ECC71] border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-[#3C2A1E] truncate">
                              {conversation.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-[#7F8C8D]">
                                {conversation.timestamp}
                              </span>
                              {conversation.unread > 0 && (
                                <Badge className="bg-[#F6CB5A] text-[#3C2A1E] text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="text-sm text-[#7F8C8D] mb-2">
                            {conversation.roomTitle} • {conversation.roomPrice}{" "}
                            Birr/month
                          </div>

                          <p className="text-sm text-[#3C2A1E] truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="bg-[#FFFEF7] border border-[#ECF0F1] rounded-xl shadow-sm h-full">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-[#ECF0F1] bg-[#FDF8F0]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-[#F6CB5A] rounded-full flex items-center justify-center">
                          <span className="text-[#3C2A1E] font-bold">
                            {selectedConversation.avatar}
                          </span>
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3C2A1E]">
                          {selectedConversation.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-[#7F8C8D]">
                          <span>
                            {selectedConversation.online
                              ? "Online"
                              : "Last seen 2 hours ago"}
                          </span>
                          <span>•</span>
                          <span>{selectedConversation.roomTitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        className="text-[#7F8C8D] hover:bg-[#FFFEF7] p-2 rounded-md"
                      >
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-[#7F8C8D] hover:bg-[#FFFEF7] p-2 rounded-md"
                      >
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-[#7F8C8D] hover:bg-[#FFFEF7] p-2 rounded-md"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md ${
                          message.sender === "me"
                            ? "bg-[#F6CB5A] text-[#3C2A1E]"
                            : "bg-[#FDF8F0] text-[#3C2A1E] border border-[#ECF0F1]"
                        } rounded-lg p-3 shadow-sm`}
                      >
                        <p className="text-sm">{message.message}</p>

                        {message.images && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {message.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Shared image ${index + 1}`}
                                width={150}
                                height={100}
                                className="rounded-md object-cover cursor-pointer hover:opacity-90 transition-opacity"
                              />
                            ))}
                          </div>
                        )}

                        <div
                          className={`flex items-center justify-between mt-2 text-xs ${
                            message.sender === "me"
                              ? "text-[#3C2A1E]/70"
                              : "text-[#7F8C8D]"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.sender === "me" && (
                            <div className="flex items-center">
                              {message.status === "delivered" && (
                                <CheckCircle className="w-3 h-3" />
                              )}
                              {message.status === "sent" && (
                                <Clock className="w-3 h-3" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-[#ECF0F1] bg-[#FDF8F0]">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      className="text-[#7F8C8D] hover:bg-[#FFFEF7] p-2 rounded-md"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>

                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="bg-[#FFFEF7] border border-[#BDC3C7] focus:border-[#F6CB5A] focus:ring-2 focus:ring-[#F6CB5A]/20 rounded-full px-4 py-2 pr-10 text-[#3C2A1E] placeholder-[#7F8C8D]"
                      />
                      <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] hover:bg-[#FDF8F0] p-1 rounded-full"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-[#F6CB5A] hover:bg-[#E6B84A] text-[#3C2A1E] p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Button
                      size="sm"
                      className="bg-[#FDF8F0] border border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] text-xs py-1 px-3 rounded-full"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Schedule Visit
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#FDF8F0] border border-[#F6CB5A] text-[#F6CB5A] hover:bg-[#F6CB5A] hover:text-[#3C2A1E] text-xs py-1 px-3 rounded-full"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Share Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-6">
          <Card className="bg-[#E3F2FD] border border-[#2196F3] rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1976D2] mb-1">
                    Safety Reminder
                  </h4>
                  <p className="text-sm text-[#1976D2]">
                    Always meet in public places first and verify identity
                    before sharing personal information. Never send money or
                    personal documents through messages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
