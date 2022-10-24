import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getEl = x => document.querySelector(x);
let numberPage = 1;
let inputVal;
let calcCard = 0;

getEl('#search-form').addEventListener('submit', onSubmitForm);
getEl('.load-more').addEventListener('click', onClick);

async function onSubmitForm(event) {
  event.preventDefault();
  try {
    numberPage = 1;
    getEl('.load-more').classList.add('is-hidden');
    inputVal = event.target.elements.searchQuery.value;
    const getData = await axios.get(
      `https://pixabay.com/api/?key=30743658-420b85cc9935254192e6e5527&q=${inputVal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${numberPage}`
    );
    const addClsIsHid = await getEl('.load-more').classList.remove('is-hidden');
    const arrObj = await onArrObj(getData);
    const drawCard = await arrObj
      .map(el => {
        return `<div class="photo-card">
          <a href=${el.largeImageURL}><img src=${el.webformatURL} alt=${el.tags} loading="lazy" width=320 height=200/></a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${el.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${el.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${el.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${el.downloads}
            </p>
          </div>
          </div>
          `;
      })
      .join(' ');
    const addMarkup = await getDataOnRequest();

    function getDataOnRequest() {
      return (getEl('.gallery').innerHTML = drawCard);
    }
    getEl('.gallery').addEventListener('click', modalImg);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: 100,
      behavior: 'smooth',
    });
    return addMarkup;
  } catch {
    error => console.log(error);
  }
  function onArrObj(response) {
    const {
      data: { hits, totalHits },
    } = response;
    calcCard = hits.length;
    if (calcCard === totalHits) {
      getEl('.load-more').classList.add('is-hidden');
    }
    if (hits.length < 1) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    return hits;
  }
}

async function onClick() {
  try {
    numberPage += 1;
    const getData = await axios.get(
      `https://pixabay.com/api/?key=30743658-420b85cc9935254192e6e5527&q=${inputVal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${numberPage}`
    );
    const arrObj = await onArrObj(getData);
    const drawCard = await arrObj
      .map(el => {
        return `<div class="photo-card">
          <a href=${el.largeImageURL}><img src=${el.webformatURL} alt=${el.tags} loading="lazy" width=320 height=200/></a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${el.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${el.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${el.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${el.downloads}
            </p>
          </div>
          </div>
          `;
      })
      .join(' ');
    const addMarkup = await getDataOnRequest();
    function getDataOnRequest() {
      return getEl('.gallery').insertAdjacentHTML('beforeend', drawCard);
    }
    function onArrObj(response) {
      const {
        data: { hits, totalHits },
      } = response;
      // if (hits.length < 1) {
      // Notiflix.Notify.warning(
      //   'Sorry, there are no images matching your search query. Please try again.'
      // );
      calcCard += hits.length;
      if (calcCard === totalHits) {
        getEl('.load-more').classList.add('is-hidden');
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      return hits;
    }
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight,
      behavior: 'smooth',
    });
    getEl('.gallery').addEventListener('click', modalImg);
    return addMarkup;
  } catch {
    error => console.log(error);
  }
}

function modalImg(event) {
  event.preventDefault();
  const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  return lightbox;
}
