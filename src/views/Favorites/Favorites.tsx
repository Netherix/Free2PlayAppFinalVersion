import { useEffect, useState } from 'react';
import GameCards from '../../components/Nav/GameCards';
import { firestore, collection, doc, getDoc, auth } from '../../firebase';
import './Favorites.css';
import Nav from '../../components/Nav/Nav';

interface FavoriteGame {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  favorite: boolean;
}

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState<FavoriteGame[]>([]);
  const [flashMessage, setFlashMessage] = useState('');

  const removeGameFromFavorites = (gameId: number) => {
    setFavoriteGames((prevGames) =>
      prevGames.filter((game) => game.id !== gameId)
    );
  };

  const handleCardClick = () => {
  };

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second

      try {
        // Check if user is authenticated
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }

        // Get the current user's ID
        const userId = auth.currentUser.uid;

        // Fetch the favorite games from the database
        const userRef = doc(collection(firestore, 'users'), userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          const games = Object.keys(data).map((key) => {
            const gameData = data[key];
            return {
              id: parseInt(key),
              title: gameData.title,
              short_description: gameData.short_description,
              thumbnail: gameData.thumbnail,
              favorite: true
            };
          });
          setFavoriteGames(games);
        } else {
          setFavoriteGames([]);
        }
      } catch (error: any) {
        setFlashMessage('Error fetching favorite games: ' + error.message);
      }
    };

    fetchFavoriteGames();
  }, []);

  return (
    <div>
      <Nav />
      <h1 className="title">Favorite Games</h1>
      <GameCards
        games={favoriteGames}
        setFlashMessage={setFlashMessage}
        removeGameFromFavorites={removeGameFromFavorites}
        onCardClick={handleCardClick} // Add onCardClick prop with placeholder function
      />
      {flashMessage && <p className="flash-message">{flashMessage}</p>}
    </div>
  );
};

export default Favorites;
