import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

export const FlashCards = (props) => {
    let front = useRef(null);
    let back = useRef(null);
    let flashCard = useRef(null);
    console.log(props.background);
    console.log(props.currentDeck);
    console.log(props.currentCard);
    console.log(props.data);
    console.log(props.category);
    const flipCard = (() => {
        flashCard.current.classList.toggle('active');
    })
    let flashInner = useRef(null);
    useEffect(() => {
        if(props.currentCard == -1) {
            front.current.style.backgroundColor = "";
            back.current.style.backgroundColor = "";
        }else {
        front.current.style.backgroundColor = props.background;
        back.current.style.backgroundColor = props.background;
        }
    },[props.background])
    useEffect(() => {
        flashCard.current.classList.remove('active');
    },[props.currentCard, props.currentDeck])
  return (
    <div className="flash-card" ref={flashCard} onClick={flipCard}>
        <div className="flash-inner" ref={flashInner}>
            <div className="flash-front" ref={front}>
                {props.currentCard !== -1 && <p>What is the capital of</p> }
                <h2>{props.data["country"] || `Start`}</h2>
                {props.currentCard !== -1 && <img src={props.data["flag"]} width={"50px"} height="50px" alt={props.data["country"]} />}
            </div>
            <div className="flash-back" ref={back}>
                <h2>{props.data["capital"] || "Click the next button to start learning"}</h2>
            </div>
        </div>
    </div>
  )
}

FlashCards.defaultProps = {
    current: -1,
    currentDeck: "",
    data: {},
    background: "beige",
    category: []
}

FlashCards.propTypes = {
    currentCard: PropTypes.number.isRequired,
    currentDeck: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    background: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired
}
