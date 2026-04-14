/* ===== main.js ===== */
$(document).ready(function () {

  /* --- Navbar scroll --- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }

    /* scroll-to-top button */
    if ($(this).scrollTop() > 400) {
      $('.scroll-top').addClass('visible');
    } else {
      $('.scroll-top').removeClass('visible');
    }
  });

  /* --- Mobile hamburger --- */
  $('.hamburger').on('click', function () {
    $('.mobile-nav').toggleClass('open');
    $(this).toggleClass('active');
  });
  $('.mobile-nav a').on('click', function () {
    $('.mobile-nav').removeClass('open');
    $('.hamburger').removeClass('active');
  });

  /* --- Scroll to top --- */
  $('.scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* --- Fade-up on scroll (IntersectionObserver) --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* --- Animated counter --- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* --- Training filter --- */
  $('.filter-btn').on('click', function () {
    const group = $(this).closest('.filter-group');
    group.find('.filter-btn').removeClass('active');
    $(this).addClass('active');
    filterTrainings();
  });
  $('.filter-select').on('change', function () {
    filterTrainings();
  });

  function filterTrainings() {
    const category = $('.filter-group[data-filter="category"] .filter-btn.active').data('value') || 'all';
    const level = $('.filter-select[data-filter="level"]').val() || 'all';

    let visible = 0;
    $('.training-card').each(function () {
      const cardCat = $(this).data('category') || '';
      const cardLevel = $(this).data('level') || '';
      const catMatch = category === 'all' || cardCat === category;
      const levelMatch = level === 'all' || cardLevel === level;
      if (catMatch && levelMatch) {
        $(this).fadeIn(300);
        visible++;
      } else {
        $(this).fadeOut(200);
      }
    });

    setTimeout(() => {
      $('.filter-count').text(visible + ' Programs Found');
    }, 250);
  }

  /* --- Active nav link on homepage --- */
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'training.html') {
    $('.nav-links a[href="training.html"]').addClass('active');
  } else {
    $('.nav-links a[href="index.html"]').addClass('active');
  }
});
