import { Navigate } from "react-router-dom";
import { PlayPageProps } from "../../interfaces/interfaces";
import BingoField from "../../components/BingoField/BingoField";
import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function CreatePage(props: PlayPageProps) {
  const { user } = props;
  const [activeUser, setActiveUser] = useState(getAuth().currentUser);

  if (!activeUser) {
    return <Navigate to="/login" />;
  }

  return <BingoField user={user} playBingoCallback={() => {}} />;
}
