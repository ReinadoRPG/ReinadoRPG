// ReinadoRPG - Comandos, Loja, Carrinho e contador de jogadores
(function () {
  "use strict";

  // ======================================================================
  // Online players counter (mcsrvstat.us)
  // ======================================================================
  const STATUS_API = "https://api.mcsrvstat.us/2/sd-br7.blazebr.com:25575";

  async function fetchOnlinePlayers() {
    const wrap = document.getElementById("players-online");
    if (!wrap) return;
    const text = wrap.querySelector(".players-text");
    try {
      const res = await fetch(STATUS_API, { cache: "no-store" });
      const data = await res.json();
      if (data && data.online && data.players) {
        wrap.classList.remove("offline");
        wrap.classList.add("online");
        text.textContent = `${data.players.online} / ${data.players.max} jogadores online`;
      } else {
        wrap.classList.remove("online");
        wrap.classList.add("offline");
        text.textContent = "Servidor offline";
      }
    } catch (err) {
      wrap.classList.remove("online");
      wrap.classList.add("offline");
      text.textContent = "Status indisponível";
    }
  }

  // ======================================================================
  // Commands data + UI
  // ======================================================================
  const COMMANDS = [
    { cmd: "/register (senha) (senha)", desc: "Registra sua conta no servidor pela primeira vez.", cat: "autenticacao" },
    { cmd: "/login (senha)", desc: "Faz login na sua conta quando você entrar no servidor.", cat: "autenticacao" },
    { cmd: "/spawn", desc: "Teleporta você de volta para o spawn principal.", cat: "navegacao" },
    { cmd: "/rtp", desc: "Teleporta você para um local aleatório no mundo.", cat: "navegacao" },
    { cmd: "/warp", desc: "Abre a lista de locais públicos para onde você pode se teleportar.", cat: "navegacao" },
    { cmd: "/createhome (nome)", desc: "Cria um ponto de teleporte (home) na sua localização atual.", cat: "navegacao" },
    { cmd: "/sethome (nome)", desc: "Atualiza a localização de uma home existente.", cat: "navegacao" },
    { cmd: "/home (nome)", desc: "Teleporta você para a home especificada.", cat: "navegacao" },
    { cmd: "/delhome (nome)", desc: "Apaga uma de suas homes.", cat: "navegacao" },
    { cmd: "/g (mensagem)", desc: "Envia uma mensagem no chat global.", cat: "social" },
    { cmd: "/tell (jogador) (msg)", desc: "Envia uma mensagem privada para outro jogador.", cat: "social" },
    { cmd: "/afk", desc: "Marca você como 'Ausente' (Away From Keyboard), ou tira a marcação de ausência.", cat: "outros" },
    { cmd: "/sit", desc: "Permite que seu personagem se sente no chão.", cat: "outros" },
    { cmd: "/ignoreplayer (nome)", desc: "Bloqueia todas as mensagens de um jogador específico.", cat: "social" },
    { cmd: "/balance", desc: "Mostra quanto dinheiro (money) você possui.", cat: "economia" },
    { cmd: "/balancetop", desc: "Exibe a lista dos jogadores mais ricos do servidor.", cat: "economia" },
    { cmd: "/pay (jogador) (quantia)", desc: "Paga uma quantia em dinheiro para outro jogador.", cat: "economia" },
    { cmd: "/sell (item) (quantia)", desc: "Vende itens do seu inventário.", cat: "economia" },
    { cmd: "/sell blocks", desc: "Vende blocos.", cat: "economia" },
    { cmd: "/clan menu", desc: "Abre a interface principal de gerenciamento do seu clã.", cat: "clas" },
    { cmd: "/clan invite (jogador)", desc: "Convida um jogador para o seu clã.", cat: "clas" },
    { cmd: "/clan accept", desc: "Aceita um convite para entrar em um clã.", cat: "clas" },
    { cmd: "/clan deny", desc: "Recusa um convite de clã.", cat: "clas" },
    { cmd: "/clan kick (jogador)", desc: "Remove um membro do seu clã.", cat: "clas" },
    { cmd: "/clan setbase", desc: "Define a base (home) do seu clã na sua localização.", cat: "clas" },
    { cmd: "/clan base", desc: "Teleporta você para a base do seu clã.", cat: "clas" },
    { cmd: "/kit", desc: "Abre a interface para selecionar e receber kits.", cat: "outros" },
    { cmd: "/pass", desc: "Permite que você pegue o passe gratuito ou premium.", cat: "outros" },
    { cmd: "/bendinggui", desc: "Abre a interface de habilidades e magias.", cat: "outros" },
    { cmd: "/level", desc: "Exibe seu nível atual e progresso.", cat: "outros" },
    { cmd: "/skin menu", desc: "Abre o menu para alterar ou customizar sua skin.", cat: "outros" },
    { cmd: "/discord", desc: "Mostra o link do Discord oficial do servidor.", cat: "social" },
    { cmd: "/claim (nome)", desc: "Possivelmente relacionado a proteger seu terreno.", cat: "outros" },
    { cmd: "/ping", desc: "Testa sua latência (conexão) com o servidor. (Resposta: Pong!)", cat: "outros" },
    { cmd: "/jukebox", desc: "Permite tocar músicas com bloco de notas.", cat: "outros" },
    { cmd: "/helppop (mensagem)", desc: "Envia uma mensagem de ajuda diretamente para a Staff online.", cat: "outros" },
  ];

  let activeCategory = "all";
  let searchTerm = "";

  function renderCommands() {
    const grid = document.getElementById("commandsGrid");
    const empty = document.getElementById("commandsEmpty");
    if (!grid) return;
    const term = searchTerm.trim().toLowerCase();
    const filtered = COMMANDS.filter((c) => {
      const matchCat = activeCategory === "all" || c.cat === activeCategory;
      const matchTerm =
        !term ||
        c.cmd.toLowerCase().includes(term) ||
        c.desc.toLowerCase().includes(term);
      return matchCat && matchTerm;
    });
    grid.innerHTML = filtered
      .map(
        (c) => `
        <div class="cmd-card" data-cat="${c.cat}">
          <div class="cmd-name">${escapeHtml(c.cmd)}</div>
          <div class="cmd-desc">${escapeHtml(c.desc)}</div>
        </div>`
      )
      .join("");
    if (empty) empty.hidden = filtered.length !== 0;
  }

  function setupCommands() {
    const search = document.getElementById("commandsSearch");
    const cats = document.getElementById("commandsCategories");
    if (!search || !cats) return;

    search.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderCommands();
    });

    cats.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;
      cats.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderCommands();
    });

    renderCommands();
  }

  // ======================================================================
  // Shop data + UI
  // ======================================================================
  const SHOP_ITEMS = [
    { id: "desbanimento", name: "Desbanimento", desc: "Remova seu banimento e volte a jogar no servidor.", price: 15.0, popular: true },
    { id: "vip-cavaleiro", name: "VIP - Cavaleiro do Futuro", desc: "Pacote VIP completo com armadura encantada, itens exclusivos e muito mais!", price: 50.0, popular: true },
    { id: "bz-100", name: "100 BronzeCoins", desc: "Pacote inicial de moedas para usar no servidor.", price: 5.0, popular: false },
    { id: "bz-574", name: "574 BronzeCoins", desc: "Pacote médio de moedas com bônus incluso.", price: 23.0, popular: false },
    { id: "bz-1050", name: "1050 BronzeCoins", desc: "Pacote grande de moedas - melhor custo-benefício!", price: 46.9, popular: true },
    { id: "bz-2432", name: "2432 BronzeCoins", desc: "Mega pacote de moedas para jogadores dedicados.", price: 120.0, popular: false },
    { id: "bz-5000", name: "5000 BronzeCoins", desc: "Pacote supremo! Moedas suficientes para dominar o servidor.", price: 345.0, popular: false },
  ];

  function renderShop() {
    const grid = document.getElementById("shopGrid");
    if (!grid) return;
    grid.innerHTML = SHOP_ITEMS.map(
      (item) => `
      <div class="col-md-6 col-lg-4">
        <div class="shop-card ${item.popular ? "popular" : ""}">
          ${item.popular ? '<span class="shop-popular-tag">POPULAR</span>' : ""}
          <div class="shop-card-header">
            <i class="fas fa-coins shop-icon"></i>
            <h3 class="shop-name">${escapeHtml(item.name)}</h3>
          </div>
          <p class="shop-desc">${escapeHtml(item.desc)}</p>
          <div class="shop-card-footer">
            <span class="shop-price">R$ ${item.price.toFixed(2).replace(".", ",")}</span>
            <button type="button" class="btn btn-success shop-add-btn" data-shop-add="${item.id}">
              <i class="fas fa-plus me-1"></i> Adicionar
            </button>
          </div>
        </div>
      </div>`
    ).join("");

    grid.querySelectorAll("[data-shop-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        requestAddToCart(btn.dataset.shopAdd);
      });
    });
  }

  // ======================================================================
  // Cart + Terms
  // ======================================================================
  const CART_KEY = "rpg_cart";
  const TERMS_KEY = "rpg_terms_accepted";
  const WHATSAPP = "5514998199235";

  let pendingItemId = null;

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveCart(c) {
    localStorage.setItem(CART_KEY, JSON.stringify(c));
  }

  function termsAccepted() {
    return localStorage.getItem(TERMS_KEY) === "1";
  }

  function requestAddToCart(itemId) {
    pendingItemId = itemId;
    if (termsAccepted()) {
      addToCart(itemId);
      showToast("Item adicionado ao carrinho!");
      return;
    }
    // Show terms modal
    const checkbox = document.getElementById("acceptTerms");
    const confirmBtn = document.getElementById("confirmTermsBtn");
    if (checkbox) checkbox.checked = false;
    if (confirmBtn) confirmBtn.disabled = true;
    const modalEl = document.getElementById("termsModal");
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  function addToCart(itemId) {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    const cart = loadCart();
    const existing = cart.find((c) => c.id === itemId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: itemId, name: item.name, price: item.price, qty: 1 });
    }
    saveCart(cart);
    renderCart();
  }

  function removeFromCart(itemId) {
    const cart = loadCart().filter((c) => c.id !== itemId);
    saveCart(cart);
    renderCart();
  }

  function changeQty(itemId, delta) {
    const cart = loadCart();
    const it = cart.find((c) => c.id === itemId);
    if (!it) return;
    it.qty = Math.max(1, it.qty + delta);
    saveCart(cart);
    renderCart();
  }

  function clearCart() {
    saveCart([]);
    renderCart();
  }

  function renderCart() {
    const cart = loadCart();
    const itemsEl = document.getElementById("cartItems");
    const emptyEl = document.getElementById("cartEmpty");
    const summaryEl = document.getElementById("cartSummary");
    const totalEl = document.getElementById("cartTotal");
    const countEl = document.getElementById("cartCount");

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

    if (countEl) {
      countEl.textContent = totalQty;
      countEl.classList.toggle("has-items", totalQty > 0);
    }
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      if (summaryEl) summaryEl.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (summaryEl) summaryEl.hidden = false;

    itemsEl.innerHTML = cart
      .map(
        (i) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${escapeHtml(i.name)}</div>
            <div class="cart-item-price">R$ ${(i.price * i.qty).toFixed(2).replace(".", ",")}</div>
          </div>
          <div class="cart-item-actions">
            <button type="button" class="qty-btn" data-cart-dec="${i.id}" aria-label="Diminuir">−</button>
            <span class="qty-val">${i.qty}</span>
            <button type="button" class="qty-btn" data-cart-inc="${i.id}" aria-label="Aumentar">+</button>
            <button type="button" class="remove-btn" data-cart-remove="${i.id}" aria-label="Remover"><i class="fas fa-times"></i></button>
          </div>
        </div>`
      )
      .join("");

    if (totalEl) totalEl.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

    itemsEl.querySelectorAll("[data-cart-inc]").forEach((b) =>
      b.addEventListener("click", () => changeQty(b.dataset.cartInc, +1))
    );
    itemsEl.querySelectorAll("[data-cart-dec]").forEach((b) =>
      b.addEventListener("click", () => changeQty(b.dataset.cartDec, -1))
    );
    itemsEl.querySelectorAll("[data-cart-remove]").forEach((b) =>
      b.addEventListener("click", () => removeFromCart(b.dataset.cartRemove))
    );
  }

  function checkoutWhatsApp() {
    const cart = loadCart();
    if (cart.length === 0) return;
    const lines = cart.map(
      (i) => `• ${i.qty}x ${i.name} — R$ ${(i.price * i.qty).toFixed(2).replace(".", ",")}`
    );
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg =
      `Olá! Quero finalizar a compra na loja do ReinadoRPG:\n\n` +
      lines.join("\n") +
      `\n\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  }

  function setupTermsModal() {
    const checkbox = document.getElementById("acceptTerms");
    const confirmBtn = document.getElementById("confirmTermsBtn");
    const modalEl = document.getElementById("termsModal");
    if (!checkbox || !confirmBtn || !modalEl) return;

    checkbox.addEventListener("change", () => {
      confirmBtn.disabled = !checkbox.checked;
    });

    confirmBtn.addEventListener("click", () => {
      if (!checkbox.checked) return;
      localStorage.setItem(TERMS_KEY, "1");
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
      if (pendingItemId) {
        addToCart(pendingItemId);
        showToast("Item adicionado ao carrinho!");
        pendingItemId = null;
      }
    });
  }

  function setupCart() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const clearBtn = document.getElementById("clearCartBtn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutWhatsApp);
    if (clearBtn)
      clearBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja limpar o carrinho?")) clearCart();
      });
    renderCart();
  }

  // ======================================================================
  // Helpers
  // ======================================================================
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showToast(text) {
    const t = document.createElement("div");
    t.textContent = text;
    t.style.cssText = `
      position: fixed; bottom: 30px; right: 30px;
      background: linear-gradient(135deg, #7c3aed, #5b21b6);
      color: #fff; padding: 14px 24px; border-radius: 12px;
      font-weight: 600; box-shadow: 0 10px 30px rgba(124,58,237,0.45);
      z-index: 9999; animation: slideInUp 0.3s ease;
    `;
    document.body.appendChild(t);
    setTimeout(() => {
      t.style.animation = "slideOutDown 0.3s ease";
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }

  // ======================================================================
  // Boot
  // ======================================================================
  document.addEventListener("DOMContentLoaded", () => {
    setupCommands();
    renderShop();
    setupTermsModal();
    setupCart();
    fetchOnlinePlayers();
    setInterval(fetchOnlinePlayers, 60000);

    // Make sure dynamic grids are visible (no fade-up trap)
    document
      .querySelectorAll("#commandsGrid, #shopGrid, .commands-search-wrap, .commands-categories")
      .forEach((el) => el.classList.add("fade-in-view"));
  });
})();
