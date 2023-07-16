import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

interface FavoritesButtonProps {
  isFavorite: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void; // Update the prop definition
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ isFavorite, onToggle }) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onToggle(event);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {isFavorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={farHeart} />}
      </button>
    </div>
  );
};

export default FavoritesButton;
