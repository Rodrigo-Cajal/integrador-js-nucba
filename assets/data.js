const productsData = [
  {
    id: 1,
    name: "Cosmic Unity 3",
    price: 160,
    image: "../assets/img/products/cosmic-unity-3-a.jpeg",
    category: "Nike",
  },
  {
    id: 2,
    name: "Jordan Why Not 6",
    price: 150,
    image: "../assets/img/products/jordan-why-not-6.jpeg",
    category: "Jordan",
  },
  {
    id: 3,
    name: "Jordan One Take 4",
    price: 100,
    image: "../assets/img/products/jordan-one-take-4.jpeg",
    category: "Jordan",
  },
  {
    id: 4,
    name: "KD Trey 5 X",
    price: 71.97,
    image: "../assets/img/products/kd-trey-5-x-a.webp",
    category: "Nike",
  },
  {
    id: 5,
    name: "LeBron NXXT Gen",
    price: 160,
    image: "../assets/img/products/lebron-nxxt-a.jpeg",
    category: "Nike",
  },
  {
    id: 6,
    name: "Luka 1 'Next Nature'",
    price: 120,
    image: "../assets/img/products/luka-1-next-nature-a.png",
    category: "Jordan",
  },
  {
    id: 7,
    name: "Luka 2",
    price: 130,
    image: "../assets/img/products/luka-2-a.webp",
    category: "Jordan",
  },
  {
    id: 8,
    name: "Nike G.T. Cut 2",
    price: 170,
    image: "../assets/img/products/nike-gt-cut-2-a.webp",
    category: "Nike",
  },
  {
    id: 9,
    name: "PG 6 'Hot Wheels'",
    price: 120,
    image: "../assets/img/products/pg-6-hotwheels-a.webp",
    category: "Nike",
  },
  {
    id: 10,
    name: "Tatum 1 'Denim'",
    price: 120,
    image: "../assets/img/products/tatum-1-denim-a.webp",
    category: "Jordan",
  },
];

const divideProductsInParts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};

const appState = {
  products: divideProductsInParts(5),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(5).length,
  activeFilter: null,
};
