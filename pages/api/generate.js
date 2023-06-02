// calling the OpenAI API using serverless funcitons in NextJS

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const basePrompt = ""
const generateAction = async(req, res) =>{ //async = wait till the await specified task is complete
    
    console.log(`API input =  ${basePrompt}${req.body.userInput}`);

    const baseCompletion = await openai.completion({ //async will wait till this is complete
        model: 'text-davinci-003',
        prompt: `${basePrompt}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    })

    const baseOutput = baseCompletion.data.choices.pop(); //pop used to get the last response and not a fixed one
    res.status(200).json({output: baseOutput}); //return response
}

export default generateAction;