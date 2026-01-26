import { useEffect, useState } from "react";

function TestAPI() {
  const [message, setMessage] = useState("...Loading...");

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:3001/api/hello");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to backend");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Test API Result</h2>
      <p>Message: {message}</p>
    </div>
  );
}

export default TestAPI;
