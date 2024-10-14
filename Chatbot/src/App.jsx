import { useState } from 'react'
import './App.css'
import { FaCode } from "react-icons/fa6";
import { SiSolidity } from "react-icons/si";
import { RiPlanetLine } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";



function App() {
  const [message, setMessage] = useState("")
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState(null);
  let allMessages = [];

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
    else {
      alert("You must ask something");
    }
  };
  const generateResponse = async (msg) => {
    console.log(messages, allMessages);
    const genAI = new GoogleGenerativeAI('AIzaSyCVxCKKnHzfWSBROCUMtmsFvptNvbn81hA');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    allMessages.push({
      type: "userMsg",
      text: msg,
    },
      {
        type: "responseMsg",
        text: result.response.text(),
      }
    );
    setMessages(allMessages);
    setisResponseScreen(true);
    setMessage("");
    console.log(result.response.text());
  };

  const newChat =()=> {
    setisResponseScreen(false);
    setMessages([]);
  }


  return (
    <>
      <div className="container w-screen min-h-screen overflow-x-hidden bg-gradient-to-t bg-orange-400  from-green-300 text-white">
        {
          isResponseScreen ?
            <div className='h-[80vh]'>
              <div className="header flex items-center justify-between w-[100vw] px-[300px]">
                <h2 className='text-2xl m-5 bg-gradient-to-t to-blue-400 from bg-purple-300 p-3 rounded-md shadow-lg'> SAHAYAK KENDRA</h2>
                <button id='newChatBtn' className='bg-gradient-to-t to-blue-300 from via-violet-400 px-5 py-2 rounded-lg cursor-pointer m-5 ' onClick={newChat}>New Chat</button>
              </div>
              <div className="messages">
                {
                  messages ?.map((msg, index) => {
                    return(
                      <div  key={index} className ={msg.type}>{msg.text} </div>
                    )
                  })
                }
                {/*<div className="userMsg">what is html stand for</div>
                <div className="responseMsg">hyper textmarkup language</div>*/}
              </div>
            </div>
            : <div className='middle h-[80vh] flex items-center flex-col justify-center'>
              <h1 className='text-4xl bg-gradient-to-t to-blue-300 from-violet-400 p-4 rounded-xl'>SAHAYAK KENDRA</h1>
              <div className='boxes mt-[30px] flex items-center gap-2'>
                <div className='Card rounded-lg cursor-pointer transition-all hover:bg-gray-600 px-[20px] relative min-h-[20vh] bg-gray-700 p-[10px]'>
                  <p className='text-[18px]' style={{ lineHeight: 1 }}>what is Coding ? <br />
                    How we can learn it...
                  </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><FaCode /></i>
                </div>
                <div className='Card rounded-lg cursor-pointer transition-all hover:bg-gray-600 px-[20px] relative min-h-[20vh] bg-gray-700 p-[10px]'>
                  <p className='text-[18px]' style={{ lineHeight: 1 }}>which is the red <br />
                    planet In our <br />
                    solar system ?
                  </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><RiPlanetLine /></i>
                </div>
                <div className='Card rounded-lg cursor-pointer transition-all hover:bg-gray-600 px-[20px] relative min-h-[20vh] bg-gray-700 p-[10px]'>
                  <p className='text-[18px]' style={{ lineHeight: 1 }}>In which year<br />
                    solidity language <br />
                    is Invented ?
                  </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><SiSolidity /></i>
                </div>
                <div className='Card rounded-lg cursor-pointer transition-all hover:bg-gray-600 px-[20px] relative min-h-[20vh] bg-gray-700 p-[10px]'>
                  <p className='text-[18px]' style={{ lineHeight: 1 }}>How can we use<br />
                    Ai for development ?
                  </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><FaBrain /></i>
                </div>
              </div>
            </div>
        }

        <div className="bottom w-[100%] flex-col flex items-center absolute bottom-0 bg-opacity-30 p-8 rounded-lg backdrop-blur-md ">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px] m-2 ">
            <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='search-bar p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' placeholder='write message here....' id='messageBox' />
            {
              message == "" ? "" : <i className='search-btn text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
            }
          </div>

          <p className=' text-2xl text-gray-700  rounded-md p-3' >Sahayak Kendra is developed by Shailesh Kumar Maurya </p>
        </div>
      </div>
    </>
  )
}

export default App
