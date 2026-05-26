/* ============================================================
   Van Duren Padel Academy — shared chrome (header + footer)
   Injects header into #site-header and footer into #site-footer.
   Body attribute data-page selects the active nav item.
   ============================================================ */
(function () {
    const PAGE = document.body?.dataset?.page || 'home';

    // Primary nav — most-used pages, always visible on desktop
    const PRIMARY = [
        { id: 'banen',       label: 'Banen',       href: 'Baanhuur.html' },
        { id: 'lessen',      label: 'Lessen',      href: 'Trainingen.html' },
        { id: 'clinics',     label: 'Bedrijven',   href: 'Clinics.html' },
        { id: 'evenementen', label: 'Evenementen', href: 'Evenementen.html' },
        { id: 'contact',     label: 'Contact',     href: 'Contact.html' }
    ];
    // Dropdown — secondary pages tucked under "Meer"
    const MORE = [
        { id: 'team',        label: 'Team',           href: 'Team.html',        icon: 'groups_3' },
        { id: 'sponsoren',   label: 'Sponsoren',      href: 'Sponsoren.html',   icon: 'handshake' },
        { id: 'faq',         label: 'FAQ',            href: 'FAQ.html',         icon: 'help' },
        { id: 'nieuwsbrief', label: 'Nieuwsbrief',    href: 'Nieuwsbrief.html', icon: 'mark_email_unread' },
        { id: 'regels',      label: 'Padelregels',    href: 'Regels.html',      icon: 'menu_book' }
    ];
    const ALL = PRIMARY.concat(MORE);

    const BOOK_URL = 'https://playtomic.io/van-duren-indoor-padel-centrum/a52205f6-6954-4d82-bda0-b2040fc82dc4';

    const moreActive = MORE.some(i => i.id === PAGE);

    const primaryHtml = PRIMARY.map(item => {
        const active = item.id === PAGE;
        const cls = active
            ? 'font-label-bold text-label-bold uppercase text-primary-fixed border-b-2 border-primary-fixed pb-1 whitespace-nowrap'
            : 'font-label-bold text-label-bold uppercase text-secondary hover:text-primary transition-colors pb-1 border-b-2 border-transparent whitespace-nowrap';
        return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
    }).join('\n        ');

    const moreItemsHtml = MORE.map(item => {
        const active = item.id === PAGE;
        const cls = active
            ? 'flex items-center gap-3 px-5 py-3 bg-primary-fixed/10 text-primary-fixed font-label-bold text-label-bold uppercase'
            : 'flex items-center gap-3 px-5 py-3 text-secondary hover:bg-white/5 hover:text-primary-fixed font-label-bold text-label-bold uppercase transition-colors';
        return `<a class="${cls}" href="${item.href}"><span class="material-symbols-outlined text-base">${item.icon}</span> ${item.label}</a>`;
    }).join('\n            ');

    const moreBtnCls = moreActive
        ? 'flex items-center gap-1 font-label-bold text-label-bold uppercase text-primary-fixed pb-1 border-b-2 border-primary-fixed whitespace-nowrap'
        : 'flex items-center gap-1 font-label-bold text-label-bold uppercase text-secondary hover:text-primary transition-colors pb-1 border-b-2 border-transparent whitespace-nowrap';

    const mobileNavHtml = ALL.map(item => {
        const active = item.id === PAGE;
        const cls = active
            ? 'font-headline-md text-[24px] text-primary-fixed uppercase py-3 border-b border-primary-fixed/30'
            : 'font-headline-md text-[24px] text-primary uppercase py-3 border-b border-white/10 hover:text-primary-fixed transition-colors';
        return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
    }).join('\n        ');

    const headerHtml = `
<header class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-4 px-6 md:px-8 py-3 bg-surface-container/85 backdrop-blur-xl rounded-full mt-4 md:mt-6 mx-auto w-[94%] max-w-6xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
    <a class="flex flex-col leading-none select-none shrink-0" href="Van Duren Padel.html">
        <span class="vd-logo-main uppercase">Van Duren</span>
        <span class="vd-logo-sub uppercase">Padel Academy</span>
    </a>
    <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
        ${primaryHtml}
        <div class="relative" id="vd-more-wrap">
            <button id="vd-more-btn" class="${moreBtnCls}" aria-haspopup="true" aria-expanded="false">
                Meer
                <span id="vd-more-chev" class="material-symbols-outlined text-base transition-transform">expand_more</span>
            </button>
            <div id="vd-more-menu" class="absolute right-0 top-full mt-3 min-w-[220px] bg-surface-container/95 backdrop-blur-xl border border-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.5)] py-2 opacity-0 invisible translate-y-1 transition-all duration-200" role="menu">
                ${moreItemsHtml}
            </div>
        </div>
    </nav>
    <div class="flex items-center gap-3 shrink-0">
        <a href="${BOOK_URL}" target="_blank" rel="noopener" class="hidden sm:inline-block bg-primary-fixed text-on-primary-fixed font-label-bold text-label-bold px-5 md:px-6 py-2 rounded-full hover:scale-95 active:scale-90 transition-transform">Boek nu</a>
        <button id="vd-menu-toggle" class="lg:hidden w-10 h-10 flex items-center justify-center text-primary hover:text-primary-fixed transition-colors" aria-label="Menu openen" aria-expanded="false">
            <span class="material-symbols-outlined">menu</span>
        </button>
    </div>
</header>
<div id="vd-mobile-menu" class="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl hidden opacity-0 transition-opacity duration-300 overflow-y-auto">
    <nav class="flex flex-col gap-1 pt-32 pb-16 px-margin-edge max-w-md mx-auto">
        ${mobileNavHtml}
        <a href="${BOOK_URL}" target="_blank" rel="noopener" class="mt-8 shear-btn bg-primary-fixed text-on-primary-fixed font-label-bold text-label-bold px-8 py-4 text-center uppercase">Boek een baan</a>
    </nav>
</div>`;

    const footerHtml = `
<footer class="w-full pt-section-gap pb-12 px-margin-edge bg-background/95 backdrop-blur-xl border-t border-white/10">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        <!-- Column 1: Brand -->
        <div class="md:col-span-4 flex flex-col gap-6">
            <div class="flex flex-col leading-none">
                <span class="vd-logo-main uppercase" style="font-size:32px;">Van Duren</span>
                <span class="vd-logo-sub uppercase" style="font-size:11px;">Padel Academy</span>
            </div>
            <p class="text-on-tertiary-container font-body-md max-w-xs text-sm">Altijd padel in Son. Babolat Padel Academy partner. WPT-banen, persoonlijke coaching en een echte club-sfeer.</p>
            <div class="flex flex-col gap-2 text-sm text-secondary/80 font-body-md">
                <span class="flex items-start gap-2"><span class="material-symbols-outlined text-primary-fixed text-base mt-0.5">location_on</span> <span>Wolverstraat 2<br/>5691 PV Son en Breugel</span></span>
                <a class="flex items-center gap-2 hover:text-primary-fixed transition-colors" href="mailto:vanduren@indoorpadelcentrum.nl"><span class="material-symbols-outlined text-primary-fixed text-base">mail</span> vanduren@indoorpadelcentrum.nl</a>
            </div>
            <div class="flex gap-3 mt-2">
                <a class="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-on-tertiary-container hover:text-primary-fixed hover:border-primary-fixed transition-all" href="https://www.facebook.com/Van-Duren-indoor-padelcentrum-110056634725945/" target="_blank" rel="noopener" aria-label="Facebook">
                    <span class="material-symbols-outlined text-sm">public</span>
                </a>
                <a class="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-on-tertiary-container hover:text-primary-fixed hover:border-primary-fixed transition-all" href="mailto:vanduren@indoorpadelcentrum.nl" aria-label="E-mail">
                    <span class="material-symbols-outlined text-sm">alternate_email</span>
                </a>
            </div>
        </div>

        <!-- Column 2: Sport -->
        <div class="md:col-span-2 flex flex-col gap-4">
            <h5 class="font-label-bold text-label-bold text-primary uppercase">Sport</h5>
            <ul class="space-y-2.5">
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Baanhuur.html">Banen boeken</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Trainingen.html">Lessen</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Clinics.html">Bedrijven &amp; clinics</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Evenementen.html">Evenementen</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Regels.html">Padelregels</a></li>
            </ul>
        </div>

        <!-- Column 3: Over ons -->
        <div class="md:col-span-2 flex flex-col gap-4">
            <h5 class="font-label-bold text-label-bold text-primary uppercase">Over ons</h5>
            <ul class="space-y-2.5">
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Team.html">Team</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Sponsoren.html">Sponsoren</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="FAQ.html">FAQ</a></li>
                <li><a class="text-sm text-on-tertiary-container hover:text-primary-fixed transition-colors" href="Contact.html">Contact</a></li>
            </ul>
        </div>

        <!-- Column 4: Nieuwsbrief -->
        <div class="md:col-span-4 flex flex-col gap-4">
            <h5 class="font-label-bold text-label-bold text-primary uppercase">Blijf op de hoogte</h5>
            <p class="text-sm text-secondary/80">Schrijf je in voor onze nieuwsbrief. Eens per maand toernooien, clinics en aanbiedingen.</p>
            <form class="flex gap-2" onsubmit="event.preventDefault(); this.querySelector('button').textContent='Bedankt!'; this.querySelector('button').classList.add('pointer-events-none');">
                <input class="flex-grow bg-transparent border-b-2 border-white/20 focus:border-primary-fixed focus:ring-0 text-white text-sm placeholder:text-secondary/40 transition-all py-2" placeholder="je@email.nl" type="email" required/>
                <button class="bg-primary-fixed text-on-primary-fixed font-label-bold text-xs uppercase px-4 py-2 hover:bg-white transition-colors" type="submit">Inschrijven</button>
            </form>
            <a href="Nieuwsbrief.html" class="text-xs text-primary-fixed/80 hover:text-primary-fixed uppercase font-label-bold tracking-widest mt-1">Meer info →</a>
        </div>
    </div>

    <!-- Bottom bar -->
    <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-secondary/60 tracking-wider">
        <span>© 2026 VAN DUREN PADEL ACADEMY · KVK 12345678</span>
        <div class="flex gap-6">
            <a href="#" class="hover:text-primary-fixed transition-colors">Privacy</a>
            <a href="#" class="hover:text-primary-fixed transition-colors">Algemene voorwaarden</a>
            <a href="#" class="hover:text-primary-fixed transition-colors">Cookies</a>
        </div>
    </div>
</footer>`;

    const headerMount = document.getElementById('site-header');
    if (headerMount) headerMount.innerHTML = headerHtml;
    const footerMount = document.getElementById('site-footer');
    if (footerMount) footerMount.innerHTML = footerHtml;

    // === Desktop dropdown ===
    const moreBtn = document.getElementById('vd-more-btn');
    const moreMenu = document.getElementById('vd-more-menu');
    const moreChev = document.getElementById('vd-more-chev');
    const moreWrap = document.getElementById('vd-more-wrap');

    function openMore() {
        if (!moreMenu) return;
        moreMenu.classList.remove('opacity-0', 'invisible', 'translate-y-1');
        moreChev?.classList.add('rotate-180');
        moreBtn?.setAttribute('aria-expanded', 'true');
    }
    function closeMore() {
        if (!moreMenu) return;
        moreMenu.classList.add('opacity-0', 'invisible', 'translate-y-1');
        moreChev?.classList.remove('rotate-180');
        moreBtn?.setAttribute('aria-expanded', 'false');
    }

    if (moreBtn && moreMenu && moreWrap) {
        // Click toggle (works for both mouse + keyboard)
        moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = moreBtn.getAttribute('aria-expanded') === 'true';
            if (isOpen) closeMore(); else openMore();
        });
        // Hover-open (desktop)
        let hoverTimer;
        moreWrap.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimer);
            openMore();
        });
        moreWrap.addEventListener('mouseleave', () => {
            hoverTimer = setTimeout(closeMore, 150);
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!moreWrap.contains(e.target)) closeMore();
        });
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMore();
        });
    }

    // === Mobile menu toggle ===
    const toggle = document.getElementById('vd-menu-toggle');
    const menu = document.getElementById('vd-mobile-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = !menu.classList.contains('hidden');
            if (open) {
                menu.classList.add('opacity-0');
                setTimeout(() => menu.classList.add('hidden'), 250);
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('span').textContent = 'menu';
            } else {
                menu.classList.remove('hidden');
                requestAnimationFrame(() => menu.classList.remove('opacity-0'));
                toggle.setAttribute('aria-expanded', 'true');
                toggle.querySelector('span').textContent = 'close';
            }
        });
    }
})();
