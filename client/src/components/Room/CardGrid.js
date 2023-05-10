import React from "react";
import "./CardGrid.css";
import PersonImg from '../../assests/personIcon.png'

function CardGrid() {
  const cards = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6", "Card 7", "Card 8", "Card 9", "Card 10","Card 11", "Card 12", "Card 13", "Card 14", "Card 15", "Card 16", "Card 17", "Card 18"];

  const getCardsPerRow = () => {
   if (window.innerWidth >= 1024) {
      return 4;
    }else if (window.innerWidth >= 768) {
      return 3;
    }
     else {
      return 2;
    }
  };

  const [cardsPerRow, setCardsPerRow] = React.useState(getCardsPerRow());

  React.useEffect(() => {
    const handleResize = () => setCardsPerRow(getCardsPerRow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardRows = () => {
    const rows = [];
    const numCards = cards.length;
    const numRows = Math.ceil(numCards / cardsPerRow);
    for (let i = 0; i < numRows; i++) {
      const startIndex = i * cardsPerRow;
      const endIndex = startIndex + cardsPerRow;
      const rowCards = cards.slice(startIndex, endIndex);
      rows.push(
        <div className="card-row" key={i}>
              {rowCards.map((card) => (
            <div className="card" key={card}>
              {/* {card} */}
              <img className="personIcon" src={PersonImg}></img>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return <div className="card-grid">{getCardRows()}</div>;
}

export default CardGrid;