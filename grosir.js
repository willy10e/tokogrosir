let cart = [];
let total = 0;

/* REGISTER */
function register() {
    let u = username.value;
    let p = password.value;
    if (!u || !p) return alert("Lengkapi data!");
    localStorage.setItem(u, p);
    authMsg.innerText = "Daftar berhasil, silakan login";
}

/* LOGIN */
function login() {
    let u = username.value;
    let p = password.value;
    if (localStorage.getItem(u) === p) {
        auth.classList.add("hidden");
        produk.classList.remove("hidden");
        document.getElementById("cart").classList.remove("hidden");
        document.getElementById("chatbot").classList.remove("hidden");
    } else {
        authMsg.innerText = "Login gagal!";
    }
}

/* CART */
function addCart(nama, harga) {
    cart.push({ nama, harga });
    total += harga;
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    cart.forEach(item => {
        cartItems.innerHTML += `<li>${item.nama} - Rp ${item.harga}</li>`;
    });
    document.getElementById("total").innerText = total;
}

/* CHATBOT */
function sendChat() {
    let input = userInput.value;
    if (!input) return;

    chatBody.innerHTML += `<p><b>Anda:</b> ${input}</p>`;

    if (input.toLowerCase().includes("checkout")) {
        checkoutWA();
    } else {
        chatBody.innerHTML += `<p><b>Bot:</b> Saya bisa bantu checkout, ketik <b>checkout</b></p>`;
    }

    userInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

/* CHECKOUT WHATSAPP */
function checkoutWA() {
    if (cart.length === 0) {
        chatBody.innerHTML += `<p><b>Bot:</b> Keranjang kosong</p>`;
        return;
    }

    let pesan = "Halo Bang Iky, saya mau pesan:%0A";
    cart.forEach(item => {
        pesan += `- ${item.nama} Rp ${item.harga}%0A`;
    });
    pesan += `%0ATotal: Rp ${total}`;

    let wa = "https://wa.me/6283134749029?text=" + pesan;
    window.open(wa, "_blank");
}
