let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  resultItemEl.appendChild(document.createElement("br"));

  let urlEl = document.createElement("a");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  urlEl.classList.add("result-url");
  resultItemEl.appendChild(urlEl);

  resultItemEl.appendChild(document.createElement("br"));

  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;
  descriptionEl.classList.add("link-description");
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(results) {
  spinnerEl.classList.add("d-none");
  results.forEach(createAndAppendSearchResult);
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    let query = searchInputEl.value;
    let url = `https://apis.ccbp.in/wiki-search?search=${query}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
