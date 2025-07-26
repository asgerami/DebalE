import { useState, useEffect, useRef } from "react";
import { subscribeToMessages, sendMessage } from "../lib/supabase-crud";
import { Message } from "../lib/supabase";

export function useMessages(matchId: string | null, userId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!matchId) return;
    // Optionally: fetch initial messages here if you want
    // Subscribe to new messages
    subscriptionRef.current = subscribeToMessages(matchId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
    };
  }, [matchId]);

  const send = async (content: string) => {
    if (!matchId || !userId) return;
    setLoading(true);
    setError(null);
    try {
      const msg = await sendMessage(matchId, userId, content);
      setMessages((prev) => [...prev, msg]);
      return msg;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, send };
}
