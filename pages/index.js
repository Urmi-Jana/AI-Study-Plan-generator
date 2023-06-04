import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  //generate action function

  const callGenerate = async() => {
    setIsGenerating(true);
    
    console.log("API calling prompt");

    const res = await fetch("/api/generate", { //fetch from the file
      method: 'POST', //specified in API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userInput}), //what is being sent through the req
    });

    const data = await res.json();
    const { output } = data;
    console.log("Output = ", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  //capture changed input
  
  const setUserChangedInput = (event) =>{
    // console.log(JSON.stringify({userInput}));
    setUserInput(event.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Build Customized Study Plans</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write down the topic you want to study and all your specifications (ex. Hours per week, level of current knowledge, etc.</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea
          name="postContent"
          className='prompt-box' 
          placeholder='I want to become a systems programmer but have limited knowledge of low level programming. I can study 10 hours per week and only want video resources. I want to learn to code in Rust. Create a study plan for me' 
          value={userInput}
          onChange={setUserChangedInput}
          />
        </div>
        <div className='prompt-buttons'>
          <a
           className={isGenerating? 'generate-button loading': 'generate-button'}
           onClick={callGenerate}
          >
            <div className='generate'>
            {isGenerating ? <span className="loader"></span> :<p>Generate</p>}
            </div>
          </a>          
        </div>
      </div>
      {apiOutput &&
      (<div className='output'>
        <div className="output-header-container">
          <div className='output-header'>
            <h3>Output</h3>
          </div>
        </div>
        <div className="output-content">
          <p>{apiOutput}</p>
        </div>
      </div>)}
      
    </div>
  );
};

export default Home;
