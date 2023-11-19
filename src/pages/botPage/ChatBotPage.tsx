import React, { useState } from "react";
import { OpenAIAPIResponse } from "openai";

const apiKey = "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";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 150,
          temperature: 0.7,
          top_p: 1.0,
        }),
      };

      const apiResponse = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        requestOptions
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        setError(errorData.error.message);
        return;
      }

      const data: OpenAIAPIResponse = await apiResponse.json();
      setResponse(data.choices[0].text.trim());
    } catch (error) {
      setError("Error fetching response from OpenAI");
      console.error("Error fetching response from OpenAI:", error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSend}>Send</button>
      </div>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
