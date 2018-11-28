/**
 * This is our models that hold data.
 */
class Cat {
  constructor(name, image, num) {
    this.clicks = 0;
    this.name = name;
    this.image = image;
    this.num = num;
  }
}

class CatModel {
  constructor() {
    this.cats = [];
    this.NUM_CATS = 5;
    for (let i = 0; i < this.NUM_CATS; i++) {
      this.cats[i] = new Cat(`cat${i + 1}`, `img/cat${i + 1}.jpg`, i + 1);
    }
    this.adminVisible = false;
  }
}

/**
 * This is our views to present the results.
 */

class CatView {
  constructor() {}

  /**
   * Adds a cat container with number of clicks, cat name and image. Invisible by default.
   */
  init() {
    const cats = catApp.getCats();
    for (let cat of cats) {
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
        // TODO: Refactor this not to modify model directly
        cat.clicks++;
        document.getElementById(
          `cat${cat.num}-clicks`
        ).textContent = `Clicks: ${cat.clicks}`;
      });
    }
  }
}

class CatListView {
  constructor() {}

  init() {
    const cats = catApp.getCats();
    for (let cat of cats) {
      this.createCatListItem(cat);
    }
  }

  /**
   * Creates cat list item for each cat and makes it clickable.
   */
  createCatListItem(cat) {
    let catListItem = document.createElement("li");
    catListItem.textContent = cat.name;
    document.getElementById("cats-list").appendChild(catListItem);
    catListItem.addEventListener("click", () => {
      for (let el of document.getElementsByClassName("visible")) {
        el.classList.remove("visible");
      }
      document.getElementById(cat.num).classList.add("visible");
    });
  }
}

class AdminView {
  constructor() {
    this.clickHandler = this.clickHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  clickHandler(setting) {
    catApp.setAdminSettings(setting);
    this.render();
  }

  saveHandler() {
    catApp.setAdminSettings(false);
    this.render();
  }

  init() {
    document.getElementById("admin-btn").onclick = this.clickHandler(true);
    document.getElementById("cancel-btn").onclick = this.clickHandler(false);
    document.getElementById("save-btn").onclick = this.saveHandler(false);
  }

  render() {
    if (catApp.getAdminSettings()) {
      document.getElementById("admin-form").classList.add("visible");
    }
  }
}
/**
 * This is our controller that gets data from the model, transforms it and returns to view.
 */
class CatController {
  constructor() {
    this.catModel = new CatModel();
    this.catView = new CatView();
    this.catListView = new CatListView();
    this.adminView = new AdminView();
  }

  init() {
    this.catView.init();
    this.catListView.init();
    this.adminView.init();
  }

  getCats() {
    return this.catModel.cats;
  }

  setAdminSettings(setting) {
    this.catModel.adminVisible = setting;
  }

  getAdminSettings() {
    return this.catModel.adminVisible;
  }
}

catApp = new CatController();

catApp.init();
