import { useRef, useEffect } from "react";
import type { ConversationMessage } from "../store/tripStore";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ConversationHistoryProps {
  conversationHistory: ConversationMessage[];
}

function ConversationHistory({
  conversationHistory,
}: ConversationHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>对话历史</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {conversationHistory.map((message, index) => (
              <div
                key={
                  message.id || `msg-${index}-${message.message.slice(0, 10)}`
                }
                className={`flex gap-3 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      我
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ConversationHistory;
