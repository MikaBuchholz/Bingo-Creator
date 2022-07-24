import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BingoGrid from "../../components/BingoField/BingoGrid";
import { queryFirestoreShare } from "../../firebase/FirestoreFunctions";
import "./SharePage.css";

export default function SharePage() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [bingoGridData, setBingoGridData] = useState<{
    activeSize: number;
    bingo: string[];
    color: string[];
    createdby: string;
    whoShared: string;
    gameId: string;
    docExists: boolean;
  }>({
    activeSize: 0,
    bingo: [],
    color: [],
    createdby: "",
    whoShared: "",
    gameId: "",
    docExists: false,
  });

  const queryFirestoreShareWrapper = async () => {
    const queryResult = await queryFirestoreShare(id as string);

    if (queryResult) {
      const data = queryResult;

      setBingoGridData({
        activeSize: data.activeSize,
        bingo: data.bingo,
        color: data.colors,
        createdby: data.createdBy,
        whoShared: data.whoShared,
        gameId: data.bingoID,
        docExists: true,
      });
    }
  };

  useEffect(() => {
    queryFirestoreShareWrapper();
  }, [id]);

  useEffect(() => {
    console.log(bingoGridData);
  }, [bingoGridData]);

  return (
    <>
      {bingoGridData.docExists && (
        <BingoGrid
          activeSize={Number(bingoGridData.activeSize)}
          handleInput={() => {}}
          bingoField={bingoGridData.bingo}
          bingoColors={bingoGridData.color}
          playBingoCallback={() => {}}
          gridStyle="play"
        />
      )}
      {bingoGridData.whoShared.length !== 0 && (
        <div className="creds">
          <p className="pad">Creator: {bingoGridData.createdby}</p>
          <button
            className="share-button custom"
            onClick={() => {
              navigation(`/play/${bingoGridData.gameId}`);
            }}
          >
            Play this Bingo
          </button>
          <p className="pad">Shared by: {bingoGridData.whoShared}</p>
        </div>
      )}
    </>
  );
}
