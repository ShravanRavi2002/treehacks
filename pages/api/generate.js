import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  console.log(req.body);
  const resume = req.body || '';
  if (resume.name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a name",
      }
    });

    return;
  }
  if (resume.email.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter an email",
      }
    });
    return;
  }
  if (resume.skills.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter some skills. E.g. Languages, technical skills, etc.",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(resume),
      temperature: 0.6,
      max_tokens: 300,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(resume) {
  
  var d = JSON.stringify(resume)
  console.log(d)
  var info = d.substring(1, resume.length - 1)
  console.log(info)
  return `Write a latex resume with the following information. ${d}` ;
}