import { Genre } from "../models/genre";
import { Button } from "./Button";

interface SideBarProps {
  selectedGenreId: number
  genres: Genre[]
  onGenreClick: (id: number) => void
}

export function SideBar({selectedGenreId, genres, onGenreClick} : SideBarProps) {
return (
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => onGenreClick(genre.id)}
        selected={selectedGenreId === genre.id}
      />
    ))}
  </div>

</nav>  
)
}