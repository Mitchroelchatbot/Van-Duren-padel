/* =========================================================================
   Van Duren Padel Academy — site.js
   Kleine interacties: "Meer"-dropdown en het mobiele menu.
   Geen framework, geen afhankelijkheden.
   ========================================================================= */
(function () {
    "use strict";

    /* --- "Meer"-dropdown in de hoofdnavigatie --- */
    var moreWrap = document.getElementById("moreWrap");
    var moreBtn  = document.getElementById("moreBtn");

    function openMore() {
        moreWrap.classList.add("is-open");
        moreBtn.setAttribute("aria-expanded", "true");
    }
    function closeMore() {
        moreWrap.classList.remove("is-open");
        moreBtn.setAttribute("aria-expanded", "false");
    }

    if (moreWrap && moreBtn) {
        moreBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (moreWrap.classList.contains("is-open")) {
                closeMore();
            } else {
                openMore();
            }
        });
        // Sluit bij klik buiten het menu
        document.addEventListener("click", function (e) {
            if (!moreWrap.contains(e.target)) closeMore();
        });
        // Sluit met Escape
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMore();
        });
    }

    /* --- Mobiel menu openen/sluiten --- */
    var toggle = document.getElementById("menuToggle");
    var menu   = document.getElementById("mobileMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            var open = menu.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.querySelector("span").textContent = open ? "close" : "menu";
        });
    }
})();
