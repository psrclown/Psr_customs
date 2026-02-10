import React, { useEffect, useState } from "react";
import { messagesAPI } from "../../utils/api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data } = await messagesAPI.getAll();
        setMessages(data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load contact messages"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-primary-500 font-display">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">Contact Messages</h1>
        <p className="text-gray-400 mb-8">
          Messages submitted from the contact page.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-400 border border-red-500/50">
            {error}
          </div>
        )}

        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="card-dark">
                <h3 className="text-lg font-semibold text-white">
                  {msg.subject}
                </h3>
                <p className="text-gray-400">
                  From: {msg.name} ({msg.email})
                </p>
                <p className="mt-2 text-gray-300 whitespace-pre-wrap">
                  {msg.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
