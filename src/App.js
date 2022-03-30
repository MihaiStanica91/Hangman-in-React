import React, {useState} from 'react';
import WordInput from "./components/WordInput"

function App() {
  
  const [word, setWord] = useState('');

  return (
    <div className="App">
      <h1 className="Title">Hangman</h1>
      <div>
        {<WordInput addNewWord = {setWord} currWord = {word}/>}
      </div>
    </div>
  );
}

export default App;
