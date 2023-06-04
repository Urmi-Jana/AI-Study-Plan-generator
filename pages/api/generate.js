// calling the OpenAI API using serverless funcitons in NextJS

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const basePrompt =
 `
 Act as a coding tutor that creates study plans to help people learn to code. You will be provided with the goal of the student, their time frame and resource preferences. You will prepare a study plan with timelines and rewards and links to resources. Only include relevant resources as time is limited. Include rewards to keep them motivated.
 My first request - 
 `

 //"I want to become a systems programmer but have limited knowledge of low level programming. I can study 10 hours per week and only want video resources. I want to learn to code in Rust. Create a study plan for me"

const generateAction = async(req, res) =>{ //async = wait till the await specified task is complete
    
    console.log(`API input =  ${basePrompt}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({ //async will wait till this is complete
        model: 'text-davinci-003',
        prompt: `${basePrompt}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 1250,
    })

    const baseOutput = baseCompletion.data.choices.pop(); //pop used to get the last response and not a fixed one
    res.status(200).json({output: baseOutput}); //return response
}

export default generateAction;