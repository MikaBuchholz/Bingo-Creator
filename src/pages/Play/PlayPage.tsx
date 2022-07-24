import { PlayPageProps } from "../../interfaces/interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import BingoGrid from "../../components/BingoField/BingoGrid";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { preCompute3x3, preCompute4x4, preCompute5x5 } from "./PossibleWins";
import Confetti from "react-confetti";
import {
  uploadSharedGameToFirestore,
  queryFirestore,
} from "../../firebase/FirestoreFunctions";
import "./PlayPage.css";

export default function PlayPage(props: PlayPageProps) {
  const { id } = useParams();
  const navigation = useNavigate();
  const inititalState = {
    bingoField: [],
    activeSize: 0,
  };
  const [bingoGridData, setBingoGridData] = useState<{
    bingoField: string[];
    activeSize: number;
  }>(inititalState);
  const [hasQueryParams, setHasQueryParams] = useState(true);
  const [gameIdInput, setGameIdInput] = useState("");
  const [docExists, setDocExists] = useState(true);
  const [bingoColors, setBingoColors] = useState(Array(10).fill("value-div"));
  const [pTag, setPTag] = useState("p-tag");
  const [creator, setCreator] = useState("");
  const [bingoWon, setBingoWon] = useState(false);
  const [buttonText, setButtonText] = useState("Generate share link");
  const [shareUrl, setShareUrl] = useState("");
  const [successfullyPublished, setSuccessfullyPublished] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy link");
  const inputRef = useRef<any>();

  const shuffle = (array: string[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const playBingoCallback = (value: string, index: number) => {
    setBingoColors((prevState) => {
      const newState = [...prevState];
      if (newState[index].includes("green")) {
        newState[index] = "value-div";
      } else {
        newState[index] = "value-div green";
      }

      return newState;
    });
    //isBingoWon();
  };

  const getActivePreComputation = (size: number) => {
    switch (size) {
      case 3:
        return preCompute3x3;
      case 4:
        return preCompute4x4;
      case 5:
        return preCompute5x5;
      default:
        return [];
    }
  };

  const isBingoWon = () => {
    const colorsToValues = bingoColors.map((color) => {
      if (color.includes("green")) {
        return 1;
      } else {
        return 0;
      }
    });

    const sum = colorsToValues.reduce((a: number, b: number) => a + b, 0);
    const targetValue = bingoGridData.activeSize;

    if (sum >= targetValue) {
      const activePreComputation = getActivePreComputation(
        bingoGridData.activeSize
      );

      const isWon = activePreComputation
        .map((preComputation) => {
          let sum = preComputation
            .map((gridIndex) => colorsToValues[gridIndex])
            .reduce((a: number, b: number) => a + b, 0);

          return sum === targetValue;
        })
        .some((isWon) => isWon);

      return isWon;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setBingoWon(isBingoWon());
  }, [bingoColors]);

  useEffect(() => {
    if (bingoGridData.activeSize !== 0) {
      setBingoColors(
        Array(bingoGridData.activeSize * bingoGridData.activeSize).fill(
          "value-div"
        )
      );
    }
  }, [bingoGridData]);

  const queryFirestoreWrapper = async (gameId: string) => {
    const queryResult = await queryFirestore(gameId);
    if (queryResult) {
      let bingoData = queryResult;
      setCreator(bingoData.creator);

      setDocExists(true);

      setBingoGridData({
        bingoField: shuffle(bingoData.bingo),
        activeSize: bingoData.activeSize,
      });

      if (!hasQueryParams) {
        navigation(`/play/${gameIdInput}`);
      }
    } else {
      setDocExists(false);

      setPTag("p-tag-2");
      setGameIdInput("");
      setTimeout(() => {
        setPTag("p-tag");
      }, 300);
    }
  };

  useEffect(() => {
    if (id !== undefined && bingoGridData === inititalState) {
      setHasQueryParams(true);
      queryFirestoreWrapper(id);
    } else if (id === undefined) {
      setHasQueryParams(false);
    }
  }, [id]);

  if (!getAuth().currentUser) {
    navigation("/login");
  }

  return (
    <>
      {bingoWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          run={bingoWon}
          tweenDuration={10000}
          recycle={false}
        />
      )}
      <div>
        {!bingoWon ? (
          <BingoGrid
            activeSize={bingoGridData.activeSize}
            bingoField={bingoGridData.bingoField}
            handleInput={() => {}}
            gridStyle="play"
            playBingoCallback={playBingoCallback}
            bingoColors={bingoColors}
          />
        ) : (
          <>
            <div className="bingo-wrapper">
              <div className="bingo-title animation-1">You got a Bingo 🥳</div>
            </div>
            <div className="bingo-wrapper">
              <div className="info-container animation-2">
                <h1 className="share">Share your win</h1>

                <div className="bingo-wrapper animation-3">
                  <button
                    className="share-button"
                    onClick={() => {
                      if (!successfullyPublished) {
                        setButtonText("Generating link...");
                        const localId = crypto.randomUUID().slice(0, 10);

                        uploadSharedGameToFirestore(
                          id ?? gameIdInput,
                          bingoGridData.bingoField,
                          bingoGridData.activeSize,
                          creator,
                          bingoColors,
                          localId
                        );
                        setShareUrl(
                          `${window.location.origin}/share/${localId}`
                        );
                        setButtonText("Share link generated");
                        setSuccessfullyPublished(true);
                      }
                    }}
                  >
                    {buttonText}
                  </button>
                </div>
                {shareUrl.length > 0 && (
                  <div className="bingo-wrapper">
                    <a className="my-anchor" href={shareUrl}>
                      {shareUrl}
                    </a>
                  </div>
                )}
                {successfullyPublished && (
                  <div className="bingo-wrapper">
                    <button
                      className="share-button font-custom"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        setCopyButtonText("Copied!");
                      }}
                    >
                      {copyButtonText}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bingo-wrapper">
              <button
                className="share-button animation-3 playing-button"
                onClick={() => {
                  setBingoWon(false);
                  setButtonText("Generate share link");
                  setSuccessfullyPublished(false);
                  setShareUrl("");
                  setCopyButtonText("Copy link");
                }}
              >
                Keep Playing
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        {creator.length > 0 && !bingoWon ? (
          <p className="creator-tag">Created by {creator}</p>
        ) : null}
        {!bingoWon ? (
          <div className="input-container-wrapper">
            <div className="input-container">
              <button
                className="play-button"
                onClick={() => {
                  setBingoColors(
                    Array(
                      bingoGridData.activeSize * bingoGridData.activeSize
                    ).fill("value-div")
                  );
                  setGameIdInput("");
                  if (gameIdInput.length > 0) {
                    inputRef.current?.focus();
                  }
                }}
              >
                Reset
              </button>
              <input
                className="search-input"
                placeholder="Enter a game ID..."
                ref={inputRef}
                value={gameIdInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setGameIdInput(e.target.value.replace(/\s/g, ""));
                }}
              />
              <button
                className="play-button"
                onClick={() => {
                  if (gameIdInput.length > 0 && gameIdInput !== id) {
                    queryFirestoreWrapper(gameIdInput);
                  }
                }}
              >
                Play!
              </button>
            </div>
            {!docExists && (
              <div className="p-wrapper">
                <p className={pTag}>Game ID does not exist</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
