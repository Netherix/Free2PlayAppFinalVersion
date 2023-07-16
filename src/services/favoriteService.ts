import { firestore, collection, doc, setDoc, updateDoc, deleteField } from '../firebase';

export const addFavoriteGame = async (
  userId: string,
  gameId: string,
  gameTitle: string,
  gameShortDescription: string,
  gameThumbnail: string
) => {
  const userRef = doc(collection(firestore, 'users'), userId);
  await setDoc(userRef, {
    [gameId]: {
      title: gameTitle,
      short_description: gameShortDescription,
      thumbnail: gameThumbnail,
      favorite: true
    }
  }, { merge: true });
};

export const removeFavoriteGame = async (userId: string, gameId: string) => {
  const userRef = doc(collection(firestore, 'users'), userId);
  await updateDoc(userRef, { [gameId]: deleteField() });
};
