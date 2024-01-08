const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear() {
  searchInput.value = "";
  imageListWrapper.innerHTML = "";
}

async function search(e) {
  e.preventDefault();
  try {
    imageListWrapper.innerHTML = "";
    const value = searchInput.value.trim();
    const response = await fetch(
      "https://api.unsplash.com/search/photos?query=" + value,
      {
        method: "GET",
        headers: {
          Authorization:
            "Client-ID URhvJ__rEEDT0nQfNpx82s3g_gGlgGZ6jxpGx6QVF6k",
        },
      }
    );
    searchInput.value = "";

    const data = await response.json();
    const imageRender = data.results;

    if (imageRender.length == 0) throw new Error("Görsel bulunamadı.");
    Array.from(data.results).forEach((image) => {
      addImageToUI(image.urls.small);
    });
  } catch (err) {
    renderError(err);
  }
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "panel";
  const style = document.createAttribute("style");
  style.value = `background-image: url(${url})`;
  div.setAttributeNode(style);
  imageListWrapper.append(div);

  const panels = document.querySelectorAll(".panel");
  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      removeActiveClasses();
      panel.classList.add("active");
    });
  });

  function removeActiveClasses() {
    panels.forEach((panel) => {
      panel.classList.remove("active");
    });
  }
}

function renderError(err) {
  console.log(err.message);
}
