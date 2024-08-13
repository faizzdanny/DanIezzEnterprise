let cart = [];
let products = {
    'Soft Cookies Chocolate Chips': { price: 4.00, stock: 10 },
    'Soft Cookies Red Velvet': { price: 4.00, stock: 10 },
    'Soft Cookies Matcha': { price: 4.00, stock: 10 },
    'Soft Cookies Dark Chocolate': { price: 4.00, stock: 10 },
    'Soft Cookies Coffee': { price: 4.00, stock: 10 },
    'Signature Blend Frenché Roast Coffee': { price: 16.50, stock: 0 },
    'Salted Caramel Frenché Roast Coffee': { price: 16.50, stock: 0 },
    'Tiramisu Latte Frenché Roast Coffee': { price: 16.50, stock: 0 }
};

function addToCart(product, price, button) {
    if (products[product].stock > 0) {
        cart.push({ product, price });
        products[product].stock -= 1;
        renderCart();
    } else {
        alert('This product is out of stock');
    }
    button.textContent = `Add to Cart (${products[product].stock} left)`;
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const guideTotal = document.getElementById('guide-total');

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.product} - RM ${item.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            cart.splice(index, 1);
            products[item.product].stock += 1; // Return stock on removal
            renderCart();
        };
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    guideTotal.textContent = total.toFixed(2);
}

function clearCart() {
    cart.forEach(item => {
        products[item.product].stock += 1; // Return stock when clearing cart
    });
    cart = [];
    renderCart();
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement.classList.contains('show')) {
        cartElement.classList.remove('show');
        document.removeEventListener('click', closeCartOnClickOutside);
    } else {
        cartElement.classList.add('show');
        document.addEventListener('click', closeCartOnClickOutside);
    }
}

function closeCartOnClickOutside(event) {
    const cartElement = document.getElementById('cart');
    if (!cartElement.contains(event.target) && !event.target.classList.contains('ri-shopping-bag-2-line')) {
        cartElement.classList.remove('show');
        document.removeEventListener('click', closeCartOnClickOutside);
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfH4JUG3mp_3rkUParIW13HZA1h2M-rUdYXOSmhJm8J9nIALg/viewform?usp=pp_url&entry.1234567890=Total: RM${total.toFixed(2)}`;
    window.open(googleFormUrl, '_blank');
    cart = [];
    renderCart();
}

let currentSlide = 0;
const slides = document.querySelectorAll('.photos__slider .photo__item');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000);
    document.querySelectorAll('.sale__card button').forEach(button => {
        const product = button.parentElement.querySelector('.sale__subtitle').textContent;
        button.textContent = `Add to Cart (${products[product].stock} left)`;
    });
});