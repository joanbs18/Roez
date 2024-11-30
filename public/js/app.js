//CARRITO-----------------------------------------------------------

let allProducts = [];
if (localStorage.getItem("misCompras") !== null) {
  allProducts = JSON.parse(localStorage.getItem("misCompras"));
}

const modal__list = document.querySelector(".modal__list");
const productosList = document.querySelector(".productos");

const valorTotal = document.querySelector(".modal__total-cart");

const subtotal = document.querySelector("#subtotal");

const countProducts = document.querySelector("#contador-productos");

const existeAlgo = document.querySelector(".modal__list");

productosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    const product = e.target.parentElement;
    const product2 = product.parentElement;

    console.log(product.querySelector(".anadirMas #cantidadProductos").value);

    const inforProduc = {
      quantity: product.querySelector(".anadirMas #cantidadProductos").value,
      title: product.querySelector("h1").textContent,
      price: product.querySelector("h3").textContent,
      img: product2.querySelector("img").src,
    };

    const exits = allProducts.some(
      (product) => product.title === inforProduc.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === inforProduc.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, inforProduc];
    }

    showHTML();
  }
});

modal__list.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("fa-x")) {
    const product = e.target.parentElement;
    const product2 = product.parentElement;
    const title = product2.querySelector(".modal__text-product p").textContent;
    console.log(title);
    allProducts = allProducts.filter((product) => product.title !== title);
  }

  showHTML();
});

const showHTML = () => {
  let total = 0;
  let totalOfProducts = 0;
  //Limpiar html}
  modal__list.innerHTML = "";

  console.log(allProducts);
  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");
    containerProduct.innerHTML = `<div class="modal__item">
    <div class="cantidad_productos">${product.quantity}</div>
    <div class="modal__thumb">
      <img src="${product.img}" alt="">
    </div>
    <div class="modal__text-product">
      <p>${product.title}</p>
      <p><strong>${product.price}</strong></p>
    </div>
    <i class="fa-solid fa-x"></i>
  </div>`;
    modal__list.append(containerProduct);

    total += parseInt(product.quantity * product.price.match(/\d+/g));
    totalOfProducts += parseInt(product.quantity);
  });

  valorTotal.innerText = `Total a Pagar: $${total}`;
  countProducts.innerText = totalOfProducts;
  subtotal.innerText = `$${total}`;
  localStorage.setItem("misCompras", JSON.stringify(allProducts));
};
showHTML();

let sumarProducto = document.getElementById("sumar");
let restarProducto = document.getElementById("restar");

// Obtener todos los botones en una colección NodeList
const sumar = document.querySelectorAll("#sumar");
const restar = document.querySelectorAll("#restar");
console.log(sumar);

// Agregar el evento a cada botón
sumar.forEach((boton) => {
  boton.addEventListener("click", function (e) {
    valor = e.target.parentElement;
    cantidad = parseInt(valor.querySelector("#cantidadProductos").value);

    valor.querySelector("#cantidadProductos").value = cantidad + 1;
  });
});

restar.forEach((boton) => {
  boton.addEventListener("click", function (e) {
    valor = e.target.parentElement;
    cantidad = parseInt(valor.querySelector("#cantidadProductos").value);
    if (cantidad <= 1) {
      cantidad = 1;
    } else {
      cantidad -= 1;
    }
    valor.querySelector("#cantidadProductos").value = cantidad;
  });
});

let cantidad = 1;
let precioTotal = document.getElementById("total").innerText;
console.log(precioTotal);
document.getElementById("total").value;

restarProducto.addEventListener("click", () => {
  precioTotal -= precioTotal;
  document.getElementById("cantidadProductos").value = cantidad;
  document.getElementById("total").innerHTML = precioTotal;
});
