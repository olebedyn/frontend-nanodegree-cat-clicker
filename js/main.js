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
    this.currentCat = this.cats[0];
  }
}

/**
 * This is our views to present the results.
 */

class CatView {
  constructor() {
    this.catImage = document.getElementById("cat-image");
    this.catClicksText = document.getElementById("cat-clicks");
    this.catNameText = document.getElementById("cat-name");
    this.render = this.render.bind(this);
  }

  /**
   * Adds a cat container with number of clicks, cat name and image.
   */
  init() {
    this.render();

    this.catImage.addEventListener("click", () => {
      catApp.addClicks();
    });
  }

  render() {
    const cat = catApp.getCurrentCat();
    this.catClicksText.textContent = `Clicks: ${cat.clicks}`;
    this.catNameText.textContent = `Name: ${cat.name}`;
    this.catImage.src = cat.image;
  }

  renderClicks(clicks) {
    this.catClicksText.textContent = `Clicks: ${clicks}`;
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
      catApp.setCurrentCat(cat);
      catApp.setAdminSettings(false);
    });
  }
}

class AdminView {
  constructor() {
    this.nameEdit = document.getElementById("cat-name-edit");
    this.imageEdit = document.getElementById("cat-url-edit");
    this.clicksEdit = document.getElementById("cat-clicks-edit");
    this.adminForm = document.getElementById("admin-form");
    this.adminBtn = document.getElementById("admin-btn");
    this.cancelBtn = document.getElementById("cancel-btn");
    this.saveBtn = document.getElementById("save-btn");
  }

  init() {
    this.adminBtn.onclick = () => {
      catApp.setAdminSettings(true);
    };
    this.cancelBtn.onclick = () => {
      catApp.setAdminSettings(false);
    };
    this.saveBtn.onclick = () => {
      catApp.setAdminSettings(false);
      catApp.setNewCat(
        this.nameEdit.value,
        this.clicksEdit.value,
        this.imageEdit.value
      );
    };
  }

  render() {
    if (catApp.getAdminSettings()) {
      const cat = catApp.getCurrentCat();
      this.nameEdit.value = cat.name;
      this.imageEdit.value = cat.image;
      this.clicksEdit.value = cat.clicks;
      this.adminForm.classList.add("visible");
    } else {
      this.adminForm.classList.remove("visible");
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
    this.adminView.render();
  }

  getAdminSettings() {
    return this.catModel.adminVisible;
  }

  getCurrentCat() {
    return this.catModel.currentCat;
  }

  setCurrentCat(cat) {
    this.catModel.currentCat = cat;
    this.catView.render();
  }

  addClicks() {
    this.catModel.currentCat.clicks++;
    this.catView.renderClicks(this.catModel.currentCat.clicks);
  }

  setNewCat(name, clicks, src) {
    console.log(name);
    this.catModel.currentCat.name = name;
    this.catModel.currentCat.clicks = clicks;
    this.catModel.currentCat.image = src;
    this.catView.render();
  }
}

catApp = new CatController();

catApp.init();
