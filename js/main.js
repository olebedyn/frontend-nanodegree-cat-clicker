const NUM_CATS = 5;
let cats = [];

class Cat {
  constructor(name, image, num) {
    this.clicks = 0;
    this.name = name;
    this.image = image;
    this.num = num;
  }
}

/**
 * Adds a cat container with number of clicks, cat name and image. Invisible by default.
 */
function addCatHtml(cat) {
  let catContainer = document.createElement("div");
  catContainer.id = cat.num;
  catContainer.classList.add("cats-display__item");
  let catClicks = document.createElement("p");
  catClicks.textContent = `Clicks: ${cat.clicks}`;
  catClicks.id = `cat${cat.num}-clicks`;
  let catName = document.createElement("p");
  catName.textContent = `Name: ${cat.name}`;
  let catImage = document.createElement("img");
  catImage.src = cat.image;
  catContainer.appendChild(catClicks);
  catContainer.appendChild(catName);
  catContainer.appendChild(catImage);
  document.getElementById("cats-display").appendChild(catContainer);
  catImage.addEventListener("click", () => {
    cat.clicks++;
    document.getElementById(`cat${cat.num}-clicks`).textContent = `Clicks: ${
      cat.clicks
    }`;
  });
}

/**
 * Create cat list item for each cay and makes it clickable.
 */
function createCatListItem(cat) {
  let catListItem = document.createElement("li");
  catListItem.textContent = cat.name;
  document.getElementById("cats-list").appendChild(catListItem);
  catListItem.addEventListener("click", () => {
    for (el of document.getElementsByClassName("visible")) {
      el.classList.remove("visible");
    }
    document.getElementById(cat.num).classList.add("visible");
  });
}

for (let i = 0; i < NUM_CATS; i++) {
  cats[i] = new Cat(`cat${i + 1}`, `img/cat${i + 1}.jpg`, i + 1);
  createCatListItem(cats[i]);
  addCatHtml(cats[i]);
}
