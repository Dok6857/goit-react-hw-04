import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from '../images-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import Modal from 'react-modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    Modal.setAppElement("#root");

    const getImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const imageData = await fetchImages(searchQuery, page);

        setTotalPages(imageData.total_pages);

        setImages(prevImages => [...prevImages, ...imageData.results]);

        if (searchQuery.trim() === "") {
          toast.error("The search field cannot be empty!");
          return;
        } else if (!imageData.total) {
          toast.error(
            "Sorry, we haven't found the photos for your request.\nTry writing it differently.",
            {
              duration: 6000,
            }
          );
        } else {
          toast.success(`Wow! We've found ${imageData.total} pictures`);
        }

      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery receivedImages={images} />}
      {page < totalPages && images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
}
