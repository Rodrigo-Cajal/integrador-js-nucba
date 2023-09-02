const productsContainer = document.querySelector(".products-container");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");

const createProductTemplate = (product) => {
  const { id, name, price, image } = product;
  return `
    <div class="product">
    <img src=${image} alt=${name} />
    <div class="product-info">

        <div class="product-top">
            <h3>${name}</h3>
        </div>

        <div class="product-mid">
            <span>$${price}</span>
        </div>


        <div class="product-bot">
            <div class="product-offer">
                <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-image='${image}'>Agregar al Carrito</button>
            </div>
        </div>
    </div>
</div>`;
};

const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const applyFilter = (event) => {
  const { target } = event;
  console.log(target);
  if (!isInactiveFilterBtn(target)) return;
  productsContainer.innerHTML = "";

  changeFilterState(target);
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};

const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  productsContainer.addEventListener("click", addProduct);
};

init();
