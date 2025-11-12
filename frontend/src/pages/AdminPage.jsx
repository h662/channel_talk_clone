import { useEffect, useState } from "react";
import websocketService from "../services/websocket";
import { getOrCreateSessionId } from "../utils/sessionId";

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null); // null = 전체 대화

  const roomId = "customer-support";
  const sessionId = getOrCreateSessionId(true);

  useEffect(() => {
    connectToChat();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const connectToChat = async () => {
    try {
      await websocketService.connect(roomId, (message) => {
        setMessages((prev) => [...prev, message]);
      });
      setIsConnected(true);
      websocketService.addUser(roomId, "관리자", sessionId);
    } catch (error) {
      console.error("Failed to connect: ", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar - User List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">관리자 대시보드</h1>
          <p className="text-sm text-blue-100 mt-1">실시간 고객 지원</p>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm font-medium">
              {isConnected ? "연결됨" : "연결 중..."}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase">
                {/* 활성 세션 ({sessions.length}) */}
              </h2>
              {selectedSessionId && (
                <button
                  // onClick={handleShowAllSessions}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  전체 보기
                </button>
              )}
            </div>

            {/* 전체 대화 버튼 */}
            {/* <div
              onClick={handleShowAllSessions}
              className={`mb-2 rounded-lg p-3 transition-colors cursor-pointer border ${
                selectedSessionId === null
                  ? "bg-blue-50 border-blue-300"
                  : "bg-gray-50 border-transparent hover:bg-gray-100 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  전체
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">전체 대화</p>
                  <p className="text-xs text-gray-500">
                    모든 세션의 메시지 (
                    {messages.filter((m) => m.type === "CHAT").length}개)
                  </p>
                </div>
              </div>
            </div> */}

            {/* 세션 리스트 */}
            {/* <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  onClick={() => handleSessionClick(session.sessionId)}
                  className={`rounded-lg p-3 transition-colors cursor-pointer border ${
                    selectedSessionId === session.sessionId
                      ? "bg-blue-50 border-blue-300"
                      : "bg-gray-50 border-transparent hover:bg-gray-100 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {session.sender?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">
                          {session.sender || "익명"}
                        </p>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs flex-shrink-0">
                          {session.messageCount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">
                        {session.lastMessage?.message || "메시지 없음"}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 truncate">
                          ID: {session.sessionId?.substring(8, 20) || "unknown"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatTime(session.lastMessage?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {sessions.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">
                  대기 중인 사용자가 없습니다
                </p>
              )}
            </div> */}
          </div>
        </div>

        {/* <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500">
            <p>
              총 메시지: {messages.filter((m) => m.type === "CHAT").length}개
            </p>
            <p className="mt-1">
              마지막 업데이트: {new Date().toLocaleTimeString("ko-KR")}
            </p>
          </div>
        </div> */}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <div className="bg-white border-b border-gray-200 p-6">
          {selectedSessionId ? (
            <>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {sessions.find((s) => s.sessionId === selectedSessionId)
                    ?.sender || "사용자"}
                  님과의 대화
                </h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                  1:1 대화
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                세션 ID: {selectedSessionId.substring(0, 24)}...
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900">전체 대화</h2>
              <p className="text-sm text-gray-500 mt-1">
                모든 고객 메시지를 실시간으로 확인합니다
              </p>
            </>
          )}
        </div> */}

        {/* Messages */}
        {/* <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {filteredMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">메시지가 없습니다</p>
            </div>
          ) : (
            filteredMessages.map((msg, index) => {
              const prevMsg = filteredMessages[index - 1];
              const showDate =
                !prevMsg ||
                formatDate(msg.createdAt) !== formatDate(prevMsg.createdAt);

              return (
                <div key={index}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="bg-white px-4 py-1 rounded-full text-xs text-gray-500 border border-gray-200">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  )}

                  {msg.type === "JOIN" || msg.type === "LEAVE" ? (
                    <div className="text-center text-gray-500 text-sm my-2">
                      {msg.message || `${msg.sender}님이 입장했습니다.`}
                    </div>
                  ) : (
                    <div className="mb-4 max-w-4xl mx-auto">
                      <div
                        className={`flex ${
                          isAdminMessage(msg) ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="flex items-start gap-3 max-w-xl">
                          {!isAdminMessage(msg) && (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {msg.sender?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                          <div>
                            <div className="text-xs font-semibold mb-1 flex items-center gap-2 flex-wrap">
                              <span
                                className={
                                  isAdminMessage(msg)
                                    ? "text-green-700"
                                    : "text-gray-700"
                                }
                              >
                                {msg.sender || "사용자"}
                              </span>
                              {isAdminMessage(msg) ? (
                                <>
                                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                    관리자
                                  </span>
                                  {msg.targetSessionId ? (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                      1:1
                                    </span>
                                  ) : (
                                    <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">
                                      전체
                                    </span>
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                    세션
                                  </span>
                                  <span className="text-gray-400 text-xs">
                                    {msg.sessionId?.substring(8, 20) ||
                                      "unknown"}
                                  </span>
                                </>
                              )}
                            </div>
                            <div
                              className={`rounded-lg p-3 ${
                                isAdminMessage(msg)
                                  ? "bg-green-600 text-white"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <div className="break-words">{msg.message}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  isAdminMessage(msg)
                                    ? "text-green-100"
                                    : "text-gray-500"
                                }`}
                              >
                                {formatTime(msg.createdAt)}
                              </div>
                            </div>
                          </div>
                          {isAdminMessage(msg) && (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              관
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div> */}

        {/* Input Area */}
        {/* <div className="bg-white border-t border-gray-200 p-6">
          <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
            {selectedSessionId && (
              <div className="mb-3 flex items-center gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  1:1 대화 모드
                </span>
                <span className="text-gray-600">
                  {sessions.find((s) => s.sessionId === selectedSessionId)
                    ?.sender || "사용자"}
                  님에게만 전송됩니다
                </span>
              </div>
            )}
            {!selectedSessionId && (
              <div className="mb-3 flex items-center gap-2 text-sm">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                  전체 메시지 모드
                </span>
                <span className="text-gray-600">
                  모든 활성 세션({sessions.length}개)에 전송됩니다
                </span>
              </div>
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  selectedSessionId
                    ? "이 사용자에게 메시지 전송..."
                    : "모든 사용자에게 메시지 전송..."
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                disabled={!isConnected}
              />
              <button
                type="submit"
                disabled={!isConnected || !inputMessage.trim()}
                className={`text-white px-8 py-3 rounded-lg hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium ${
                  selectedSessionId ? "bg-blue-600" : "bg-orange-600"
                }`}
              >
                {selectedSessionId ? "1:1 전송" : "전체 전송"}
              </button>
            </div>
            {!isConnected && (
              <p className="text-xs text-red-500 mt-2">
                서버에 연결 중입니다...
              </p>
            )}
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default AdminPage;
