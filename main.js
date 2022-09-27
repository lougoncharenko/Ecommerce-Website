import data from './data.js'

//define Variables
const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal =document.getElementById('cart-total');

//produces images on the page
for(let i = 0; i <data.length; i += 1){
    const newDiv = document.createElement('div'); // <div></div>
    newDiv.className = 'item'; //  <div class = 'item' ></div>
    const img = document.createElement('img'); //<img>
    img.src = data[i].image; //links image source to image in data.js
    img.width = 300;
    img.height = 300;
    newDiv.appendChild(img); // adds img to new Div
    //create P element for Description
    const description = document.createElement ('P');
    description.innerText= data[i].desc; 
    newDiv.append(description);
    //Create P element for Price
    const price = document.createElement('P');
    price.innerText = data[i].price;
    newDiv.appendChild(price);
    //button
    const button = document.createElement('button'); // Make a button 
    button.id = data[i].name; //add an  id name to the button
    button.dataset.price = data[i].price //creates a custom attribute called data-price.
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button) ;
    itemsContainer.appendChild(newDiv); //adds newDiv to item container in html  
}

//shopping cart
const cart = [];

//---------------------------------------------------------------------------
//add to cart button
const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addToCart(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showCartItems()
  }))
//---------------------------------------------------------------------------
//handle clicks on list
itemList.onclick = function(e) {
    if(e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name; 
        removeItem(name);
    } else if (e.target && e.target.classList.contains('add')){
        console.log('add');
        const name = e.target.dataset.name; 
        addToCart(name);
    } else if (e.target && e.target.classList.contains('subtract')){
        const name = e.target.dataset.name; 
        removeItem(name, 1);
    }
}


//---------------------------------------------------------------------------
//add item
function addToCart(name, price) {
    for (let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            cart[i].qty += 1
            showCartItems();
            return 
        }
    }

    //create an object to store name, price and qty
    const item = {
        name: name,
        price: price,
        qty: 1
    }
    cart.push(item); //pushes item object in the cart
    console.log(cart)
   
}

//---------------------------------------------------------------------------
//show items
function showCartItems() {
    const qty = getQty(); //calls function and returns total at the same time
    cartQty.innerHTML = `You have ${qty} items in your cart`;

    let itemStr = ' '

    for(let i =0; i < cart.length; i += 1) {
        const price = cart[i].price;
        const name = cart[i].name;
        const quantity = cart[i].qty;
        const itemTotal = cart[i].price * cart[i].qty;

        itemStr += `<li> ${name} $${price} x ${quantity} =  $${itemTotal} 
         <button class = "remove" data-name = "${name}" > Remove </button> 
         <button class = "add" data-name = "${name}" >  + </button>
         <button class = "subtract" data-name = "${name}" >  - </button </li>`;
    }
    itemList.innerHTML = itemStr;
    let total = calculateTotal();
    cartTotal.innerHTML = `Your cart total is ${total}`
}

//---------------------------------------------------------------------------
//get quantity
function getQty(){
    //for loop calculates & displays qty
    let qty = 0;
    for(let i =0; i < cart.length; i += 1){
        qty += cart[i].qty;
       }
       return qty;
}

//---------------------------------------------------------------------------
// calculate total
function calculateTotal(){
    //for loop calculates and displays total
    let total = 0;
    for (let i = 0; i < cart.length; i += 1){
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}
//---------------------------------------------------------------------------
//remove item
function removeItem(name, qty=0){
    console.log('Entered remove item')
    for(let i = 0; i < cart.length; i += 1){
        if(name === cart[i].name){
            if (qty > 0){
                console.log('it matches')
                cart[i].qty -= qty;
            }

            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i,1)
            }
            showCartItems()
         return
     }
    }
}
