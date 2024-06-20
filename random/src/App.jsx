import React, { useState } from "react";
import "./App.css";

export default function Comments() {
  const initialState = {
    numbers: false,
    upperCaseLetters: false,
    lowerCaseLetters: false,
  };
  const [checkBox, setCheckBoxState] = useState(initialState);

  const initialStrings = {
    stringQuantity: 0,
    stringLength: 0,
  };
  const [strings, setStrings] = useState(initialStrings);

  const [resultStrings, setResultStrings] = useState([]);

  function randomStringGenerator() {
    let chars = "";
    const numbers = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    if (checkBox.numbers) {
      chars += numbers;
    }
    if (checkBox.upperCaseLetters) {
      chars += upperCaseLetters;
    }
    if (checkBox.lowerCaseLetters) {
      chars += lowerCaseLetters;
    }

    let result = "";
    for (let i = 0; i < strings.stringLength; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  function numberStringGenerator() {
    let myStrings = [];
    for (let i = 0; i < strings.stringQuantity; i++) {
      myStrings.push(randomStringGenerator());
    }
    
    return myStrings;
  }

  return (
    <>
      <h1>Random String Generator</h1>
      <div>
        Let's generate
        <Input
          placeholder={"enter number 1-10"}
          max={10}
          value={strings.stringQuantity}
          onChange={(quantity) =>
            setStrings({ ...strings, stringQuantity: quantity })
          }
        />
        random string (max is 10)
      </div>

      <div>
        Each string should be
        <Input
          placeholder={"enter number 5-15"}
          max={15}
          value={strings.stringLength}
          onChange={(length) =>
            setStrings({ ...strings, stringLength: length })
          }
        />
        characters long (max is 15)
      </div>

      <br />
      <legend>Choose your string's characters:</legend>
      <div>
        <input
          type="checkbox"
          id="numbers"
          name="character"
          value={checkBox.numbers}
          onChange={(e) => 
            setCheckBoxState({ ...checkBox, numbers: e.target.checked })
          }
        />
        <label htmlFor="numbers">Numbers</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="upperCaseLetters"
          name="character"
          value={checkBox.upperCaseLetters}
          onChange={(e) =>
            setCheckBoxState({ ...checkBox, upperCaseLetters: e.target.checked })
          }
        />
        <label htmlFor="upperCaseLetters">UpperCaseLetters</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="lowerCaseLetters"
          name="character"
          value={checkBox.lowerCaseLetters}
          onChange={(e) =>
            setCheckBoxState({ ...checkBox, lowerCaseLetters: e.target.checked })
          }
        />
        <label htmlFor="lowerCaseLetters">LowerCaseLetters</label>
      </div>
      <br />
      <button onClick={() => { setResultStrings(numberStringGenerator());}}>Go!</button>
<br />

<ul>
        {resultStrings.map((result, index) => {
          return (
            <li key={index}>
              <div>{result}</div>
            </li>
          );
        })}
      </ul>
      </>
  )
}

function Input({ value, placeholder, onChange, max }) {
  return (
    <input
      className="inputs"
      type="number"
      min={1}
      max={max}
      placeholder={placeholder}
      width={50}
      value={value}
      onChange={(event) => {
        onChange(+event.target.value);
      }}
    />
  );
}
