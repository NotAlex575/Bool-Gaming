import { useState } from "react";

function SearchBar({ onSearch }) {
  const [question, setQuestion] = useState("");

  const handleChange = (event) => {

    setQuestion(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Cerca videogiochi..."
      value={question}
      onChange={handleChange}
      className="form-control"
    />
  );
}

export default SearchBar;