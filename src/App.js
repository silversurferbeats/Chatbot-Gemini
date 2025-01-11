import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Style components using Tailwind CSS
import "./App.css";
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // inislize your Gemeni Api
  const apiKey = process.env.REACT_APP_APIKEYGEMINI;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // call Gemini Api to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      // add Gemeni's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-4xl md:text-8xl font-black text-blue-600 opacity-0 animate-fade-in">
          ChatBot
        </h1>
      </div>

      <div className="chat-container rounded-lg shadow-md p-4 backdrop-blur-sm">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="flex mt-4 gap-1" onKeyDown={handleKeyPress}>
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu mensaje..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={24}
            viewBox="0 0 1792 1792"
          >
            <path
              fill="currentColor"
              d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45q-14 8-31 8q-11 0-24-5l-453-185l-242 295q-18 23-49 23q-13 0-22-4q-19-7-30.5-23.5T640 1728v-349l864-1059l-1069 925l-395-162q-37-14-40-55q-2-40 32-59L1696 9q15-9 32-9q20 0 36 11"
            ></path>
          </svg>
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
          onClick={clearChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={24}
            viewBox="0 0 22 24"
          >
            <path
              fill="currentColor"
              d="M16.313 4V2.144C16.313.96 15.353 0 14.169 0H7.831A2.14 2.14 0 0 0 5.69 2.189v-.002V4H0v2h.575c.196.023.372.099.515.214l-.002-.002c.119.157.203.346.239.552l.001.008l1.187 15.106c.094 1.84.094 2.118 2.25 2.118h12.462c2.16 0 2.16-.275 2.25-2.113l1.187-15.1c.036-.217.12-.409.242-.572l-.002.003a1 1 0 0 1 .508-.212h.58v-2h-5.687zM7 2.187c0-.6.487-.938 1.106-.938h5.734c.618 0 1.162.344 1.162.938V4h-8zM6.469 20l-.64-12h1.269l.656 12zm5.225 0H10.32V8h1.375zm3.85 0h-1.275l.656-12h1.269z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
