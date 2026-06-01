/* =========================================
   IMAGE GALLERY
========================================= */

const galleryContainer =
document.getElementById("galleryContainer");

const imagePreview =
document.getElementById("imagePreview");

const previewImg =
document.getElementById("previewImg");

const closePreview =
document.getElementById("closePreview");

async function loadGallery(){

  try{

    const response =
    await fetch("/services/images.json");

    const images =
    await response.json();

    images.forEach(image => {

      createImage(image);

    });

    images.forEach(image => {

      createImage(image);

    });

  }

  catch(error){

    console.log(error);

  }

}

function createImage(image){

  const card =
  document.createElement("div");

  card.classList.add("gallery-card");

  card.innerHTML = `
    <img src="/services/${image}" alt="">
  `;

  const img =
  card.querySelector("img");

  img.addEventListener("click", () => {

    imagePreview.style.display = "flex";

    previewImg.src =
    `/services/${image}`;

  });

  galleryContainer.appendChild(card);

}

closePreview.addEventListener("click", () => {

  imagePreview.style.display = "none";

});

imagePreview.addEventListener("click", (e) => {

  if(e.target === imagePreview){

    imagePreview.style.display = "none";

  }

});


/* =========================================
   YOUTUBE VIDEOS
========================================= */

const videoContainer =
document.getElementById("videoContainer");

async function loadVideos(){

  try{

    const response =
    await fetch("/videos/videos.json");

    const videos =
    await response.json();

    videos.forEach(video => {

      createVideo(video);

    });

  }

  catch(error){

    console.log(error);

  }

}

function createVideo(video){

  const card =
  document.createElement("div");

  card.classList.add("video-card");

  card.innerHTML = `

    <video
      muted
      loop
      playsinline
      preload="metadata"
      style="
      width:100%;
      border-radius:15px;
      cursor:pointer;
      "
    >
      <source src="/videos/${video}">
    </video>

  `;

  const videoElement =
  card.querySelector("video");

  // Mouse enter = autoplay preview

  videoElement.addEventListener("mouseenter", () => {

    videoElement.play();

  });

  // Mouse leave = stop preview

  videoElement.addEventListener("mouseleave", () => {

    videoElement.pause();

    videoElement.currentTime = 0;

  });

  // Click = full popup video

  videoElement.addEventListener("click", () => {

    videoPreview.style.display = "flex";

    previewVideo.src =
    `/videos/${video}`;

    previewVideo.load();

    previewVideo.play();

  });

  videoContainer.appendChild(card);

}
closeVideo.addEventListener("click", () => {

  videoPreview.style.display = "none";

  previewVideo.pause();

  previewVideo.currentTime = 0;

});

videoPreview.addEventListener("click", (e) => {

  if(e.target === videoPreview){

    videoPreview.style.display = "none";

    previewVideo.pause();

    previewVideo.currentTime = 0;

  }

});
loadGallery();
loadVideos();