import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const apiKey = "41640430-3528202645bdb0a9dd97623d3";

const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = input.value.trim();

  if (!searchQuery) {
    return;
  }

  showLoader();

  fetchImages(searchQuery)
    .then(images => {
      renderGallery(images);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => data.hits);
}

function renderGallery(images) {
  gallery.innerHTML = "";

  if (images.length === 0) {
    iziToast.info({
      title: "Info",
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      backgroundColor: "#EF4040",
      position: 'bottomRight', 
      messageColor: '#fff',
      messageSize: '16px',
      timeout: 5000, 
      maxWidth: 400, 
      transitionIn: 'fadeInLeft', 
      transitionOut: 'fadeOut', 
    });
    return;
  }

  const galleryHTML = createMarkup(images);
  gallery.innerHTML = galleryHTML;

  const lightbox = new SimpleLightbox("#gallery a", {
    captionsData: "alt",
    captionPosition: "bottom",
  });

  lightbox.refresh();
}

function handleError(error) {
  console.error("Error fetching images:", error);
  iziToast.error({
    title: "Error",
    message:
      "An error occurred while fetching images. Please try again later.",
  });
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="image-info">
        <span>Likes: ${likes}</span>
        <span>Views: ${views}</span>
        <span>Comments: ${comments}</span>
        <span>Downloads: ${downloads}</span>
      </div>
    </li>`
    )
    .join("");
}