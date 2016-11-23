var cart = {
  "items": [

  ],
  "cart-total": 0,
  "promos": {
    	"LEGOCity": 0.9,
    	"ASICS": 0.85,
    	"WALNUT": 0.95
    }
};

var utilities = {
  find: function(list, id) {
    return list.map(function(x) {
        return x.id;
      })
      .indexOf(id);
  },
  findByProductName: function (list, name) {
      var i = 0;
      var found = false;
      while (!found && i < list.length) {      
         if (list[i].name === name) {
            found = true;         
         }
         i++; 
      }
      if (found) {
         return i - 1;
      }
      else {
         return null;
      }
   },
   cartTotalItems: function (list) {
      var i = 0;
      var num = 0;

      while (i < list.length) {
         num += list[i].count;
         i++;
      }
      return num;
   },
}
//var itemsInShoppingCart = document.getElementById("shopping-items");
var itemsInCart = document.getElementById("shopping-items");
console.log("shopping-items " + itemsInCart);

// Toggle show/hide cart w/ button

var shoppingCart = document.getElementById("shopping-cart");
var toggleButton = document.getElementById("toggle");

function showHide (element) {
	if (element.classList.contains("hide")) {
		toggleButton.textContent = "Hide Shopping Cart";
	} else {
		toggleButton.textContent = "Show Shopping Cart";
	}
	element.classList.toggle("hide");
	element.focus();
}

// Global variables
//var itemsInShoppingCart = document.getElementById("shopping-items");
var subTotal = document.getElementById("subtotal");
var shoppingItems = document.getElementById("shopping-items");
//var productQuantity = 0;
function addItem(id) {

  //var shoppingItems = document.getElementById("shopping-items");

  // Look up product details
  var product = document.getElementById(id);
  console.log("product " + product);
  var productName = product.querySelector(".title").innerHTML;
  console.log("productName " + productName);
  var productDescription = product.querySelector(".product-description").innerHTML;
  var shortProductDescription = productDescription.substr(0, productDescription.indexOf("."));
  var productPic = product.querySelector(".img").src;
  //console.log("productPic " + productPic);
  var productPrice = parseFloat(product.querySelector(".st").innerHTML.replace(/[^\d|\.]/g, ""));
  console.log("productPrice = " + productPrice); 
 // var productQuantity = parseInt(product.querySelector(".product-quantity").value) || 1;
  //console.log("productQuantity = " + productQuantity);
  // Check if items exists, if so increment count, else add to cart
  var inputFieldId = cart.items.length;
  console.log("cart.items.length = " + cart.items.length);
  if (cart.items.length === 0 || indexInCartObject === -1) {
    cart.items.push({
      "id": id,
      "featuredImage": productPic,
      "name": productName,
      "price": productPrice,
      "totalPrice": productPrice,
      "count": 1,
      "inputId": inputFieldId
    });
  
    } else {
      
        cart.itemsCart[index].count += 1;
        cart.itemsCart[index].totalPrice += productPrice;
    }
  
 console.log("before render cart on screen " + cart.items.length);
  // Rerender cart on screen
  //shoppingItems.innerHTML = JSON.stringify(cart, null, 2);
  
  console.log("items = " + itemsInCart.length);
    // use a function from utilities object to update our cart number in fixed nav bar on each click

  displayInCart();
  calculateSubTotal();
  //updateTotalPrice();
}
function calculateSubTotal(){
  //Set cart-total back to 0 before calculating it
  cart["cart-total"] = 0;
  
  //Loop over all product's prices and quantities and add products
  //of them tothe cart subtotal
  console.log("calculateSubtotal");
  for (var i = 0; i < cart.items.length; i++){
    cart["cart-total"] += cart.items[i].price * cart.items[i].count;
  }
  
  //Set subtotal field to cart-total value
  subTotal.value = "$" + cart["cart-total"];
  console.log("subtotal = " + cart["cart-total"]);
}
function updateSubTotal(productName){
  console.log("updateSubTotal " + productName + " " + cart.items.length);
  for (var i = 0; i < cart.items.length; i++){
    console.log("product name in loop " + cart.items[i].name);
     if (cart.items[i].name === productName){
       cart["cart-total"] -= cart.items[i].price * cart.items[i].count;
     }
  }
  subTotal.value = "$" + cart["cart-total"];
  console.log("subtotal = " + cart["cart-total"]);
}


function displayInCart() {

   var itemsInCart = document.getElementById("checkoutNameUl");

   itemsInCart.innerHTML = "";

   for (var i = 0; i < cart.items.length; i++) {
      if (i >= 1) {
        
         itemsInCart.innerHTML += "<hr id='line" + i + "'><br>"
      }

      itemsInCart.innerHTML +=
          '<li class="checkoutContentsLi" id="product' + cart.items.length + '">' +
          '<div class="cartInfo imageDiv">' +
          '<img class="imageCart" src="' + cart.items[i].featuredImage + '">' +
          '</div>' +
          '<div class="cartInfo itemDiv">' +
          '<p>' + cart.items[i].name + '</p>' +
          '</div>' +
          '<div class="cartInfo priceDiv">' +
          '<p>' + '$ ' +
          cart.items[i].price +
          '</p>' +
          '</div>' +
          '<div class="cartInfo quantityDiv">' +
          '<button class="button1" onclick="decrementValue(this)" value="-">-</button>' +
          '<input id ="' + cart.items[i].inputId + '" readonly="readonly" class="quantityInput" type="text" min="0" max="10" value="' + cart.items[i].count + '">' +
          '<button class="button2" onclick="incrementValue(this)" value="+">+</button>' +
          '</div>' +
          '<div class="cartInfo priceTotalDiv">' +
          '<p>' +
          '$' + cart.items[i].totalPrice +
          '</p>' +
          '</div>' +
          '<div class="cartInfo removeDiv">' +
          '<button class="removeItem" onclick="remove(this)">Remove</a>' +
          '</div>' +
          '<li>'

   }


// Activate removeItem() function if user click Remove button
/*itemsInCart.addEventListener("click", function(el) {
  
  console.log("classList.item " + el.target.classList.item(0));
	if(el.target.classList.contains("remove")) {
		remove(el.target);
	}
  if(el.target.classList.contains("button1")) {
		decrementValue(el.target);
	}
  if(el.target.classList.contains("button2")) {
		incrementValue(el.target);
  }  
}, false);*/

  // remove object when the button "remove" is pressed for that item
function remove(ele) {
console.log("remove");
  console.log(ele);
   var product = ele.parentNode.previousSibling.previousSibling.previousSibling;
  console.log("parNode ="+ele.parentNode);
  console.log("product = " + product);
   var productName = product.previousSibling.firstChild.innerHTML;
  console.log("product Name " + productName);
  updateSubTotal(productName);
  console.log("before findByProductName");
  console.log("cart.items.length before findByName " + cart.items.length);
  var cartObject = utilities.findByProductName(cart.items, productName);
  console.log("cartObject = " + cartObject); 
  
   console.log("cart.items.length  before splice" + cart.items.length);
  if (cartObject != null)
   cart.items.splice(cartObject, 1);
  
  console.log("cart.items.length  after slice" + cart.items.length);

 //console.log("update " + utilities.cartTotalItems(cart.items));
  console.log("before updateTotalPrice in remove"); 
  //updateTotalPrice();
  console.log("before displayInCart in remove"); 
   displayInCart();
}

  // lowers the quantity of item by 1
// will remove item from cart when trying to decrement past zero
function decrementValue(ele) {
  console.log("decrementValue");
   var product = ele.parentNode.previousSibling.previousSibling;
   console.log("product decr " + product);
   var productName = product.firstChild.innerHTML;
   console.log("productName decr " + productName);
   var inputTag = ele.nextSibling;
  console.log("input Tag decr" + inputTag);
   var inputValue = Number(inputTag.value);
  console.log("inputValue decr" +inputValue);
   var cartIndex = utilities.findByProductName(cart.items, productName);
console.log("cartIndex decr " + cartIndex);

   if (cart.items[cartIndex].name === productName && inputValue > 1) {
      cart.items[cartIndex].count -= 1;
      cart.items[cartIndex].totalPrice -= cart.items[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue -= 1;
      inputTag.setAttribute("value", inputValue);
  
      //updateTotalPrice();
      displayInCart();
   }
   else {
     console.log("else name==productName");
      cart.items.splice(cartIndex, 1);

     // updateTotalPrice();
     console.log("Before displayInCart decr");
      displayInCart();
   }


}
  // increases the items in cart by one using the plus sign in shopping cart
function incrementValue(ele) {
  console.log("Increment");
   var product = ele.parentNode.previousSibling.previousSibling;
   var productName = product.firstChild.innerHTML;
   var inputTag = ele.previousSibling;
   var inputValue = Number(inputTag.value);
   var cartIndex = utilities.findByProductName(cart.items, productName);
   if (cart.items[cartIndex].name === productName && inputValue > 0) {
     console.log("if incr");
      cart.items[cartIndex].count += 1;
      cart.items[cartIndex].totalPrice += cart.items[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue += 1;
      inputTag.setAttribute("value", inputValue);

     // updateTotalPrice();
      displayInCart();
   }

}
// function that updates the total price
function updateTotalPrice() {
   var totalPrice = document.getElementById("checkoutPrice");

   var counterNum = 0;
   var i = 0;
   totalPrice.innerHTML = "";

   while (i < cart.itemsCart.length) {
      counterNum += cart.itemsCart[i].totalPrice;
      i++;
   }
}


}

