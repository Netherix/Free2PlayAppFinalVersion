import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Nav from '../../components/Nav/Nav';
import SortingOptions from '../../components/Nav/SortingOptions';
import GameCards from '../../components/Nav/GameCards';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  favorite: boolean; // Include the 'favorite' property
}

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platform, setPlatform] = useState('pc');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [gameType, setGameType] = useState('');
  const [flashMessage, setFlashMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
          params: {
            platform: platform,
            'sort-by': sortBy,
            ...(gameType !== '' && { category: gameType }),
          },
          headers: {
            'X-RapidAPI-Key': '0b86a2b3a2msh983832e4395498ap1a4000jsn1444dbb72f68',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
          },
        };
  
        const response: AxiosResponse<Game[]> = await axios.request(options);
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [platform, sortBy, gameType]);
  

  const removeGameFromFavorites = (gameId: number) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            favorite: false,
          };
        }
        return game;
      })
    );
  };

  const handleCardClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <>
      <Nav />
      <div>
        <SortingOptions
          platform={platform}
          sortBy={sortBy}
          gameType={gameType}
          onPlatformChange={setPlatform}
          onSortByChange={setSortBy}
          onGameTypeChange={setGameType}
        />
        {flashMessage && <div className="flash-message">{flashMessage}</div>}
        <GameCards
          games={games}
          setFlashMessage={setFlashMessage}
          removeGameFromFavorites={removeGameFromFavorites}
          onCardClick={handleCardClick}
        />
      </div>
    </>
  );
};

export default Home;