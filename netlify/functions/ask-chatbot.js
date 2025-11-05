/*
* This is the UPDATED chatbot helper.
* It's simpler and takes the full conversation payload
* from the website and passes it securely to the Gemini API.
*/
exports.handler = async function (event) {
  // 1. Get the payload (body) from the website's request
  const body = JSON.parse(event.body);

  // 2. Get your secret API key
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // 3. The URL for the Gemini API
  // NOTE: Using a slightly more recent model version
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

  try {
    // 4. Call the Gemini API, passing along the *entire* payload
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body) // Pass the client's payload directly
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Gemini API Error:", errorBody);
      return { statusCode: 500, body: JSON.stringify(errorBody) };
    }

    const result = await response.json();
    
    // 5. Send the AI's response back to the user's browser
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error("Serverless Function Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
