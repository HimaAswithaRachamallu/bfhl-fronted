import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-api-url/bfhl', parsedInput);
      setResponseData(res.data);
    } catch (error) {
      alert('Invalid JSON or error from backend');
      console.error(error);
    }
  };

  const renderResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    return (
      <div className="response-container">
        {selectedOptions.map((option) => (
          <div key={option.value}>
            <h3>{option.label}:</h3>
            <p>{responseData[option.value].length > 0 ? responseData[option.value].join(', ') : 'No data available'}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here...'
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            className="select-dropdown"
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
