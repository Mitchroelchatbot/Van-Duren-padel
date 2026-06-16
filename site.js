/* =========================================================================
   Padel Academy van Duren — gedeelde scripts (fase 1 / geraamte)
   - Mobiele navigatie
   - Herbruikbaar intakeformulier (modal) dat zich aanpast per context
   ========================================================================= */
(function () {
    "use strict";

    /* ---- Jaartal in footer ------------------------------------------- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* ---- Mobiele navigatie ------------------------------------------- */
    var toggle = document.querySelector(".nav-toggle");
    var mnav = document.querySelector(".mobile-nav");
    if (toggle && mnav) {
        toggle.addEventListener("click", function () {
            var open = mnav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    /* =====================================================================
       INTAKEFORMULIER — één herbruikbare component.
       Contexten delen een basisset velden; per context extra velden.
       LET OP (fase 2): de afhandeling hieronder is een PLACEHOLDER.
       - Vervang FORM_ENDPOINT door het echte endpoint (mail/CRM), of
       - vervang dit formulier door de chatbot-flow zodra die live is.
    ===================================================================== */
    var FORM_ENDPOINT = ""; // PLACEHOLDER: vul hier het formulier-endpoint in (bv. Formspree/CRM-URL)

    // Basisvelden voor elke aanvraag (contactgegevens).
    var BASE_FIELDS = [
        { name: "naam",    label: "Naam",            type: "text",  required: true },
        { name: "email",   label: "E-mailadres",     type: "email", required: true },
        { name: "telefoon",label: "Telefoonnummer",  type: "tel",   required: true }
    ];

    // Contextspecifieke configuratie.
    var CONTEXTS = {
        contractbaan: {
            tier: "Baanhuur",
            title: "Vraag een contractbaan aan",
            intro: "Vaste speeltijd op je eigen tijdslot. Vul je voorkeuren in — we nemen contact op met een voorstel.",
            fields: [
                { name: "aantal_spelers", label: "Aantal spelers", type: "select", required: true,
                  options: ["2 spelers", "3 spelers", "4 spelers", "Meer / wisselend"] },
                { name: "tijdslot", label: "Gewenst tijdslot", type: "text", required: true,
                  placeholder: "Bijv. dinsdag 20:00–21:30" },
                { name: "frequentie", label: "Frequentie", type: "select", required: true,
                  options: ["Wekelijks", "Tweewekelijks", "Maandelijks", "Anders"] }
            ]
        },
        groepsles: {
            tier: "Lessen",
            title: "Aanmelden groepsles (meerweekse cursus)",
            intro: "Een meerweekse cursus in een vaste groep. Vul je niveau en voorkeur in — we plaatsen je in een passende groep.",
            fields: [
                { name: "niveau", label: "Niveau", type: "select", required: true,
                  options: ["Beginner", "Gevorderd beginner", "Gemiddeld", "Gevorderd"] },
                { name: "voorkeur", label: "Voorkeur dag/tijd", type: "text", required: true,
                  placeholder: "Bijv. doordeweeks avond, weekend overdag" },
                { name: "aantal", label: "Met hoeveel personen meld je aan?", type: "select", required: false,
                  options: ["Alleen ikzelf", "2 personen", "3 personen", "4 personen"] }
            ]
        },
        "clinic-bedrijven": {
            tier: "Clinic · Bedrijven",
            title: "Bedrijfsclinic aanvragen",
            intro: "Padel als teamuitje. Vanaf €29 p.p. Vul de details in — we maken een voorstel op maat.",
            fields: clinicFields()
        },
        "clinic-vrienden": {
            tier: "Clinic · Vriendengroepen",
            title: "Clinic voor je vriendengroep",
            intro: "Een actief uitje met vrienden. Vul de details in en we plannen het samen in.",
            fields: clinicFields()
        },
        "clinic-kinderfeestje": {
            tier: "Clinic · Kinderfeestjes",
            title: "Kinderfeestje aanvragen",
            intro: "Een sportief feestje op de baan. Vul de details in — we regelen de rest.",
            fields: clinicFields(true)
        }
    };

    function clinicFields(kids) {
        return [
            { name: "wanneer", label: "Wanneer (gewenste datum/periode)", type: "text", required: true,
              placeholder: "Bijv. zaterdag 12 juli, of een avond in juni" },
            { name: "personen", label: "Hoeveel personen", type: "number", required: true, min: 1, placeholder: "Aantal deelnemers" },
            { name: "type", label: kids ? "Leeftijd kinderen" : "Type clinic", type: "text", required: false,
              placeholder: kids ? "Bijv. 8–10 jaar" : "Bijv. introductie, fanatiek, met catering" }
        ];
    }

    /* ---- Modal opbouwen (één keer) ----------------------------------- */
    var modal, formEl, titleEl, tierEl, introEl, fieldsEl, successEl;

    function buildModal() {
        modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "intakeTitle");
        modal.innerHTML =
            '<div class="modal__overlay" data-close></div>' +
            '<div class="modal__panel">' +
              '<div class="modal__head">' +
                '<div>' +
                  '<span class="tier" id="intakeTier"></span>' +
                  '<h2 id="intakeTitle" style="margin:.2em 0 0;font-size:1.5rem;"></h2>' +
                '</div>' +
                '<button class="modal__close" type="button" data-close aria-label="Sluiten">&times;</button>' +
              '</div>' +
              '<p id="intakeIntro" class="form-note" style="margin-bottom:18px;"></p>' +
              '<form id="intakeForm" novalidate>' +
                '<div id="intakeFields"></div>' +
                '<input type="hidden" name="context" id="intakeContext"/>' +
                '<button class="btn btn--primary btn--block" type="submit" style="margin-top:8px;">Aanvraag versturen</button>' +
                '<p class="form-note" style="margin-top:12px;text-align:center;">We reageren doorgaans binnen één werkdag.</p>' +
              '</form>' +
              '<div id="intakeSuccess">' +
                '<h3 style="color:#fff;margin-top:0;">Bedankt voor je aanvraag</h3>' +
                '<p style="color:var(--text-onnavy-soft);margin-bottom:0;">We hebben je gegevens ontvangen en nemen snel contact op. ' +
                '<span class="tag-ph">PLACEHOLDER: koppel dit aan het echte endpoint</span></p>' +
              '</div>' +
            '</div>';
        document.body.appendChild(modal);

        formEl    = modal.querySelector("#intakeForm");
        titleEl   = modal.querySelector("#intakeTitle");
        tierEl    = modal.querySelector("#intakeTier");
        introEl   = modal.querySelector("#intakeIntro");
        fieldsEl  = modal.querySelector("#intakeFields");
        successEl = modal.querySelector("#intakeSuccess");

        modal.querySelectorAll("[data-close]").forEach(function (b) {
            b.addEventListener("click", closeModal);
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeModal();
        });
        formEl.addEventListener("submit", onSubmit);
    }

    function renderField(f) {
        var id = "fld_" + f.name;
        var reqMark = f.required ? ' <span class="req">*</span>' : "";
        var control;
        if (f.type === "select") {
            control = '<select id="' + id + '" name="' + f.name + '"' + (f.required ? " required" : "") + '>' +
                '<option value="">Maak een keuze…</option>' +
                f.options.map(function (o) { return '<option>' + o + '</option>'; }).join("") +
                '</select>';
        } else if (f.type === "textarea") {
            control = '<textarea id="' + id + '" name="' + f.name + '" rows="3"' + (f.required ? " required" : "") +
                (f.placeholder ? ' placeholder="' + f.placeholder + '"' : "") + '></textarea>';
        } else {
            control = '<input id="' + id + '" name="' + f.name + '" type="' + f.type + '"' +
                (f.required ? " required" : "") +
                (f.min != null ? ' min="' + f.min + '"' : "") +
                (f.placeholder ? ' placeholder="' + f.placeholder + '"' : "") + '/>';
        }
        return '<div class="form-field"><label for="' + id + '">' + f.label + reqMark + '</label>' + control + '</div>';
    }

    function openModal(contextKey) {
        var cfg = CONTEXTS[contextKey];
        if (!cfg) return;
        if (!modal) buildModal();

        tierEl.textContent  = cfg.tier;
        titleEl.textContent = cfg.title;
        introEl.textContent = cfg.intro;
        modal.querySelector("#intakeContext").value = contextKey;

        // Contextvelden eerst, dan de gedeelde contactgegevens.
        var all = cfg.fields.concat(BASE_FIELDS);
        fieldsEl.innerHTML = all.map(renderField).join("");

        successEl.classList.remove("show");
        formEl.style.display = "";
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        var first = fieldsEl.querySelector("input,select,textarea");
        if (first) first.focus();
    }

    function closeModal() {
        if (modal) modal.classList.remove("open");
        document.body.style.overflow = "";
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!formEl.checkValidity()) { formEl.reportValidity(); return; }

        // PLACEHOLDER-afhandeling: zonder endpoint tonen we een bevestiging.
        // Vervang dit blok door een echte verzending (fetch naar FORM_ENDPOINT)
        // of door de chatbot-flow in fase 2.
        if (FORM_ENDPOINT) {
            var data = new FormData(formEl);
            fetch(FORM_ENDPOINT, { method: "POST", body: data })
                .then(showSuccess)
                .catch(showSuccess);
        } else {
            showSuccess();
        }
    }

    function showSuccess() {
        formEl.style.display = "none";
        successEl.classList.add("show");
    }

    // Koppel alle triggers met data-intake="<context>".
    document.querySelectorAll("[data-intake]").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            openModal(btn.getAttribute("data-intake"));
        });
    });
})();
