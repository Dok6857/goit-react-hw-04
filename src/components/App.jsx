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
import { ImageModal } from './ImageModal/ImageModal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    Modal.setAppElement('#root');

    const getImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const imageData = await fetchImages(searchQuery, page);

        setTotalPages(imageData.total_pages);

        setImages(prevImages => [...prevImages, ...imageData.results]);

        if (imageData.results.length === 0) {
          toast.error("Oops!")
        } else {
          toast.success(`Look at these beautiful images!`);
        }

      } catch (error) {
        setError(true);
        toast.error('An error occurred while fetching images.');
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('The search field cannot be empty!');
      return;
    } 

    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const openModal = imageUrl => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery receivedImages={images} onImageClick={openModal} />
      )}
      {page < totalPages && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </>
  );
}
