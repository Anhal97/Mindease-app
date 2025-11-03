/*
* This is a new "helper" function.
* Its only job is to read your secure Firebase keys from the
* Netlify environment variables and send them to your website
* so it knows which Firebase project to connect to.
*/
exports.handler = async function (event) {
  try {
    // Read the keys from the secure environment
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };

    // Check if the keys were found
    if (!config.apiKey || !config.authDomain || !config.projectId) {
      throw new Error("Firebase environment variables are not set.");
    }

    // Send the configuration to the website
    return {
      statusCode: 200,
      body: JSON.stringify(config),
    };

  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
