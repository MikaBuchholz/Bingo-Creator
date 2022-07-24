import { BingoCellProps } from "../../interfaces/interfaces";
import "./BingoCell.css";

export default function BingoCell(props: BingoCellProps) {
  const {
    index,
    value,
    handleInput,
    gridStyle,
    playBingoCallback,
    bingoColors,
  } = props;

  return (
    <div className="cell">
      {gridStyle === "create" ? (
        <textarea
          className="area-style"
          value={value}
          maxLength={28}
          onChange={(e: any) => {
            handleInput(index, e.target.value);
          }}
        ></textarea>
      ) : (
        <div
          className={bingoColors !== null ? bingoColors[index] : "value-div"}
          onClick={() => {
            playBingoCallback(value, index);
          }}
        >
          <div className="value-wrapper">{value}</div>
        </div>
      )}
    </div>
  );
}
