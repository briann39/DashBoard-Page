import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function openaiCall(message) {
  console.log(message);
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: message,
  });
  console.log(response);
  return response.choices[0].message.content;
}
