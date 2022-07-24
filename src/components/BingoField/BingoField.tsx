import { useState, useEffect } from "react";
import { publishToFirestore } from "../../firebase/FirestoreFunctions";
import BingoGrid from "./BingoGrid";
import { BingoFieldProps } from "../../interfaces/interfaces";
import "./BingoField.css";

export default function BingoField(props: BingoFieldProps) {
  const { user } = props;

  const sizeOptions = [
    { label: "3x3", value: 3 },
    { label: "4x4", value: 4 },
    { label: "5x5", value: 5 },
  ];

  const [activeSize, setActiveSize] = useState(3);

  const [bingoField, setBingoField] = useState(
    Array(activeSize * activeSize).fill("0")
  );

  const [confirmPublish, setConfirmPublish] = useState(false);
  const [isPusblished, setIsPublished] = useState(false);
  const [url, setUrl] = useState("");
  const [buttonText, setButtonText] = useState("Copy URL");
  const [copyButtonText, setCopyButtonText] = useState("Copy ID");
  const [generatedId, setGeneratedId] = useState("");

  const handleInput = (index: number, value: string) => {
    setBingoField((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const publishToFirestoreWrapper = () => {
    const id = crypto.randomUUID().slice(0, 10);
    publishToFirestore(id, bingoField, activeSize);

    setUrl(`${window.location.origin}/play/${id}`);
    setIsPublished(true);
    setGeneratedId(id);
  };

  useEffect(() => {
    setBingoField(Array(activeSize * activeSize).fill(""));
  }, [activeSize]);
  return (
    <div>
      {!isPusblished ? (
        <>
          <div className="select-wrapper">
            <select
              onChange={(e: any) => {
                setActiveSize(Number(e.target.value));
              }}
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <BingoGrid
            activeSize={activeSize}
            handleInput={handleInput}
            bingoField={bingoField}
            gridStyle="create"
            playBingoCallback={() => {}}
            bingoColors={null}
          />
          <div className="button-wrapper">
            {!confirmPublish ? (
              <button
                className="publish-button"
                onClick={() => {
                  if (bingoField.every((cell) => cell !== "")) {
                    setConfirmPublish(true);
                  }
                }}
              >
                Publish
              </button>
            ) : (
              <button
                className="publish-button"
                onClick={publishToFirestoreWrapper}
              >
                Confirm
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="post-wrapper">
            <div className="post-publish">
              <p>Bingo can be played at:</p>

              <a className="url" href={url}>
                {url}
              </a>
            </div>
          </div>
          <div className="copy-wrapper">
            <button
              className="publish-button"
              onClick={() => {
                navigator.clipboard.writeText(url);
                setButtonText("Copied!");
              }}
            >
              {buttonText}
            </button>
            <button
              className="publish-button"
              onClick={() => {
                navigator.clipboard.writeText(generatedId);
                setCopyButtonText("Copied!");
              }}
            >
              {copyButtonText}
            </button>
          </div>
          <div className="copy-wrapper">
            <button
              className="publish-button color"
              onClick={() => {
                setIsPublished(false);
              }}
            >
              Create More
            </button>
          </div>
        </>
      )}
    </div>
  );
}
