const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");
const navbar = document.getElementById("navbar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (navbar.classList.contains("show")) {
    navbar.classList.remove("show");
    return;
  }
};

const toggleNavbar = () => {
  navbar.classList.toggle("show");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
};



const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, image, quantity } = cartProduct;
  return `
        <div class="cart-item">
          <img src=${image} alt="Carrito" />
          <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <span class="item-price">$${price}</span>
          </div>
          <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
          </div>
        </div>`;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const getCartTotal = () => {
  return cart.reduce(
    (accumulator, current) =>
      accumulator + Number(current.price) * current.quantity,
    0
  );
};

const showCartTotal = () => {
  total.innerHTML = `$${getCartTotal().toFixed(2)}`;
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

const createProductData = ({ id, name, price, image }) => {
  return {
    id,
    name,
    price,
    image,
  };
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

const createCartPorduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  } else {
    createCartPorduct(product);
  }
  updateCartState();
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  subtractProductUnit(existingCartProduct);
};

const removeProductFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id);
  updateCartState();
};

const subtractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item;
  });
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }

  updateCartState();
};

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;

  Swal.fire({
    title: confirmMsg,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    customClass: {
      cancelButton: "my-cancel-button",
      confirmButton: "my-confirm-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      resetCartItems();
      Swal.fire({
        title: successMsg,
        customClass: {
          container: "my-container",
          title: "my-title",
          confirmButton: "my-confirm-button",
        },
      });
    }
  });
};

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar el carrito?",
    "¡No hay productos en el carrito!"
  );
};

const initCart = () => {
  cartBtn.addEventListener("click", toggleCart);
  navbar.addEventListener("click", toggleNavbar);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
};

initCart();
