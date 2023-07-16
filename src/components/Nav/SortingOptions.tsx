import { Dispatch, SetStateAction } from 'react';
import './SortingOptions.css';

interface SortingOptionsProps {
  platform: string;
  sortBy: string;
  gameType: string;
  onPlatformChange: Dispatch<SetStateAction<string>>;
  onSortByChange: Dispatch<SetStateAction<string>>;
  onGameTypeChange: Dispatch<SetStateAction<string>>;
}

const SortingOptions = ({
  platform,
  sortBy,
  gameType,
  onPlatformChange,
  onSortByChange,
  onGameTypeChange,
}: SortingOptionsProps) => {
  return (
    <div className="sorting-options-container">
      <div>
        <label htmlFor="platform" className="option-label">Platform:</label>
        <select
          name="platform"
          id="platform"
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value)}
        >
          <option value="pc">PC</option>
          <option value="browser">Browser</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortBy" className="option-label">Sort By:</label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="release-date">Release Date</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      <div>
        <label htmlFor="gameType" className="option-label">Game Type:</label>
        <select
          name="gameType"
          id="gameType"
          value={gameType}
          onChange={(e) => onGameTypeChange(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="mmorpg">MMORPG</option>
          <option value="shooter">Shooter</option>
          <option value="social">Social</option>
          <option value="racing">Racing</option>
          <option value="sports">Sports</option>
          <option value="strategy">Strategy</option>
          <option value="fighting">Fighting</option>
        </select>
      </div>
    </div>
  );
};

export default SortingOptions;
