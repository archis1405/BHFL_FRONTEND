import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const API_URL = "https://bhfl-backend-p4q9.onrender.com/bfhl"; 

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Dropdown options
  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  // Handle JSON input change
  const handleChange = (event) => {
    setJsonInput(event.target.value);
  };

  // Validate JSON and send API request
  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. 'data' should be an array.");
      }

      const response = await axios.post(API_URL, parsedInput);
      setResponseData(response.data);
    } catch (error) {
      alert("Invalid JSON format or API Error: " + error.message);
    }
  };

  // Render selected response fields
  const getFilteredData = () => {
    if (!responseData) return null;

    return selectedOptions.map((option) => (
      <p key={option.value}>
        <strong>{option.label}:</strong> {JSON.stringify(responseData[option.value])}
      </p>
    ));
  };

  return (
    <div className="container">
      <h1>Data Processing App</h1>
      
      {/* JSON Input Field */}
      <textarea
        rows="5"
        placeholder='Enter JSON (e.g. {"data": ["A", "1", "B"]})'
        value={jsonInput}
        onChange={handleChange}
      />
      
      <button onClick={handleSubmit}>Submit</button>

      {/* Multi-Select Dropdown */}
      {responseData && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedOptions}
            placeholder="Select data to display"
          />
          <div className="response-container">{getFilteredData()}</div>
        </>
      )}
    </div>
  );
}

export default App;
