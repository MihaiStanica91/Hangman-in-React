import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Hangman from './Hangman'


function WordInput({addNewWord, currWord}) {

    const [word, setWord] = useState('');

    function addWord(e) {
        addNewWord(word);
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={(e) => {addWord(e); setWord('')}}>
            <label>
                Word:
                <input style={{marginLeft: "5px"}} type="text" value={word} onChange={(e) => {setWord(e.target.value)}} />
            </label>
                <button className="btn-outline-primary" style={{marginLeft: "5px"}} type="submit">Play!</button>
            </form>
            <div className="Hangman">
                {<Hangman guessWord = {currWord} setWord={setWord} initialWord={addNewWord}/>}
            </div>
        </div>
    );
}

export default WordInput;
