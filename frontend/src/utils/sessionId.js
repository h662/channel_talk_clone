export const generateSessionId = () => {
  return (
    "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
  );
};

export const getOrCreateSessionId = (isAdmin = false) => {
  const storageKey = isAdmin ? "admin_session_id" : "chat_session_id";
  let sessionId = sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
};

export const clearSessionId = (isAdmin = false) => {
  const storageKey = isAdmin ? "admin_session_id" : "chat_session_id";
  sessionStorage.removeItem(storageKey);
};
