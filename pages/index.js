import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

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
  
  const setUserChangedInput = (event) =>{
    console.log(JSON.stringify({userInput}));
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
          placeholder='insert prompt here' 
          value={userInput}
          onChange={setUserChangedInput}
          />
        </div>
        <div className='prompt-buttons'>
          <a className='generate-button' onClick={callGenerate}>
            <div className='generate'>
              <p>Generate</p>
            </div>
          </a>          
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
