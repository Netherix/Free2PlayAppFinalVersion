import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import Favorites from "./views/Favorites/Favorites";
import GameInfo from "./views/GameInfo/GameInfo"; // Import the GameInfo component
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/game/:gameId" element={<GameInfo />} />
      </Routes>
    </>
  );
};

export default App;
