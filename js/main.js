/* ============================================
   Sunshine Coin Laundry LLC — Main JavaScript
   Mobile menu, smooth scroll, language toggle
   ============================================ */

(function () {
  'use strict';

  // --- Cookie Helpers ---
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  // --- Language Toggle ---
  function initLanguage() {
    var lang = getCookie('lang') || 'en';
    if (lang === 'es') {
      document.documentElement.classList.add('lang-es');
      document.documentElement.lang = 'es';
    }
  }

  // Initialize language immediately
  initLanguage();

  window.toggleLanguage = function () {
    var isEs = document.documentElement.classList.toggle('lang-es');
    setCookie('lang', isEs ? 'es' : 'en', 365);
    document.documentElement.lang = isEs ? 'es' : 'en';
  };

  // --- Mobile Navigation Toggle ---
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');

      var isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }
    });
  }

  // --- Active nav link based on current page ---
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', '').replace('../', ''))) {
      link.classList.add('active');
    }
    if ((currentPath === '/' || currentPath.endsWith('index.html')) && (href === './' || href === './index.html' || href === '../')) {
      link.classList.add('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header')
          ? document.querySelector('.header').offsetHeight
          : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Header shadow on scroll ---
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }
    }, { passive: true });
  }

  // --- Current year in footer ---
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // --- Report Form: Photo Preview ---
  var photoInput = document.getElementById('report-photo');
  var photoPreview = document.getElementById('photo-preview');
  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', function () {
      photoPreview.innerHTML = '';
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Photo preview';
          img.style.maxWidth = '200px';
          img.style.borderRadius = '8px';
          img.style.marginTop = '8px';
          photoPreview.appendChild(img);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

})();
