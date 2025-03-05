import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { GoHistory } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FiEdit, FiCopy, FiCalendar } from "react-icons/fi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrLike, GrDislike, GrNewWindow } from "react-icons/gr";
import config from "../config"; // Adjust the path as necessary
import Select from "react-select";
import { CgLayoutGrid } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { FaReply } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

function MainViewCLI({
    active,
    username,
    llmmodel,
    llm,
    llmkey,
    breadcrumb,
    headertext,
}) {
    const userData = localStorage.getItem("user");
    const parsedUser = userData ? JSON.parse(userData) : null;
    const [llms, setLlms] = useState(llm);
    //const [llmKey, setLlmKey] = useState(llmkey);
    const [llmKey, setLlmKey] = useState("copilot|o1-mini");
    const [llmModel, setLlmModel] = useState(llmmodel);
    const [breadCrumb, setBreadCrumb] = useState(breadcrumb);
    const [headerText, setHeaderText] = useState(headertext);
    const [conversationId, setConversationId] = useState(0);
    const [programmingLanguage, setLanguage] = useState("");
    const [phase, setPhase] = useState("code");
    const [promptCommand, setPrompt] = useState("");
    const [referenceCode, setReference] = useState("");
    const [userName, setUserName] = useState(username);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesRef = useRef(null);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef(null);
    const [showConvertFrom, setShowConvertFrom] = useState(false);
    const [convertFrom, setConvertFrom] = useState("");
    const suggestionsRef = useRef(null);
    //let [selectedValue, setSelectedvalue] = useState("");
    const [suggestionsArea, setSuggestionsArea] = useState([]);
    const [error, setError] = useState();
    const [selectError, setSelectError] = useState(false);
    const [activeError, setActiveError] = useState(false);
    const [selectVisible, setSelectVisible] = useState(true);
    const [editprompt, setEditprompt] = useState("");
    const [chatids, setChatIds] = useState(0);
    const [counter, setCounter] = useState({
        btn1: 0,
        btn2: 0,
        btn3: 0,
    });
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    //const [replyText, setReplyText] = useState(null);
    const [repoNames, setRepoNames] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Define special characters and corresponding suggestions
    const suggestionMap = {
        "@": [
            "code",
            "unittest",
            "bug-fix",
            "docs",
            "xmldocs",
            "user-story",
            "explain",
            "other",
            "securityfix",
            "convert",
            " ",
        ],
        "#": [
            "c#",
            "java",
            "python",
            "typescript",
            "reactnative",
            "c",
            "c++",
            "general",
            "angular",
            "angularjs",
            "react",
            "reactjs",
            "kotlin",
            "flutter",
            "android",
            "ios",
            "javascript",
            "php",
            " ",
        ],
        "/": [
            "java",
            "python",
            "c#",
            "angular",
            "angularjs",
            "react",
            "reactjs",
            "typescript",
            "reactnative",
            "kotlin",
            "flutter",
            "android",
            "php",
        ],
    };
    const location = useLocation();

    const handleMouseEnter = (id) => setHoveredMessageId(id);
    const handleMouseLeave = () => {
        setHoveredMessageId(null);
        setCopied(false);
    };

    useEffect(() => {
        const fetchRepoNames = async () => {
            try {
                const response = await axios.get(`${config.apiRepoUrl}/list`);
                setRepoNames(response.data);
            } catch (error) {
                console.error("Error fetching repository names:", error);
            } finally {
                setOptionsLoading(false);
            }
        };

        fetchRepoNames();
    }, []);

    const getOptions = () => {
        if (optionsLoading) {
            return <option>Loading...</option>;
        }
        //if (path === "/copilot") {
        return (
            <>
                <option value="Public">Public</option>
                {repoNames.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </>
        );
        //}
        // else if (path === "/gemini-ai") {
        //   return <option value="gemini-1.5">gemini-1.5</option>;
        // } // If the URL doesn't match, return nothing
        // return null;
    };

    // const selectedOptions = getOptions()

    // if(!selectedOptions){
    //     return null
    // }

    console.log(selectedFile, "selectedFile-=-=-");

    const handleEditClick = ({ sender, text }) => {
        setPrompt(editprompt);
        if (sender === "user") {
            text = text
                .replace(/###linebreake###/g, "\n")
                .replace(/###doublequote###/g, '"')
                .replace(/###wordbreake###/g, "\t");
            const codeMatch = text?.match(/Code:\s*(\S+)/);
            const promptMatch = text?.match(/Prompt:\s*([^,]+)/);
            if (codeMatch && codeMatch[1]) {
                setReference(codeMatch[1]);
            }
            if (promptMatch && promptMatch[1]) {
                //setPrompt(promptMatch[1]);
            }
        }
    };

    /**const handleReplyClick = ({ sender, text, chatid }) => {
      setReplyText(text);
      setConversationId(chatid);
    };
    const handleCloseClick = () => {
        // setReplyText(null);
        setConversationId(0);
    };**/

    const fetchSuggestions = async (query) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${config.apiBaseUrl}chat/autocomplete?query=${query}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json", aiModel: llmKey },
                }
            );
            const result = await response.json();
            setSuggestions(result);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching suggestions:", error);
        }
    };

    const handlePromptChange = (e) => {
        const value = e.target.value;
        //setPrompt(value);
        if (value.length > 3) {
            // Fetch suggestions if input length is greater than 3
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        //setPrompt(suggestion);
        setSuggestions([]);
    };

    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            fetchMessageHistory(start, end);
        }
    };

    const handleCalendarClick = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleClickOutside = (event) => {
        if (
            datePickerRef.current &&
            !datePickerRef.current.contains(event.target)
        ) {
            setShowDatePicker(false);
        }
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(event.target)
        ) {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handlePhaseChange = (e) => {
        const value = e.target.value;
        setPhase(value);
        setShowConvertFrom(value === "convert");
    };
    const handleHelpfulIconClick = () => {
        const feedbackIconElements =
            document.querySelectorAll(`svg[data-feedback]`);
        feedbackIconElements.forEach((element) => {
            if (
                element.getAttribute("data-feedback") !== "helpful" &&
                element.getAttribute("data-feedback-icon") === "helpful"
            ) {
                element.setAttribute("data-feedback", "helpful");
                element.style.color = "blue";
                setFeedback(element.getAttribute("data-feedback-id"), "helpful");
            } else if (element.getAttribute("data-feedback-icon") === "unhelpful") {
                element.setAttribute("data-feedback", "helpful");
                element.style.color = "black";
            }
        });
    };
    const handleUnHelpfulIconClick = () => {
        const feedbackIconElements =
            document.querySelectorAll(`svg[data-feedback]`);
        feedbackIconElements.forEach((element) => {
            if (
                element.getAttribute("data-feedback") !== "unhelpful" &&
                element.getAttribute("data-feedback-icon") === "unhelpful"
            ) {
                element.setAttribute("data-feedback", "unhelpful");
                element.style.color = "red";
                setFeedback(element.getAttribute("data-feedback-id"), "unhelpful");
            } else if (element.getAttribute("data-feedback-icon") === "helpful") {
                element.setAttribute("data-feedback", "unhelpful");
                element.style.color = "black";
            }
        });
    };

    useEffect(() => {
        if (active == "GitHub Copilot" || active == "Google Gemini") {
            setSelectVisible(false);
        } else {
            setSelectVisible(true);
        }
    }, [active]);

    const setFeedback = async (chatId, feedback) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${config.apiBaseUrl}chat/feedback/${feedback}/${chatId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const result = await response.json();
        } catch (error) {
            setIsLoading(false);
            console.error("Error update feedback:", error);
        }
    };

    const MessageBubbleInner = ({
        id,
        text,
        sender,
        time,
        feedback,
        chatid,
        promptEnggType,
    }) => {
        const DisplayDateTime = ({ value, sender }) => {
            let date = new Date(value);
            const displayDateFormat = date.toLocaleString("en-GB");
            return (
                <small style={sender === "user" ? styles.smallme : styles.smallbot}>
                    {" "}
                    {displayDateFormat}
                </small>
            );
        };

        return (
            <div
                ref={messagesRef}
                key={id}
                className={sender === "user" ? "message-bubble me" : "message-bubble"}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: "relative",
                }} /* Ensure the parent has relative positioning */
            >
                <DisplayDateTime value={time} sender={sender} />

                <div className="">
                    {hoveredMessageId === id && (
                        <div
                            className={sender === "user" ? "hover-icons-me" : "hover-icons"}
                            style={{ paddingLeft: "min(85px, 55%)", marginTop: "-20px" }}
                        >
                            {sender === "user" && (
                                <>
                                    <FiEdit
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Edit"
                                        data-tooltip-place="top"
                                        onClick={() => handleEditClick({ sender, text })}
                                        style={{ cursor: "pointer" }}
                                    />
                                    {/**<FaReply
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Reply"
                    data-tooltip-place="top"
                    onClick={() => handleReplyClick({ sender, text, chatid })}
                    style={{ cursor: "pointer" }}
                  />**/}
                                </>
                            )}
                            {sender === "bot" && (
                                <>
                                    {promptEnggType}
                                    <CopyToClipboard
                                        text={text
                                            .replace(/###linebreake###/g, "\n")
                                            .replace(/###doublequote###/g, '"')
                                            .replace(/###wordbreake###/g, "\t")}
                                        onCopy={() => setCopied(true)}
                                    >
                                        <FiCopy
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Copy"
                                            data-tooltip-place="top"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </CopyToClipboard>
                                </>
                            )}
                            {sender === "bot" && (
                                <>
                                    <GrLike
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Helpful"
                                        data-tooltip-place="top"
                                        onClick={handleHelpfulIconClick}
                                        data-feedback-id={chatid}
                                        data-feedback-icon="helpful"
                                        data-feedback={feedback}
                                        style={{
                                            color:
                                                feedback === "helpful" ? "rgb(0, 123, 255)" : "inherit",
                                            cursor: "pointer",
                                        }}
                                    />

                                    <GrDislike
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Not helpful"
                                        data-tooltip-place="top"
                                        onClick={handleUnHelpfulIconClick}
                                        data-feedback-id={chatid}
                                        data-feedback-icon="unhelpful"
                                        data-feedback={feedback}
                                        style={{
                                            color:
                                                feedback === "unhelpful"
                                                    ? "rgb(255, 0, 56)"
                                                    : "inherit",
                                            cursor: "pointer",
                                        }}
                                    />
                                </>
                            )}
                            <Tooltip id="my-tooltip" />
                        </div>
                    )}
                    <div className="message-avatar">
                        {sender === "user" && (
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="36px"
                                width="36px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"></path>
                            </svg>
                        )}
                        {sender === "bot" && (
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                color="#007bff"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="36px"
                                width="36px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 0 1-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 0 1-1.5 0V13Z"></path>
                                <path d="M8 19.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75Zm.22 1.47a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06 0L12 12.56l2.47 2.47a.75.75 0 0 0 1.06 0l3-3a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L15 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0L9 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0Z"></path>
                            </svg>
                        )}
                    </div>
                    <div className="message-text">
                        <p
                            style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                            }}
                        >
                            {text
                                .replace(/###linebreake###/g, "\n")
                                .replace(/###doublequote###/g, '"')
                                .replace(/###wordbreake###/g, "\t")}
                        </p>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    };

    const scrollToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const clearConversations = async (e) => {
        e.preventDefault();
        //setPrompt("");
        setReference("");
        setMessages([]);
    };

    const fetchMessageHistory = async (start, end) => {
        //setPrompt('');
        setReference("");
        setIsLoading(true);
        try {
            const response = await fetch(`${config.apiBaseUrl}chat/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    aiModel: llmKey,
                    userName: userName,
                    startDate: start.toDateString(),
                    endDate: end.toDateString(),
                },
            });
            const result = await response.json();
            setMessages([]);
            result?.map((msg) => {
                const mSender = msg.messageSender === "user" ? "user" : "bot";
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: msg?.messageId,
                        text: `${JSON.stringify(msg?.messageText, null, 2)
                            .replace(/"/g, "")
                            .trim()}`,
                        sender: mSender,
                        time: new Date(msg.messageDate),
                        feedback: msg.feedback,
                        chatid: msg.chatId,
                        promptEnggType: msg.promptEnggType,
                    },
                ]);
                scrollToBottom();
            });
            setShowDatePicker(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    text: "Error getting response",
                    sender: "bot",
                    time: new Date(),
                    feedback: "",
                    chatid: 0,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
        return messages.map((msg) => (
            <MessageBubbleInner
                id={msg.id}
                text={msg.text}
                sender={msg.sender}
                time={msg.time}
                feedback={msg.feedback}
                chatid={msg.chatid}
            />
        ));
    };

    const messageHistory = async (e) => {
        e.preventDefault();
        //setPrompt("");
        setReference("");
        setIsLoading(true);
        //let modelName = active.replace('-', '|').replace(' ', '-').toLowerCase();
        try {
            const response = await fetch(`${config.apiBaseUrl}chat/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    aiModel: llmKey,
                    userName: userName,
                },
            });
            const result = await response.json();
            console.log("History fetching data:", result);

            setMessages([]);
            result.map((msg) => {
                const mSender = msg.messageSender === "user" ? "user" : "bot";
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: msg?.messageId,
                        text: `${JSON.stringify(msg?.messageText, null, 2)
                            .replace(/"/g, "")
                            .trim()}`,
                        sender: mSender,
                        time: new Date(msg.messageDate),
                        feedback: msg.feedback,
                        chatid: msg.chatId,
                        promptEnggType: msg.promptEnggType,
                    },
                ]);
                scrollToBottom();
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    text: "Error getting response",
                    sender: "bot",
                    time: new Date(),
                    feedback: "",
                    chatid: 0,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
        return messages.map((msg) => (
            <MessageBubbleInner
                id={msg.id}
                text={msg.text}
                sender={msg.sender}
                time={msg.time}
                feedback={msg.feedback}
                chatid={msg.chatid}
            />
        ));
    };

    console.log(messages, "messages-=-0--0-0");
    // Handle input changes
    /**function handleSelectChange(e) {
        setSelectedvalue(e.target.value);
    }**/
    const handleTextAreaChange = (e) => {
        let value = e.target.value;

        let position = promptCommand.search(e.target.innerText);

        if (e.target.innerText) {
            if (e.target.innerText == "#") {
                setCounter({ ...counter, btn1: 1 });
            }
            if (e.target.innerText == "@") {
                setCounter({ ...counter, btn2: 1 });
            }
            if (e.target.innerText == "/") {
                setCounter({ ...counter, btn3: 1 });
            }
            value = e.target.innerText;
            console.log(value, "value-=-=");
            setPrompt((prev) => prev + value);
        } else {
            setPrompt(value);
        }

        if (promptCommand && position != -1) {
            if (counter.btn1 == 1 && e.target.innerText == "#") {
                return;
            }
            if (counter.btn2 == 1 && e.target.innerText == "@") {
                return;
            }
            if (counter.btn3 == 1 && e.target.innerText == "/") {
                return;
            }
        }

        const match = value.match(/[@#$/]/g);
        value = value.split(" ");
        // Find the last special character
        let matchCount;

        if (match != null) {
            matchCount = match.filter((x) => x === value[value.length - 1]).length;
        }

        if (match && matchCount == 1) {
            const lastChar = match[match.length - 1];
            setSuggestionsArea(suggestionMap[lastChar] || []);
        } else {
            setSuggestionsArea([]);
        }
    };
    // Handle suggestion click
    const handleTextAreaSuggestionClick = (suggestion) => {
        setPrompt((prev) => prev + suggestion + " ");

        setSuggestionsArea([]);
    };

    //   useEffect(() => {
    //     if (messages.length > 0) {
    //       const lastValidChatid = messages.reduce(
    //         (acc, curr) => (curr.chatid !== 0 ? curr.chatid : acc),
    //         0
    //       );
    //       console.log(lastValidChatid,'lastValidChatid-=-=-')
    //       setChatid(lastValidChatid);
    //     }
    //   }, [messages]);

    // useEffect(() => {
    //   console.log(chatids, "chatisisiisiisisi");
    //   setChatIds(chatids);
    // }, [chatids]);

    // useEffect(() => {
    //   if (chatids !== 0) {
    //     setNewMessage({
    //       id: Date.now(),
    //       text: inputValues,
    //       sender: "user",
    //       time: Date.now(),
    //       feedback: "",
    //       chatid: chatids,
    //     });
    //   }
    // }, [chatids]);

    // console.log(chatids, "reponse data");

    // console.log(newMessage, "newmssmsmsm-=-");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let language = "";
        let apiResponse = null;
        let aiModel = active.split("-");
        let text = "";
        let phase = "";
        console.log("aiModel", aiModel);
        console.log("apiResponse", apiResponse);

        const llm = llms;

        const model = "o1-mini" //llmModel;
        /**if (replyText) {
          if (promptCommand.length == 0) {
            setError("Please enter prompt");
            return;
          } else {
            setError("");
          }
    
          const regex = /([^:\s]+): ([^:\n,]+)/g;
    
          let m;
    
          var key = [];
          var value = [];
    
          while ((m = regex.exec(replyText)) !== null) {
            key.push(m[1]);
            value.push(m[2]);
          }
          console.log(value, "value0-0-0");
          console.log(value[2], "value0-osoospopos0-0");
    
          language = value[0];
          phase = value[1];
          text = promptCommand;
        } **/

        //else{
        if (selectedFile) {
            const formData = new FormData();
            formData.append("fileInput", selectedFile);
            try {
                setIsLoading(true);
                const response = await fetch(`${config.apiBaseUrl}files/upload`, {
                    method: "POST",
                    body: formData,
                });

                const apiResponseData = await response.json();
                apiResponse = apiResponseData.fileName;
                console.log(response, "response00000");
                console.log("File name returned from API", apiResponse);
            } catch (error) { }
        }

        let inputVal = promptCommand;

        if (promptCommand.length == 0) {
            setError(
                "Please enter # for Programming language, @ for Phase and prompt or / for convert serial wise"
            );
            return;
        } else {
            setError("");
        }

        /**if (selectedValue.length == 0) {
            setSelectError(true);
            return;
        } else {
            setSelectError(false);
        }**/

        //firstInput = active.split("-");
        if (active == "Copilot") {
            setActiveError(true);
            return;
        } else {
            setActiveError(false);
        }

        let delimiter = " ";
        let start = 2;
        let secondInput = inputVal.split(delimiter).slice(start);
        secondInput = secondInput.join(delimiter); // those.that

        let firstInput = inputVal.split(delimiter).slice(0, start);
        firstInput = firstInput.join(delimiter);

        firstInput = firstInput.split(" ");
        language = firstInput[0].replace("#", "");
        console.log("----------language", language);
        setLanguage(language);
        language = language.replace("-", " ");
        phase = firstInput[1].replace("@", "");

        phase = phase.replace("-", " ");

        text = secondInput;
        if (phase == "convert") {
            text = secondInput.replace("/", "");
        }
        //}

        const reference = apiResponse ? apiResponse : referenceCode;
        const currentUser = parsedUser?.userName;
        const selectedUser = parsedUser?.userName;
        const selectedRole = parsedUser?.roleName;
        const conversationId = 0;
        const phaseOptional = "";

        function cleanPrompt(prompt) {
            return prompt.replace(/[#\/!@][^\s]+/g, "").trim();
        }

        console.log(promptCommand, "promptCommand==");
        const prompt = cleanPrompt(promptCommand);
        console.log(prompt, "iaiusiusiuis");
        const data = {
            llm,
            model,
            language,
            phase,
            phaseOptional: text.split(" ")[0],
            prompt,
            reference,
            currentUser,
            selectedUser,
            selectedRole,
            conversationId,
            fileReference: selectedFile ? true : false,
        };

        console.log("Submitting data:", data);
        const input = language + " " + phase + " " + text + " " + referenceCode;
        const lastValidChatid = messages.reduce(
            (acc, curr) => (curr.chatid !== 0 ? curr.chatid : acc),
            0
        );

        console.log(lastValidChatid, "lastValidChatids1111");

        let newMessage = {
            id: Date.now(),
            text: input,
            sender: "user",
            time: Date.now(),
            feedback: "",
            chatid: chatids,
        };

        console.log(newMessage, "newMessage000-0-0");
        console.log(messages, "messages010010-=-");
        console.log(chatids, "chatids-=-=-=");

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        console.log(messages, "dhdhhdisjkjsjkjsk");
        setIsLoading(true);
        try {
            setIsLoading(true);
            const response = await fetch(`${config.apiBaseUrl}chat/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json", proxyEnabled: "false" },
                body: JSON.stringify(data),
            });
            //   .then( response => response.json())
            //   .then((data)=>{
            //     // console.log(data,'data response0-0-0')
            //     // console.log(data.chatId,'data chatid response0-0-0')
            //     setChatIds(data.chatId);
            //     // console.log(chatids,'chatid =====================')
            //     setChatIds(prev => {
            //       console.log(prev,"prev================");
            //       return prev;
            //     })
            //     // console.log(chatids,'chatid00000000000000000000000000')
            // });

            const result = await response.json();
            console.log("Input fetching data:", result);
            setChatIds(result.chatId);
            setChatIds((prev) => {
                console.log(prev, "prev================");
                return prev;
            });

            let rawstring = JSON.stringify(result.messageText, null, 2)
                .replace(/"/g, "")
                .trim();
            console.log("Input fetching rawstring:", rawstring);
            let formattedString = rawstring?.replace(/###linebreak###/g, "\n");
            console.log("Input fetching formattedString:", formattedString);
            /**const replyMessage = {
                id: Date.now(),
                text: formattedString,
                sender: result.messageSender,
                time: Date.now(),
                feedback: "",
                chatid: result.chatId,
            };**/
            setEditprompt(promptCommand);
            setPrompt("");
            setReference("");
            //console.log("Input fetching replyMessage:", replyMessage);
            setMessages((prevMessages) => prevMessages.slice(0, -1));
            const newChatMessage = {
                id: Date.now(),
                text: formattedString,
                sender: "user",
                time: Date.now(),
                feedback: "",
                chatid: result.chatId,
            };
            setMessages((prevMessages) => [...prevMessages, newChatMessage]);
            //setMessages((prevMessages) => [...prevMessages, replyMessage]);

            //setMessages((prevMessages) => [...prevMessages, replyMessage]);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    text: "Error getting response",
                    sender: "bot",
                    time: Date.now(),
                    feedback: "",
                    chatid: 0,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div className="dashboard-content-inner overflow-auto container-fluid">
            <div className="dashboard-headline">
                <div className="row">
                    <div
                        className="col-6"
                        style={{
                            textAlign: "left",
                            paddingLeft: "24px",
                        }}
                    >
                        <h4>{headerText}</h4>

                        {activeError ? (
                            <p
                                style={{
                                    textAlign: "left",
                                    color: "red",
                                }}
                            >
                                Please select AI Model{" "}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="col-1">
                        <a
                            data-tooltip-id="my-tooltip-history"
                            data-tooltip-content="Load Conversations"
                            data-tooltip-place="top"
                            onClick={messageHistory}
                        >
                            <GoHistory
                                style={{ width: "22px", height: "22px", color: "#007bff" }}
                            />
                        </a>
                        <Tooltip id="my-tooltip-history" />
                    </div>
                    <div className="col-1">
                        <div
                            className="calendar-icon"
                            onClick={handleCalendarClick}
                            data-tooltip-id="my-tooltip-daterange"
                            data-tooltip-content="Select Date Range"
                            data-tooltip-place="top"
                        >
                            <FiCalendar
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    color: "#007bff",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                        {showDatePicker && (
                            <div ref={datePickerRef} className="date-range-picker">
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateRangeChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-1">
                        <a
                            data-tooltip-id="my-tooltip-new"
                            data-tooltip-content="New Conversations"
                            data-tooltip-place="top"
                            onClick={clearConversations}
                        >
                            <GrNewWindow
                                style={{ width: "22px", height: "22px", color: "#007bff" }}
                            />
                        </a>
                        <Tooltip id="my-tooltip-new" />
                    </div>

                    <div className="col-3" style={{ minWidth: "230px" }}>
                        <nav id="breadcrumbs" className="dark">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>AI Model</li>
                                <li>{active}</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {/* <div className="col-2" style={{backgroundColor:"white", height:"390px", marginRight:"-10px"}}>

                <input className="form-control" type="text" placeholder='Search' style={{backgroundColor:"#F6F6F6", marginTop:"5px"}}/>
               
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{transform:"translateY(-200%)", float:"right", marginRight:"5px"}} viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
    </div> */}
                    <div className="col-12">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                {showConvertFrom && (
                                    <div className="main-dropdown">
                                        <label>Convert From</label>
                                        <select
                                            value={convertFrom}
                                            onChange={(e) => setConvertFrom(e.target.value)}
                                        >
                                            <option value="java">Java</option>
                                            <option value="python">Python</option>
                                            <option value="c#">C#</option>
                                        </select>
                                    </div>
                                )}

                                <div className="row"></div>
                            </div>
                            {/* <textarea cols="2" rows="1" placeholder="prompt" className="textAreaSize"
                    value={promptCommand}
                    onChange={handlePromptChange}
                    required={phase === 'code generation' || phase === 'user story' || phase === 'explain' || phase === 'bug fix' || phase === 'other' || phase === 'security fix'}
                /> */}
                            <div className="message-content-inner container">
                                {messages.map((msg, index) => (
                                    <MessageBubbleInner
                                        key={index}
                                        id={msg.id}
                                        text={msg.text}
                                        sender={msg.sender}
                                        time={msg.time}
                                        promptEnggType={msg.promptEnggType}
                                        feedback={msg.feedback}
                                        chatid={msg.chatid}
                                    />
                                ))}
                                {isLoading && (
                                    <div className="message-bubble">
                                        <div className="">
                                            <div className="message-avatar">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    color="#007bff"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="36px"
                                                    width="36px"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 0 1-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 0 1-1.5 0V13Z"></path>
                                                    <path d="M8 19.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75Zm.22 1.47a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06 0L12 12.56l2.47 2.47a.75.75 0 0 0 1.06 0l3-3a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L15 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0L9 13.44l-2.47-2.47a.75.75 0 0 0-1.06 0Z"></path>
                                                </svg>
                                            </div>
                                            <div className="message-text">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                )}
                            </div>

                            <div style={{ textAlign: "left" }}>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    id="exampleFormControlTextarea1"
                                    placeholder="Please enter '#' for Programming language, '@' for Phase and Prompt or '/' for Convert serial wise."
                                    style={{ marginTop: "10px", width: "99%" }}
                                    value={promptCommand}
                                    onChange={handleTextAreaChange}
                                />
                                <div className="container">
                                    <div className="row" style={{ marginTop: "-20px" }}>
                                        <div className="col-2">
                                            <button
                                                type="button"
                                                onClick={handleTextAreaChange}
                                                className="btn btn-primary btn-sm inner-btn"
                                            >
                                                #
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleTextAreaChange}
                                                className="btn btn-primary btn-sm inner-btn"
                                            >
                                                @
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleTextAreaChange}
                                                className="btn btn-primary btn-sm inner-btn"
                                            >
                                                /
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleShow}
                                                className="btn btn-primary btn-sm inner-btn"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-paperclip"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                         <div className="col-7" style={{ marginTop: "-50px" }}>
                                            {/**replyText ? (
                                                <>
                                                    <label
                                                        style={{
                                                            width: "95%",
                                                            paddingLeft: "10px",
                                                            height: "50px",
                                                        }}
                                                        className="other"
                                                    >
                                                        {replyText}
                                                    </label>
                                                    <IoCloseSharp
                                                        data-tooltip-id="my-tooltip"
                                                        data-tooltip-content="Close"
                                                        data-tooltip-place="top"
                                                        onClick={() => handleCloseClick({})}
                                                        style={{
                                                            cursor: "pointer",
                                                            float: "right",
                                                            marginTop: "3px",
                                                            marginRight: "10px",
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                ""
                                            )**/}
                                        </div>
                                        <div className="col-3">
                                            <img
                                                src="./sendbutton.png"
                                                onClick={handleSubmit}
                                                style={{
                                                    marginLeft: "10px",
                                                    marginRight: "2%",
                                                    transform: "translateY(-138%)",
                                                    float: "right",
                                                    height: "30px",
                                                }}
                                                alt="Send"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ float: "left" }}>
                                        {error ? (
                                            <p
                                                style={{
                                                    textAlign: "left",
                                                    color: "red",
                                                    marginTop: "-55px",
                                                }}
                                            >
                                                {error}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            float: "right",
                                            width: "32%",
                                            marginRight: "-20%",
                                        }}
                                    >
                                        {selectError ? (
                                            <p
                                                style={{
                                                    textAlign: "right",
                                                    color: "red",
                                                    marginTop: "-55px",
                                                }}
                                            >
                                                Please select Repository{" "}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        backgroundColor: "white",
                                        textAlign: "left",
                                        height: "200px",
                                        overflow: "auto",
                                        marginTop: "-55px",
                                    }}
                                >
                                    {suggestionsArea.length > 0 && (
                                        <ul>
                                            {suggestionsArea.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() =>
                                                        handleTextAreaSuggestionClick(suggestion)
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                        listStyleType: "none",
                                                        padding: "5px",
                                                    }}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* <textarea cols="2" rows="1" placeholder="prompt" className="textAreaSize"
                    value={promptCommand}
                    onChange={handlePromptChange}
                    required={phase === 'code generation' || phase === 'user story' || phase === 'explain' || phase === 'bug fix' || phase === 'other' || phase === 'security fix'}
                />  */}
                                {/* {suggestions?.length > 0 && (
                            <ul className="suggestions-list" ref={suggestionsRef} >
                                {suggestions?.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )} */}
                                {/* <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="reference code"
                  style={{ marginTop: "5px", width: "99%" }}
                  value={referenceCode}
                  onChange={(e) => setReference(e.target.value)}
                  onBlur={handleBlur}
                  required={
                    phase === "unit test" ||
                    phase === "bug fix" ||
                    phase === "docs" ||
                    phase === "xmldocs"
                  }
                /> */}
                                <br />
                                <div></div>
                                <br />
                            </div>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Attach Code/File</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Enter reference code"
                                        style={{ marginTop: "5px", width: "99%" }}
                                        value={referenceCode}
                                        onChange={(e) => setReference(e.target.value)}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Or Upload file</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    smallme: {
        color: "#666",
        fontSize: "12px",
        textAlign: "right",
        marginRight: "100px",
    },
    smallbot: {
        color: "#007bff",
        textAlign: "left",
        marginLeft: "50px",
        fontSize: "12px",
    },
};

export default MainViewCLI;
