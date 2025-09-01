// File: netlify/functions/ask-chatbot.js

exports.handler = async function (event) {
  // 1. Get the user's message from the request
  const { messages } = JSON.parse(event.body);

  // 2. Get your secret API key from a secure environment variable
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // 3. The URL for the Gemini API
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

  // 4. The data to send to the Gemini API
  const payload = {
    contents: messages,
    // Add any other system instructions or settings here
  };

  try {
    // 5. Call the Gemini API from your server
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return { statusCode: 500, body: "Error from Gemini API" };
    }

    const result = await response.json();
    
    // 6. Send the AI's response back to the user's browser
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};