import React from 'react';
import './GameCards.css';
import FavoritesButton from './FavoritesButton';
import { addFavoriteGame, removeFavoriteGame } from '../../services/favoriteService';
import { auth } from '../../firebase';

interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  favorite: boolean;
}

interface GameCardsProps {
  games: Game[];
  setFlashMessage: React.Dispatch<React.SetStateAction<string>>;
  removeGameFromFavorites: (gameId: number) => void;
  onCardClick: (gameId: number) => void; // Add the onCardClick prop definition
}

const GameCards: React.FC<GameCardsProps> = ({ games, setFlashMessage, removeGameFromFavorites, onCardClick }) => {
  const handleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>,
    gameId: number,
    isFavorite: boolean
  ): Promise<void> => {
    event.stopPropagation(); // Stop event propagation

    const game = games.find((game) => game.id === gameId);
    if (!game) return;

    // Show flash message based on favorite status
    const gameTitle = game.title;
    let message = '';
    if (game.favorite && !isFavorite) {
      message = `${gameTitle} has been removed from favorites.`;
      removeGameFromFavorites(gameId);
    } else if (!game.favorite && isFavorite) {
      message = `${gameTitle} has been added to favorites.`;
    }

    // Update the favorite status
    game.favorite = isFavorite;

    // Get the current user's ID
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      // Store or remove the favorite game in the database
      if (isFavorite) {
        try {
          await addFavoriteGame(
            userId,
            gameId.toString(),
            game.title,
            game.short_description,
            game.thumbnail
          );
          console.log(`${gameTitle} added to favorites.`);
        } catch (error) {
          console.log('Error adding game to favorites:', error);
        }
      } else {
        try {
          await removeFavoriteGame(userId, gameId.toString());
          console.log(`${gameTitle} removed from favorites.`);
        } catch (error) {
          console.log('Error removing game from favorites:', error);
        }
      }
    }

    setFlashMessage(message);
  };

  const handleCardClick = (gameId: number) => {
    onCardClick(gameId);
  };

  return (
    <div className="game-cards-container">
      {games.map((game) => (
        <div key={game.id} className="game-card" onClick={() => handleCardClick(game.id)}>
          <img src={game.thumbnail} alt={game.title} className="game-image" />
          <div className="card-content">
            <h2 style={{ fontSize: '20px' }}>{game.title}</h2>
            <div className="favorites-button">
              <FavoritesButton
                isFavorite={game.favorite}
                onToggle={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleFavorite(event, game.id, !game.favorite)
                }
              />
            </div>
            <p>{game.short_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameCards;