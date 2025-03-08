import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatPage = ({ chatType }) => {
    const dispatch = useDispatch();
    const chatMessages = useSelector((state) => state.chat[chatType]);
    const { loading } = useSelector(state => state.chat);
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        dispatch(getAllChats());
    }, [dispatch]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        dispatch(sendMessage({ type: chatType, message }));
        setMessage("");
    };

    return (
        <div className="w-full mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-3">ChatPage ({chatType})</h2>
            
            <div ref={chatContainerRef} className="h-96 overflow-y-auto border border-gray-300 p-3 rounded-lg bg-gray-100">
                {chatMessages && chatMessages.length > 0 ? (
                    chatMessages.map((chatItem, index) => (
                        <div
                            key={index}
                            className={`mb-2 max-w-[70%] p-2 rounded-lg text-sm ${
                                chatItem.role === "user" ? "ml-auto bg-blue-200 text-right" : "mr-auto bg-green-200 text-left"
                            }`}
                        >
                            <strong className="text-neutral">{chatItem.role}:</strong>
                            <MarkdownRenderer markdown={chatItem.msg} />    
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet...</p>
                )}
            </div>

            <div className="mt-4 flex">
                <input
                    disabled={loading}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={handleSendMessage} disabled={loading} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    {loading ? <span className="loading loading-dots loading-lg"></span> : 'Send'}
                </button>
            </div>
        </div>
    );
};


export default ChatPage;
