import { useState, useEffect } from 'react'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import axios from "axios";
import styles from './App.module.css'
import Notiflix from 'notiflix';


export function App() {

  const [images, setImages] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

useEffect(() => {
  if (search !== '') {
      const URL = 'https://pixabay.com/api/';
      const KEY = '29488143-fc1f5e1ea256bfdc98e4452e8';
      const fetchPosts  = () => {
        axios.get(`${URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
          setTotal(response.data.total)
          return response.data.hits
        })
        .then(data => {
          const dataArray = [];
          data.map(({ id, webformatURL, largeImageURL }) => dataArray.push({ id, webformatURL, largeImageURL }))
          if (dataArray.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          }
          return dataArray
        })
        .then((newImages) => {
          return setImages(images => [...images, ...newImages])
        })
        .catch(error => {
          setError(error)
          Notiflix.Notify.failure('Sorry, we have a problem. Please try reloading the page')
        })
        .finally(() => {
          setLoading(false)
        })
      }
      fetchPosts()
    }
  }, [search, page])

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  },[error])

  const onSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== search) {
      setImages([])
      setSearch(searchValue)
      setPage(1)
      setError('')
      setLoading(true)
    } else if (searchValue === "") {
      Notiflix.Notify.info('Input is empty!');
    }
    
  }

  const onLoadMore = () => {
    setPage(page + 1)
    setLoading(true)
  }
  

  return (
      <div className={styles.app}>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images}/>
        {loading && <Loader/>}
        {images.length > 1 && images.length < total && <Button onLoadMore={onLoadMore} />}
      </div>
    );
};