import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null); // Reference to the bottom of the chat

  // Fetch messages and subscribe to updates
  useEffect(() => {
    if (!selectedUser?._id) {
      console.warn("No user selected. Chat container will not load.");
      return;
    }

    console.log("Fetching messages for user:", selectedUser._id);
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                String(message.senderId) === String(authUser._id) ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      String(message.senderId) === String(authUser._id)
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
        {/* Add a reference to the bottom of the chat */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
