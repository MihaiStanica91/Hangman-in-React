import React, {useState, useEffect, useCallback, useRef} from 'react';

function Hangman({guessWord, setWord, initialWord}) {

    const [wordForGuess, setWordForGuess] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [gameOver, setGameOver] = useState('');
    const [disable, setDisable] = useState([]);
    const didMountRef = useRef(false);
    
    const maxWrong = 6;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    function generateButtons() {
        return alphabet.split("").map(letter => (
          <button
            className='btn btn-md btn-primary m-2'
            key={letter}
            value={letter}
            onClick={(e) => {handleGuess(e); setDisable(disable => [...disable, letter])}}
            disabled={disable.includes(letter) || !guessWord}
          >
            {letter}
          </button>
        ));
    }

    function handleGuess(e) {
        let letter = e.target.value;
        if(guessWord.includes(letter) && !(wordForGuess.includes(letter))) {
            setWordForGuess(wordForGuess => [...wordForGuess, letter]);

        } else if(!(guessWord.includes(letter))) {
            setMistakes(mistakes + 1);
        }
    }

    const emptyWord = useCallback(() => {
        return guessWord.split("").map(letter => (wordForGuess.includes(letter) ? letter : " _ "));
    }, [wordForGuess, guessWord]);

    useEffect(function isWon() {
        if(emptyWord().join("") === guessWord && didMountRef.current) {
            setGameOver('You won! Press Restart to play again!');
            setDisable(alphabet.split("").join(", "));
        }

        didMountRef.current = true;
        
        return() => {
            setGameOver('');
        }
    }, [emptyWord, didMountRef, guessWord]);

    useEffect(function isGameOver() {
        if(mistakes === maxWrong) {
            setGameOver('You lost! The word was: ' + guessWord + '. Press Restart to play again!');
            setDisable(alphabet.split("").join(", "));
        }
    }, [mistakes, guessWord]);
    
    function resetButton() {
        setGameOver('');
        setMistakes(0);
        setWordForGuess('');
        setWord('');
        initialWord('');
        setDisable([]);
        didMountRef.current = false;
    }

    return(
        <div>
            <div className="EmptyWord">
                {emptyWord()}
            </div>
            <div className="Alphabet">
                {generateButtons()}
            </div>
            <div className="Mistakes">
                Mistakes: {mistakes} of {maxWrong}
            </div>
            <div className="GameOver">
                {gameOver}
            </div>
            <button className="btn btn-md btn-danger m-2" onClick={resetButton}>Restart!</button>
        </div>
    );
}

export default Hangman;