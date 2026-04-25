// Main JavaScript - Animasyonlar ve Smooth Scroll
(function() {
  "use strict";

  // Dil değiştirme sistemi - main.js'de sadece bayrak güncelleme
  const languageItems = document.querySelectorAll('.language-menu .dropdown-item');
  const currentFlag = document.getElementById('currentFlag');

  languageItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const flagSrc = item.querySelector('.flag-icon').src;
      
      if (currentFlag) {
        currentFlag.src = flagSrc;
      }
    });
  });

  // IntersectionObserver ile animasyon tetikleyici
  const animatedElements = document.querySelectorAll(".fade-up, .fade-left");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.18, 
        rootMargin: "0px 0px -10% 0px" 
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: Tarayıcı desteklemiyorsa hepsini göster
    animatedElements.forEach((el) => el.classList.add("fade-in-view"));
  }

  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#" && document.querySelector(targetId)) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        const navbarHeight = document.querySelector(".navbar").offsetHeight || 70;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Mobile menüyü kapat
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Navbar scroll efekti
  let lastScrollTop = 0;
  const navbarContainer = document.querySelector(".navbar-container");
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      if (navbarContainer) {
        navbarContainer.style.boxShadow = `
          0 15px 50px rgba(0, 0, 0, 0.6),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 0 1px rgba(60, 176, 67, 0.4),
          0 0 30px rgba(60, 176, 67, 0.2)
        `;
        navbarContainer.style.transform = "translateY(5px)";
      }
    } else {
      if (navbarContainer) {
        navbarContainer.style.boxShadow = `
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(60, 176, 67, 0.2)
        `;
        navbarContainer.style.transform = "translateY(0)";
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);

  // IP box kopyalama özelliği
  const ipBox = document.querySelector(".ip-box");
  if (ipBox) {
    ipBox.addEventListener("click", () => {
      const ipText = ipBox.textContent.trim();
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(ipText).then(() => {
          showCopyNotification();
        }).catch(err => {
          console.error("Clipboard copy failed:", err);
          fallbackCopy(ipText);
        });
      } else {
        fallbackCopy(ipText);
      }
    });
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopyNotification();
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textarea);
  }

  function showCopyNotification() {
    const currentLang = localStorage.getItem("preferred_language") || "tr";
    const message = translations[currentLang]?.ip_copied || "✓ IP kopyalandı!";
    
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #3cb043, #2a9d34);
      color: white;
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(60, 176, 67, 0.4);
      z-index: 9999;
      animation: slideInUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = "slideOutDown 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2500);
  }

  // CSS animasyonları
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Loading animation için badge pulse
  const badges = document.querySelectorAll(".badge");
  badges.forEach(badge => {
    badge.style.animation = "pulse 2s ease-in-out infinite";
  });

  // Console güvenlik uyarısı (opsiyonel)
  console.log(
    "%cDikkat!",
    "color: #ff3333; font-size: 30px; font-weight: bold;"
  );
  console.log(
    "%cBu konsol geliştirici araçlarıdır. Birisi size buraya bir şey yapıştırmanızı söylediyse, bu bir dolandırıcılıktır ve size veya hesabınıza zarar verebilir.",
    "font-size: 16px; color: #333;"
  );
  console.log(
    "%cDaha fazla bilgi için: https://wikipedia.org/wiki/Self-XSS",
    "font-size: 14px; color: #666;"
  );

})();


