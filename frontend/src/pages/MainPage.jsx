import ChatWidget from "../components/ChatWidget";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            실시간 고객 지원 시스템
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Redis와 WebSocket을 활용한 채널톡 데모
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">실시간 채팅</h3>
            <p className="text-gray-600">
              WebSocket을 통한 실시간 양방향 통신으로 즉각적인 메시지 전달
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Redis Pub/Sub</h3>
            <p className="text-gray-600">
              Redis 메시지 브로커를 활용한 확장 가능한 메시징 아키텍처
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">영구 저장</h3>
            <p className="text-gray-600">
              모든 대화 내용을 데이터베이스에 저장하여 이력 관리
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              지금 바로 채팅을 시작해보세요!
            </h2>
            <p className="text-gray-600 mb-6">
              우측 하단의 채팅 버튼을 클릭하여 관리자와 대화를 시작할 수
              있습니다.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>관리자 페이지는 /admin에서 확인할 수 있습니다</span>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default MainPage;
