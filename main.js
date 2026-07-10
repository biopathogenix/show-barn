/* ===========================================================
   THE SHOW BARN — shared JS
   =========================================================== */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Gallery "Load More"
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      document.querySelectorAll('.gallery-grid .g-hidden').forEach(function (img) {
        img.classList.remove('g-hidden');
      });
      loadMoreBtn.style.display = 'none';
    });
  }
});

/* ===========================================================
   CONTACT FORM — EmailJS
   -----------------------------------------------------------
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail) connected to booking@altusgp.com
   3. Create a Template with fields: from_name, from_email, guests, message
      - Set "To Email"  = booking@altusgp.com
      - Set "Bcc"       = rajeswarigopu.eee@gmail.com
   4. Replace the 3 placeholder values below with your own IDs/keys
   =========================================================== */
(function () {
  var EMAILJS_PUBLIC_KEY  = 'z_n-SG1VqOcjCGhvG';
  var EMAILJS_SERVICE_ID  = 'service_yp81if6';
  var EMAILJS_TEMPLATE_ID = 'template_wh10fmb';

  if (window.emailjs && EMAILJS_PUBLIC_KEY.indexOf('YOUR_') !== 0) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var successEl = document.getElementById('formSuccess');
    var errorEl = document.getElementById('formError');
    var submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (successEl) successEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';

      if (EMAILJS_PUBLIC_KEY.indexOf('YOUR_') === 0) {
        console.warn('EmailJS is not configured yet — see comments at the top of main.js');
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.innerHTML = '⚠ The contact form isn\'t connected yet. Please email us directly at <a href="mailto:booking@altusgp.com">booking@altusgp.com</a>.';
        }
        return;
      }

      submitBtn.disabled = true;
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending…';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(function () {
          if (successEl) successEl.style.display = 'block';
          form.reset();
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          if (errorEl) errorEl.style.display = 'block';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  });
})();
