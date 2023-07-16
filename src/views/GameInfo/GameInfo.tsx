import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';

const GameInfo = () => {
  const { gameId } = useParams(); // Get the gameId from the URL parameter
  const [game, setGame] = useState<{ title: string; description: string; game_url: string; thumbnail: string } | null>(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, {
          headers: {
            'X-RapidAPI-Key': '0b86a2b3a2msh983832e4395498ap1a4000jsn1444dbb72f68',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
          },
        });
        setGame(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '40px', textAlign: 'center', margin: '0 20px' }}>
        <h1 style={{ marginBottom: '20px' }}>{game.title}</h1>
        {game.thumbnail && <img src={game.thumbnail} alt={game.title} style={{ maxWidth: '100%', marginBottom: '40px' }} />}
        <p style={{ margin: '0 auto', maxWidth: '800px', marginBottom: '20px' }}>{game.description}</p>
        {game.game_url && (
          <a
            href={game.game_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', margin: '40px auto' }}
          >
            Visit Game Website
          </a>
        )}
      </div>
    </>
  );
};

export default GameInfo;
