"use client";

import { useChat } from "@ai-sdk/react";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaLock } from "react-icons/fa";
import Link from "next/link";
import styles from "./ChatBot.module.css";

export default function ChatBot() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const sendMessage = async (params: { text: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userMessage = { id: Date.now().toString(), role: 'user', content: params.text };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      // Check if it's a stream or JSON
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        setMessages(prev => [...prev, { 
          id: data.id || Date.now().toString(), 
          role: 'assistant', 
          content: data.content 
        }]);
      } else {
        // Handle streaming (simplified)
        const reader = response.body?.getReader();
        const decoder = new TextEncoder();
        let assistantContent = "";
        const assistantId = Date.now().toString() + "-ai";
        
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: "" }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = new TextDecoder().decode(value);
            // Basic parsing of AI SDK stream format (0:"...")
            const matches = chunk.matchAll(/0:"([^"]+)"/g);
            for (const match of matches) {
              assistantContent += match[1].replace(/\\n/g, '\n');
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Chat Error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!session;

  const suggestions = [
    "Gợi ý tour Hạ Long",
    "Tour Đà Nẵng 3 ngày 2 đêm",
    "Cách đặt tour trực tuyến?",
    "Chính sách hủy tour như thế nào?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    sendMessage({
      text: suggestion,
    });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    
    sendMessage({
      text: localInput,
    });
    setLocalInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.hidden : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <FaComments size={24} />
      </button>

      {/* Chat Window */}
      <div className={`${styles.chatWindow} ${isOpen ? styles.show : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <FaComments />
            <span>Tư vấn viên</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.messagesContainer}>
          {(messages || []).length === 0 && (
            <div className={styles.emptyState}>
              Xin chào! Tôi là Tư vấn viên. Tôi có thể giúp gì cho chuyến đi của bạn?
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageWrapper} ${
                m.role === "user" ? styles.messageUserWrapper : styles.messageBotWrapper
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  m.role === "user" ? styles.messageUser : styles.messageBot
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.messageBotWrapper}`}>
              <div className={`${styles.messageBubble} ${styles.messageBot}`}>
                <span className={styles.dotFlashing}></span>
              </div>
            </div>
          )}
          {error && (
            <div className={styles.emptyState} style={{ color: "red" }}>
              Lỗi: {error.message || "Đã xảy ra lỗi kết nối. Vui lòng thử lại!"}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!isAuthenticated ? (
          <div className={styles.authPrompt}>
            <FaLock style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--primary-blue)' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-dark)', marginBottom: '16px' }}>Vui lòng đăng nhập để bắt đầu tư vấn với AI</p>
            <Link href="/login" className={styles.loginBtn}>Đăng nhập ngay</Link>
          </div>
        ) : (
          <>
            {(messages || []).length === 0 && !isLoading && (
              <div className={styles.suggestionsContainer}>
                <p className={styles.suggestionTitle}>Gợi ý cho bạn:</p>
                <div className={styles.suggestionsList}>
                  {suggestions.map((s, i) => (
                    <button 
                      key={i} 
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(s)}
                      disabled={isLoading}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={onFormSubmit} className={styles.inputArea}>
              <input
                className={styles.inputField}
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
              />
              <button type="submit" className={styles.sendBtn} disabled={isLoading || !localInput.trim()}>
                <FaPaperPlane />
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
