import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "./FireBaseConfig";

export const uploadSharedGameToFirestore = (
  id: string,
  bingo: string[],
  activeSize: number,
  creator: string,
  bingoColors: string[],
  localId: string
) => {
  const docRef = doc(firestore, "Share", localId);
  setDoc(docRef, {
    bingo: bingo,
    whoShared: getAuth().currentUser?.displayName,
    activeSize: activeSize,
    createdBy: creator,
    colors: bingoColors,
    bingoID: id,
  });
};

export const queryFirestore = async (gameId: string) => {
  const docRef = doc(firestore, "Bingos", gameId);
  const acutalDoc = await getDoc(docRef);

  if (acutalDoc.exists()) {
    return acutalDoc.data();
  } else {
    return false;
  }
};

export const queryFirestoreShare = async (shareId: string) => {
  const docRef = doc(firestore, "Share", shareId as string);
  const acutalDoc = await getDoc(docRef);

  if (acutalDoc.exists()) {
    return acutalDoc.data();
  } else {
    return false;
  }
};

export const publishToFirestore = async (
  publishId: string,
  bingoField: string[],
  activeSize: number
) => {
  const cityRef = doc(firestore, "Bingos", publishId);

  setDoc(cityRef, {
    bingo: bingoField,
    activeSize: activeSize,
    creator: getAuth().currentUser?.displayName,
  });
};
