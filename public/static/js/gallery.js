document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("galleryContainer");
  const imgPreview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("previewImg");
  const closePreview = document.getElementById("closePreview");

  // Relative path configuration for Next.js public distribution
  const jsonPath = "services/images.json"; 

  // Fallback production array if JSON fails or structure mismatch occurs
  const fallbackImages = [
    "services/1.png", "services/2.png", "services/3.png", "services/4.png", 
    "services/5.png", "services/6.png", "services/7.png", "services/8.png", 
    "services/9.png", "services/10.png", "services/11.png", "services/12.png", 
    "services/13.png", "services/14.png", "services/15.png", "services/17.png"
  ];

  // =========================================
  /* IMAGE GALLERY RENDER LOGIC */
  // =========================================
  function renderGallery(imageArray) {
    if (!container) return;
    container.innerHTML = ""; // Clear existing elements

    // Double the items for seamless infinite marquee loop tracking
    const doubleArray = [...imageArray, ...imageArray];

    doubleArray.forEach((src) => {
      const card = document.createElement("div");
      card.className = "gallery-card";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "Industrial Project Snapshot";
      img.loading = "lazy";

      card.appendChild(img);
      container.appendChild(card);

      // Lightbox preview setup
      card.addEventListener("click", () => {
        if (imgPreview && previewImg) {
          previewImg.src = src;
          imgPreview.style.display = "flex";
        }
      });
    });
  }

  // Fetch data dynamically from JSON file
  fetch(jsonPath)
    .then((response) => {
      if (!response.ok) throw new Error("JSON response failed");
      return response.json();
    })
    .then((data) => {
      // Expecting array structure inside JSON file
      if (Array.isArray(data)) {
        renderGallery(data);
      } else if (data.images && Array.isArray(data.images)) {
        renderGallery(data.images);
      } else {
        renderGallery(fallbackImages);
      }
    })
    .catch((err) => {
      console.warn("Gallery routing fallback initiated:", err.message);
      renderGallery(fallbackImages);
    });

  // Close image preview systems
  if (closePreview) {
    closePreview.addEventListener("click", () => {
      imgPreview.style.display = "none";
    });
  }

  if (imgPreview) {
    imgPreview.addEventListener("click", (e) => {
      if (e.target === imgPreview) {
        imgPreview.style.display = "none";
      }
    });
  }

  // =========================================
  /* YOUTUBE LIGHTBOX PREVIEW LOGIC */
  // =========================================
  const ytVideoCards = document.querySelectorAll(".video-card");
  const ytModal = document.getElementById("videoPreview");
  const ytPreviewIframe = document.getElementById("previewVid");
  const ytCloseBtn = document.getElementById("closeVideo");

  if (ytVideoCards.length > 0 && ytModal && ytPreviewIframe) {
    ytVideoCards.forEach((card) => {
      card.addEventListener("click", () => {
        // HTML ke 'data-video-id' se automatic ID utha lega, yahan koi link badalne ki zaroorat NAHI hai!
        const videoId = card.getAttribute("data-video-id");
        
        // Modal me video auto-play aur sound ke saath start hogi
        const ytEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        
        ytPreviewIframe.src = ytEmbedUrl;
        ytModal.style.display = "flex";
      });
    });

    // Close Button logic
    if (ytCloseBtn) {
      ytCloseBtn.addEventListener("click", () => {
        ytModal.style.display = "none";
        ytPreviewIframe.src = ""; // Source blank karne se video ki sound band ho jati hai
      });
    }

    // Modal background click close logic
    ytModal.addEventListener("click", (e) => {
      if (e.target === ytModal) {
        ytModal.style.display = "none";
        ytPreviewIframe.src = ""; // Source blank karne se video ki sound band ho jati hai
      }
    });
  }

});