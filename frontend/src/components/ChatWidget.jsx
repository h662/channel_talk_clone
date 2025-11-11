import { useEffect, useState } from "react";
import websocketService from "../services/websocket";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState(
    () => sessionStorage.getItem("chat_username") || ""
  );
  const [isConnected, setIsConnected] = useState(false);

  const roomId = "customer-support";

  useEffect(() => {
    if (isOpen && !isConnected && username) {
      connectToChat();
    }

    return () => {
      if (isConnected) {
        websocketService.disconnect();
      }
    };
  }, [isOpen, username]);

  const connectToChat = async () => {
    try {
      await websocketService.connect(roomId, (message) => {
        const isMyMessage = message.sessionId === sessionId;
        const isAdminMessage = message.sender === "관리자";
        const isForMe =
          message.targetSessionId === null ||
          message.targetSessionId === sessionId;
        const shouldShow = isMyMessage || (isAdminMessage && isForMe);

        if (shouldShow) {
          // 이전 메시지에 추가
        }
      });
      setIsConnected(true);
      websocketService.addUser(roomId, username, sessionId);
    } catch (error) {
      console.error("Failed to connect: ", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
  };

  const handleOpen = () => {
    if (!username) {
      const name = prompt("이름을 입력하세요:");
      if (name) {
        setUsername(name);
        sessionStorage.setItem("chat_username", name);
      } else {
        return;
      }
    }
    setIsOpen(true);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">고객 지원</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          {/* <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                {msg.type === "JOIN" || msg.type === "LEAVE" ? (
                  <div className="text-center text-gray-500 text-sm">
                    {msg.message || `${msg.sender}님이 입장했습니다.`}
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      isMyMessage(msg) ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        isMyMessage(msg)
                          ? "bg-blue-600 text-white"
                          : msg.sender === "관리자"
                          ? "bg-green-50 border border-green-200"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {!isMyMessage(msg) && (
                        <div className="text-xs font-semibold mb-1 flex items-center gap-1 flex-wrap">
                          <span
                            className={
                              msg.sender === "관리자"
                                ? "text-green-700"
                                : "text-gray-700"
                            }
                          >
                            {msg.sender || "사용자"}
                          </span>
                          {msg.sender === "관리자" && (
                            <>
                              <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs">
                                관리자
                              </span>
                              {msg.targetSessionId === null && (
                                <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded text-xs">
                                  공지
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      <div className="break-words">{msg.message}</div>
                      <div
                        className={`text-xs mt-1 ${
                          isMyMessage(msg)
                            ? "text-blue-100"
                            : msg.sender === "관리자"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div> */}

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600"
                disabled={!isConnected}
              />
              <button
                type="submit"
                disabled={!isConnected || !inputMessage.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                전송
              </button>
            </div>
            {!isConnected && (
              <p className="text-xs text-gray-500 mt-2">연결 중...</p>
            )}
          </form>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ChatWidget;
