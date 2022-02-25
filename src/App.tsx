import { useEffect, useState } from 'react';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { Movie } from './models/movie';
import { Genre } from './models/genre';

import { Content } from './components/Content';
import { SideBar } from './components/SideBar';

type GenreResponseProps = Genre

type MovieProps = Movie

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response: any) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response: any) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then((response: any) => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar 
        selectedGenreId={selectedGenre.id} 
        genres={genres} 
        onGenreClick={(id: number) => handleClickButton(id)}
        />
     
      <Content
        selectedGenre={selectedGenre} 
        movies={movies}
       />
            
    </div>
  )
}