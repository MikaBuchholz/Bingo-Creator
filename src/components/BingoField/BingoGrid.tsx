import BingoCell from "../BingoCell/BingoCell";
import { BingoGridProps } from "../../interfaces/interfaces";

export default function BingoGrid(props: BingoGridProps) {
  const {
    activeSize,
    handleInput,
    bingoField,
    gridStyle,
    playBingoCallback,
    bingoColors,
  } = props;

  return (
    <>
      <div className="grid-wrapper">
        <div
          className="bingo-grid"
          style={{
            gridTemplateColumns: `repeat(${activeSize}, 1fr)`,
            gridTemplateRows: `repeat(${activeSize}, 1fr)`,
          }}
        >
          {bingoField.map((cell: string, index: number) => (
            <BingoCell
              key={index}
              index={index}
              value={cell}
              handleInput={handleInput}
              gridStyle={gridStyle}
              playBingoCallback={playBingoCallback}
              bingoColors={bingoColors}
            />
          ))}
        </div>
      </div>
    </>
  );
}
