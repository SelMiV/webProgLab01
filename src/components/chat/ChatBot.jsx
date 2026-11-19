import { useState, useEffect, useRef } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { FiX, FiSend } from "react-icons/fi";

import chatAnswers, { findAnswers, helloMessage, adminMessage } from "./chatAnswers";
import useLocalStorage from "../../hooks/useLocalStorage";

// текущее время в виде 00:00
function getTime() {
    return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

// чат-бот
// пользователь нажимает на готовый вопрос бот сразу отвечает
// если пишет свой вопрос, бот ищет в нем знакомые слова, а если не нашел передает админу
// open и setOpen приходят из Layout (чат открывается и из нижнего меню)
function ChatBot({ open, setOpen }) {
    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);
    // история сообщений сохраняется, чтобы не пропадала при переходе по страницам
    const [messages, setMessages] = useLocalStorage("chat", [
        { from: "bot", text: helloMessage, time: getTime() }
    ]);

    const bottomRef = useRef(null);
    const chatRef = useRef(null);

    // на телефоне клик мимо чата - закрываем
    useEffect(() => {
        function clickOutside(e) {
            if (!open || window.innerWidth >= 1024) return;
            if (chatRef.current.contains(e.target) || e.target.closest(".chat-tab")) return;
            setOpen(false);
        }

        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, [open, setOpen]);

    // прокрутка вниз при новом сообщении
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, typing, open]);

    // бот отвечает с небольшой задержкой, как будто печатает
    // answers - список ответов, каждый отдельным сообщением
    function botReply(answers) {
        setTyping(true);
        setTimeout(() => {
            const botMessages = answers.map((answer) => ({ from: "bot", text: answer, time: getTime() }));
            setMessages((old) => [...old, ...botMessages]);
            setTyping(false);
        }, 800);
    }

    function askQuestion(item) {
        setMessages((old) => [...old, { from: "user", text: item.question, time: getTime() }]);
        botReply([item.answer]);
    }

    function sendMessage(e) {
        e.preventDefault();
        if (text.trim() === "") return;

        setMessages((old) => [...old, { from: "user", text: text, time: getTime() }]);
        setText("");

        // если нашел знакомые слова отвечает сам, если нет передает админу
        const answers = findAnswers(text);
        botReply(answers.length > 0 ? answers : [adminMessage]);
    }

    return (
        <div className="chatbot" ref={chatRef}>
            {open && (
                <div className="chatbot__window">
                    <div className="chatbot__header">
                        <p className="chatbot__title">ОНЛАЙН-ЧАТ DEMIX</p>
                        <button className="chatbot__close" onClick={() => setOpen(false)}>
                            <FiX />
                        </button>
                    </div>

                    <div className="chatbot__messages">
                        <p className="chatbot__date">Сегодня</p>
                        <p className="chatbot__name">Demix</p>

                        {messages.map((message, index) => (
                            <div key={index} className={"chatbot__row chatbot__row--" + message.from}>
                                {message.from === "bot" && (
                                    <span className="chatbot__avatar"></span>
                                )}
                                <div className={"chatbot__message chatbot__message--" + message.from}>
                                    {message.text}
                                    {message.time && <span className="chatbot__time">{message.time}</span>}
                                </div>
                            </div>
                        ))}

                        {typing && (
                            <div className="chatbot__row chatbot__row--bot">
                                <span className="chatbot__avatar"></span>
                                <div className="chatbot__message chatbot__message--bot chatbot__message--typing">
                                    печатает...
                                </div>
                            </div>
                        )}
                        
                        <div className="chatbot__questions">
                            {chatAnswers.map((item) => (
                                <button
                                    key={item.question}
                                    className="chatbot__question"
                                    onClick={() => askQuestion(item)}
                                    disabled={typing}
                                >
                                    {item.question}
                                </button>
                            ))}
                        </div>

                        <div ref={bottomRef}></div>
                    </div>

                    <form className="chatbot__form" onSubmit={sendMessage}>
                        <input
                            className="chatbot__input"
                            type="text"
                            placeholder="Напиши сообщение"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="chatbot__send" type="submit">
                            <FiSend />
                        </button>
                    </form>
                </div>
            )}

            <button className="chatbot__button" onClick={() => setOpen(!open)}>
                {open ? <FiX /> : <BsChatDotsFill />}
            </button>
        </div>
    )
}

export default ChatBot;
