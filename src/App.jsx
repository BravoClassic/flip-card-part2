import "./App.css";
import { FlashCards } from "./components/FlashCards";
import { useEffect, useRef, useState } from "react";
import { d, colors } from "./data.js";
import { Button } from "./components/Button";

function App() {
  const [currentCard, setCurrentCard] = useState(-1);
  const [currentDeck, setCurrentDeck] = useState("Europe");
  const keys = Object.keys(d);
  const [shuffled, setShuffled] = useState([...d[currentDeck]]); // [1,2,3,4,5,6,7,8,9,10
  const [data, setData] = useState([...d[currentDeck]]); // [1,2,3,4,5,6,7,8,9,10
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const guess = useRef(null);
  const prev = useRef(null);
  const next = useRef(null);

  const changeDeck = (e) => {
    setCurrentDeck(keys[e.target.value]);
    setCurrentCard(0);
  };
  const nextCard = () => {
    setCurrentCard((prev) => prev + 1);
    if (currentCard >= data.length - 1) {
      return;
    }
  };

  const shuffleCards = () => {
    // console.log("Shuffle Cards");
    let currentIndex = shuffled.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }
    setShuffled(shuffled);
    setData(shuffled);
    setCurrentCard(0);
    console.log(data);
  };

  const previousCard = () => {
    console.log("Previous Card");
    if (currentCard <= -1) {
      return;
    } else if (currentCard <= 0) {
      prev.current.disabled = true;
    }
    setCurrentCard((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentCard >= data.length - 1) {
      next.current.disabled = true;
    } else {
      next.current.disabled = false;
    }
    if (currentCard <= -1) {
      prev.current.disabled = true;
    } else {
      prev.current.disabled = false;
    }
  }, [currentCard]);

  useEffect(() => {
    setShuffled([...d[currentDeck]]);
    setData([...d[currentDeck]]);
  }
  , [currentDeck]);
  const levenshteindistance = (guess, word) => {
    let distance = [];
    for (let i = 0; i <= guess.length; i++) {
      distance[i] = [i];
    }
    for (let j = 0; j <= word.length; j++) {
      distance[0][j] = j;
    }
    for (let i = 1; i <= guess.length; i++) {
      for (let j = 1; j <= word.length; j++) {
        distance[i][j] = Math.min(
          distance[i - 1][j - 1] + (guess[i - 1] == word[j - 1] ? 0 : 1),
          distance[i - 1][j] + 1,
          distance[i][j - 1] + 1
        );
      }
    }
    return distance[guess.length][word.length];
  };
  const userScore = (e) => {
    e.preventDefault();
    console.log("User Score");
    if (guess.current.value === "") {
      return;
    }
    let similarity = levenshteindistance(
      guess.current.value,
      data[currentCard].capital
    );

    console.log(similarity);
    
    if (guess.current.value === data[currentCard].capital) {
      setScore(score + 1);
      if (guess.current.classList.contains("wrong")) {
        guess.current.classList.remove("wrong");
      }
      if (!guess.current.classList.contains("correct")) {
        guess.current.classList.add("correct");
      }
    } else {
      if (similarity <= 2) {
        setScore(score + 1);
        if (guess.current.classList.contains("wrong")) {
          guess.current.classList.remove("wrong");
        }
        if (!guess.current.classList.contains("correct")) {
          guess.current.classList.add("correct");
        }
      } else {
        if (guess.current.classList.contains("correct")) {
          guess.current.classList.remove("correct");
        }
        if (!guess.current.classList.contains("wrong")) {
          guess.current.classList.add("wrong");
          setStreak(Math.max(score, streak));
          setScore(0);
        }
      }
    }
  };

  return (
    <>
      <h1>FlashCards - Learning Geography </h1>
      <p>Learn countries and their capitals through these flash cards</p>
      <p>
        Number of Contients: {keys.length} | Current Continent: {currentDeck} |
        Number of Cards for each Contient: {data.length}
      </p>
      <p>
        Score: {score} | Streak: {streak}
      </p>
      <FlashCards
        catergory={keys}
        data={data[currentCard]}
        background={colors[currentDeck]}
        currentDeck={currentDeck}
        currentCard={currentCard}
      />
      <div>
        <form>
          <input type="text" ref={guess} placeholder="Submit Guess" />
          <button onClick={userScore}>Submit</button>
        </form>
        <button ref={prev} onClick={previousCard}>
          Previous
        </button>
        <button ref={next} onClick={nextCard}>
          Next
        </button>
        <button onClick={shuffleCards}>Shuffle Cards</button>
      </div>
      <div>
        <h3>Select a Contient</h3>
        {keys.map((item, key) => {
          return (
            <Button changeDeck={changeDeck} key={key} value={key} name={item} />
          );
        })}
      </div>
    </>
  );
}
export default App;
