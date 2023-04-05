const productListElem = document.querySelector('.products_list');
const cartElem = document.querySelector('.cart');
const cartItemsElem = document.querySelector('.cart_items');

const cart = {};

// cartElem.addEventListener('click', e => {
//     cartElem.classList.toggle('cart_hide')
// });

cartElem.addEventListener('click', event => {
    if (event.target.closest('.cart_delete')) {
        const cartEl = event.target.closest('.cart_item');
        const cartId = cartEl.dataset.id;
        // console.log(cartId);

        removeFromCart(cartId);
    }
});

productListElem.addEventListener('click', event => {
    if (event.target.closest('.product_add_button')) {
        const productEl = event.target.closest('.product');
        const productId = productEl.dataset.id;

        addToCart(productId);
    }
});

function removeFromCart(productId) {
    if ((productId in cart)) {
        delete cart[productId];
        const elemInCart = cartElem.querySelector(`div.cart_item[data-id="${productId}"]`);
        
        const itemsInCart = countProperties(cart);
        cartHeight(itemsInCart);

        setTimeout(elemInCart.remove(), 1000);
    }
}

function addToCart(productId) {
    const productTitle = parsedJson[productId].Title
    const productImg = parsedJson[productId].imgSrc
    const productPrice = parsedJson[productId].Price;
    const productColor = parsedJson[productId].Color;
    const productSize = parsedJson[productId].Size;

    if (!(productId in cart)) {
        cart[productId] = { title: productTitle, img: productImg, price: productPrice, color: productColor, size: productSize, count: 0 };
    }

    cart[productId].count++;
    renderCart(productId);
}

function renderCart(productId) {
    const elemInCart = cartElem.querySelector(`div.cart_item[data-id="${productId}"]`);

    if (!elemInCart) {
        // console.log(productId)
        renderNewProductInCart(productId);
        return;
    } else {
        const elemQuantity = elemInCart.querySelector(".cart_quantity>input");
        elemQuantity.value = cart[productId].count;
        // console.log(elemInCart)
    }
}

function countProperties(obj) {
    return Object.keys(obj).length;
}

function adjustCSSRules(selector, props, sheets) {
    // get stylesheet(s)
    if (!sheets) sheets = [...document.styleSheets];
    else if (sheets.sup) {    // sheets is a string
        let absoluteURL = new URL(sheets, document.baseURI).href;
        sheets = [...document.styleSheets].filter(i => i.href == absoluteURL);
    }
    else sheets = [sheets];  // sheets is a stylesheet

    // CSS (& HTML) reduce spaces in selector to one.
    selector = selector.replace(/\s+/g, ' ');
    const findRule = s => [...s.cssRules].reverse().find(i => i.selectorText == selector)
    let rule = sheets.map(findRule).filter(i => i).pop()

    const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);                              // from Object

    if (rule) for (let [prop, val] of propsArr) {
        // rule.style[prop] = val; is against the spec, and does not support !important.
        rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));
    }
    else {
        sheet = sheets.pop();
        if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '');
        sheet.insertRule(`${selector} { ${props} }`, sheet.cssRules.length);
    }
}

function cartHeight(items) {
    const cartItemsHeight = items > 0 ? (346 * items) - 40 : 0;
    const cartMaxHeight = 406 + (346 * (items - 1)) + 96 * 2;
    // console.log(`items:${cartItemsHeight} cart:${cartMaxHeight}`)

    adjustCSSRules('.cart_items', `height: ${cartItemsHeight}px`);
    adjustCSSRules('.cart', `max-height: ${cartMaxHeight}px`);
    // cartItemsElem.style.height = `${cartItemsHeight}px`;
    // cartElem.style.maxHeight = `${cartMaxHeight}px`;

    cartItemsHeight < 1 ? cartElem.classList.add('cart_hide') : false;
}

function renderNewProductInCart(productId) {
    const templateElem = document.querySelector('.template');
    const itemsInCart = countProperties(cart);
    // console.log(cart);
    // console.log(itemsInCart);

    cartHeight(itemsInCart);

    const element = cart[productId];
    const newItemEl = templateElem.content
        .querySelector(".cart_item")
        .cloneNode(true);
    newItemEl.setAttribute('data-id', productId);

    const elemImg = newItemEl.querySelector(".cart_img");
    elemImg.setAttribute('alt', parsedJson[productId].imgAlt);
    elemImg.src = element.img;

    const elemTitle = newItemEl.querySelector(".item_title>h3");
    elemTitle.textContent = element.title;

    const elemPrice = newItemEl.querySelector(".cart_price>span");
    elemPrice.textContent = element.price;

    const elemColor = newItemEl.querySelector(".cart_color>span");
    elemColor.textContent = element.color;

    const elemSize = newItemEl.querySelector(".cart_size>span");
    elemSize.textContent = element.size;

    const elemQuantity = newItemEl.querySelector(".cart_quantity>input");
    elemQuantity.value = element.count;

    // console.log(newItemEl);

    cartItemsElem.appendChild(newItemEl);
    cartElem.classList.remove('cart_hide')
}