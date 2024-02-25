import foodsMenu from "./foodsMenu.js";

const menuEL = document.getElementById("menu");
const ordersEl = document.getElementById("orders-list");
const totoalPriceEl = document.getElementById("total-price");
const modal = document.querySelector(".modal-container");
const refferalInput = document.getElementById("refferal");

let orders = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const { name, price, uuid } = foodsMenu[e.target.dataset.itemId];

    orders.push({
      name,
      price,
      uuid,
    });
    render();
  } else if (e.target.classList.contains("btn-rmv")) {
    orders = orders.filter((item) => {
      return item.uuid !== e.target.dataset.uuid;
    });
    render();
  } else if (e.target.classList.contains("btn-cmp")) {
    if (orders.length) {
      modal.style.display = "block";
    }
  } else if (e.target.classList.contains("btn-cancel")) {
    modal.style.display = "none";
  } else if (e.target.classList.contains("btn-pay")) {
    modal.style.display = "none";
    if(refferalInput.value) {
        alert(`Woo hoo 😋 \nYour Pay is with ${refferalInput.value}`)

    } else {
        alert("Your order is on the way")
    }
  }
});

function getFoodsHtml() {
  return foodsMenu
    .map(
      (item, index) => `
        <div class="menu-item">
            <img src="${item.img}"/>
            <div class="item-detail">
                <h2>${item.name}</h2>
                <p>${item.desc}</p>
                <p class="price">$${item.price}</p>
                <button class="btn btn-add" data-item-id="${index}">
                    Add Order
                </button>
            </div>
        </div>`
    )
    .join("");
}

function getOrdersHtml() {
  return orders
    .map(
      (item, index) => `
        <li class="order-item">
            <h3>${item.name}</h3>
            <p class="price">$${item.price}</p>
            <button class="btn btn-rmv" data-uuid="${item.uuid}">
                ❌
            </button>
        </li>`
    )
    .join("");
}

function getTotalPrice() {
  let totalPrice = orders.reduce((total, order) => {
    return total + order.price;
  }, 0);
  return totalPrice;
}

function render() {
  menuEL.innerHTML = getFoodsHtml();
  ordersEl.innerHTML = getOrdersHtml();
  totoalPriceEl.textContent = `$${getTotalPrice()}`;
}

render();
