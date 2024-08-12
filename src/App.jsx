import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter text to search for images.');
      return;
    }

    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setIsEmpty(false);
    setImages([]);
    setPage(1);

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: 'l3JrmJQJQSy4F734yRzRLIggNwdsB6O_CUVEfjDxA7g',
          query: searchQuery,
          page: 1,
        },
      });

      if (response.data.results.length === 0) {
        setIsEmpty(true);
        setHasMoreImages(false);
      } else {
        setImages(response.data.results);
        setHasMoreImages(response.data.total_pages > 1);
      }
    } catch (error) {
      setError('Failed to fetch images. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    if (!hasMoreImages) return;

    setLoading(true);

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: 'l3JrmJQJQSy4F734yRzRLIggNwdsB6O_CUVEfjDxA7g',
          query: query,
          page: page + 1,
        },
      });

      if (response.data.results.length === 0) {
        setHasMoreImages(false);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError('Failed to load more images. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      
      {loading && <Loader />}
      
      {hasSearched && !loading && !error && !isEmpty && <ImageGallery images={images} onImageClick={openModal} />}
      
      {error && <ErrorMessage message={error} />}
      
      {hasSearched && !loading && !error && isEmpty && <ErrorMessage message="No images found. Try a different search." />}
      
      {hasSearched && !loading && !error && hasMoreImages && <LoadMoreBtn handleLoadMoreClick={loadMoreImages} />}
      
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
      <Toaster />
    </div>
  );
};

export default App;