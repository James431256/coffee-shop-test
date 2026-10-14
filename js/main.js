/* ==========================================================================
   Ruby's Coffee Shop: interactions
   Plain vanilla JS, no dependencies. Loaded with `defer`.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Opening hours: the single source of truth for the "Open now" badge.
     Keys are JS day numbers (0 = Sunday … 6 = Saturday).
     Each day lists its sessions in time order (24h "HH:MM").
     An empty list means closed all day.
     Keep in sync with the hours table, footer and schema in index.html.
     ------------------------------------------------------------------ */
  var COFFEE = "Coffee shop";
  var BAR = "Bar";

  var OPENING_HOURS = {
    0: [{ name: BAR, open: "15:00", close: "21:00" }],
    1: [],
    2: [{ name: COFFEE, open: "08:00", close: "16:00" }],
    3: [{ name: COFFEE, open: "08:00", close: "16:00" }],
    4: [{ name: COFFEE, open: "08:00", close: "16:00" }],
    5: [{ name: COFFEE, open: "08:00", close: "14:00" },
        { name: BAR, open: "16:00", close: "22:00" }],
    6: [{ name: BAR, open: "16:00", close: "22:00" }]
  };

  // The shop's own time zone, so visitors elsewhere still see the right status.
  var SHOP_TIME_ZONE = "Europe/London";

  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /* ---------- Helpers ---------- */

  // "07:30" -> 450 (minutes after midnight)
  function toMinutes(hhmm) {
    var parts = hhmm.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  // "17:00" -> "5pm", "07:30" -> "7:30am"
  function formatTime(hhmm) {
    var mins = toMinutes(hhmm);
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12 || 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + suffix;
  }

  // Current day + minutes in the shop's time zone (falls back to local time).
  function shopNow() {
    var now = new Date();
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: SHOP_TIME_ZONE,
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(now);
      var get = function (type) {
        return parts.find(function (p) { return p.type === type; }).value;
      };
      return {
        day: DAY_NAMES.indexOf(get("weekday")),
        minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10)
      };
    } catch (e) {
      return { day: now.getDay(), minutes: now.getHours() * 60 + now.getMinutes() };
    }
  }

  /* ---------- 1. Open now / Closed badge ---------- */
  function updateOpenBadge() {
    var badges = document.querySelectorAll("[data-open-badge]");
    if (!badges.length) return;

    var now = shopNow();
    var sessions = OPENING_HOURS[now.day] || [];

    // Is a session running right now?
    var current = sessions.find(function (s) {
      return now.minutes >= toMinutes(s.open) && now.minutes < toMinutes(s.close);
    });
    var isOpen = !!current;

    var text;
    if (current) {
      text = current.name + " open now · until " + formatTime(current.close);
    } else {
      // Otherwise find the next session: later today first, then following days
      var next = null;
      var when = "";
      var later = sessions.find(function (s) { return now.minutes < toMinutes(s.open); });
      if (later) {
        next = later;
        when = "today";
      } else {
        for (var i = 1; i <= 7 && !next; i++) {
          var d = (now.day + i) % 7;
          if (OPENING_HOURS[d] && OPENING_HOURS[d].length) {
            next = OPENING_HOURS[d][0];
            when = i === 1 ? "tomorrow" : DAY_NAMES[d];
          }
        }
      }
      text = next
        ? "Closed · " + next.name.toLowerCase() + " opens " + formatTime(next.open) + " " + when
        : "Closed";
    }

    badges.forEach(function (badge) {
      badge.textContent = text;
      badge.classList.toggle("is-open", isOpen);
      badge.classList.toggle("is-closed", !isOpen);
    });

    // Highlight today in the hours table
    document.querySelectorAll(".hours tr[data-day]").forEach(function (row) {
      var isToday = Number(row.dataset.day) === now.day;
      row.classList.toggle("is-today", isToday);
      if (isToday) row.setAttribute("aria-current", "date");
      else row.removeAttribute("aria-current");
    });
  }

  /* ---------- 2. Sticky nav + hamburger menu ---------- */
  function initNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link (smooth scrolling is handled by CSS)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Close if the user taps outside the header
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) setMenu(false);
    });

    // Add a shadow once the page has scrolled
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. Menu tabs (WAI-ARIA tabs pattern) ---------- */
  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });

      // Arrow keys / Home / End move between tabs
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          select(next);
          next.focus();
        }
      });
    });
  }

  /* ---------- 4. Fade-in on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once only
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el, i) {
      // Small stagger for items in the same row (gallery, reviews)
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      observer.observe(el);
    });
  }

  /* ---------- 5. Newsletter form (front-end only) ---------- */
  function initNewsletter() {
    var form = document.querySelector(".newsletter");
    if (!form) return;
    var input = form.querySelector("input[type=email]");
    var msg = document.getElementById("newsletter-msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.checkValidity() || !input.value.trim()) {
        input.setAttribute("aria-invalid", "true");
        msg.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }
      // TODO: send to your email provider (Mailchimp, Buttondown, etc.)
      input.removeAttribute("aria-invalid");
      msg.textContent = "Lovely! You're on the list. See you soon ☕";
      form.reset();
    });

    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
      msg.textContent = "";
    });
  }

  /* ---------- Init ---------- */
  document.documentElement.classList.add("js");

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  updateOpenBadge();
  setInterval(updateOpenBadge, 60 * 1000); // refresh every minute

  initNav();
  initTabs();
  initReveal();
  initNewsletter();
})();
