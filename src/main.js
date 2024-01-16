import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

const apiKey = "41640430-3528202645bdb0a9dd97623d3";

let currentPage = 1;
let currentSearchQuery = "";
let totalHits = 0;
let cardHeight = 0;

const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.getElementById("loadMoreBtn");

form.addEventListener("submit", handleFormSubmit);
loadMoreBtn.addEventListener("click", loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = input.value.trim();

  if (!searchQuery) {
    return;
  }

  currentSearchQuery = searchQuery;
  currentPage = 1;

  showLoader();

  try {
    const { images, total } = await fetchImages(currentSearchQuery, currentPage);
    totalHits = total;
    renderGallery(images);
    await toggleLoadMoreButton(images.length);
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function loadMoreImages() {
  showLoader();
  currentPage++;

  try {
    const { images, total } = await fetchImages(currentSearchQuery, currentPage);
    totalHits = total;
    renderGallery(images, true);
    await toggleLoadMoreButton(images.length);

   
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
}

async function fetchImages(query, page) {
  const perPage = 40;

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const { hits, totalHits } = response.data;

   
    if (hits.length > 0 && currentPage === 1) {
      const firstCard = document.querySelector(".gallery__item");

      if (firstCard) {
        cardHeight = firstCard.getBoundingClientRect().height;
      }
    }

    return { images: hits, total: totalHits };
  } catch (error) {
    throw error;
  }
}


async function toggleLoadMoreButton(imageCount) {
  if (totalHits < 40) {
    loadMoreBtn.style.display = "none";
    return;
  }

  if (currentPage * 40 >= totalHits) {
    loadMoreBtn.style.display = "none";

    if (currentPage * 40 >= totalHits && imageCount > 0) {
      await iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: "#3e5c40",
        position: "topRight",
        messageColor: "#fff",
        messageSize: "14px",
        timeout: 3000,
        maxWidth: 400,
        transitionIn: "fadeInLeft",
        transitionOut: "fadeOut",
      });
    }
  } else {
    loadMoreBtn.style.display = "block";
  }
}


function renderGallery(images, append = false) {
  if (!append) {
    gallery.innerHTML = "";
  }

  if (images.length === 0 && currentPage === 1) {
    iziToast.info({
      title: "Info",
      message: "Sorry, there are no images matching your search query. Please try again!",
      backgroundColor: "#85380f",
      position: "topRight",
      messageColor: "#fff",
      messageSize: "14px",
      timeout: 3000,
      maxWidth: 400,
      transitionIn: "fadeInLeft",
      transitionOut: "fadeOut",
    });
    loadMoreBtn.style.display = "none";
    return;
  }

  const galleryHTML = createMarkup(images);
  gallery.innerHTML += galleryHTML;

  const lightbox = new SimpleLightbox("#gallery a", {
    captionsData: "alt",
    captionPosition: "bottom",
  });

  lightbox.refresh();
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

function handleError(error) {
  console.error("Error fetching images:", error);
  const errorMessage =
    error.response && error.response.status === 404
      ? "Sorry, there are no images matching your search query. Please try again!"
      : "An error occurred while fetching images. Please try again later.";

  iziToast.error({
    title: "Error",
    message: errorMessage,
  });
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}






