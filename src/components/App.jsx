import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './SearchBar/SearchBar';
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from '../images-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true)
        setError(false)
        const imageData = await fetchImages(searchQuery, page);

        setImages((prevImages) => {
          return [...prevImages, ...imageData];
        });

      } catch (error) {
        setError(true)

      } finally {
        setIsLoading(false)
      }
    }
    
    getImages()

  }, [page, searchQuery])

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([])
  }


  return <>
    <SearchBar onSearch={handleSearch}/>
    {images.length > 0 && (<ImageGallery receivedImages={images} />)}
    {isLoading && <Loader />}
  </>;
}
