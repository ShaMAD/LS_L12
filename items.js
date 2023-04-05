const parsedJson = JSON.parse(JsonData);
// console.log(parsedJson);

const productsBox = document.querySelector('.products_list');
// console.log(parsedJson[6].Title);
for (const k in parsedJson) {
    const element = parsedJson[k];

    const productElem = document.createElement('div');
    productElem.classList.add('product');
    productElem.setAttribute('data-id', k);
    // productElem.setAttribute('data-color', element.Color);
    // productElem.setAttribute('data-size', element.Size)

    const prodictImg = document.createElement('img');
    prodictImg.classList.add('product_img');
    prodictImg.setAttribute('alt', element.imgAlt);
    prodictImg.src = element.imgSrc;

    const productTitle = document.createElement('h3');
    productTitle.textContent = element.Title;

    const prodictDescription = document.createElement('p');
    prodictDescription.classList.add('product_description');
    prodictDescription.textContent = element.Description;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product_price');
    productPrice.textContent = element.Price;

    const productAddToCart = document.createElement('button');
    productAddToCart.classList.add('product_add_button');
    productAddToCart.textContent = 'Add to Cart';

    const productAddToCartImg = document.createElement('img');
    productAddToCartImg.setAttribute('alt', 'Add to Cart');
    productAddToCartImg.src = './img/add_to_cart_pic.svg';

    productElem.appendChild(prodictImg);
    productElem.appendChild(productTitle);
    productElem.appendChild(prodictDescription);
    productElem.appendChild(productPrice);
    productAddToCart.prepend(productAddToCartImg);

    productElem.appendChild(productAddToCart);

    productsBox.appendChild(productElem);
}