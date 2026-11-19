import { site, tel } from './data/site.js';
import { principles, services, combos, testimonials, posts } from './data/content.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (k) => (k * 1000).toLocaleString('vi-VN') + 'đ';

// ===== Điền thông tin chung =====
$$('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
const links = { tel: tel(site.phone), tel2: tel(site.phone2), mailto: 'mailto:' + site.email, facebook: site.facebook, zalo: site.zalo, messenger: site.messenger };
$$('[data-href]').forEach((el) => (el.href = links[el.dataset.href]));
$('#year').textContent = new Date().getFullYear();

// ===== Render nội dung =====
const icons = {
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9a1.5 1.5 0 0 1 3 0v4c0 4-3 7-7 7s-6-2-7.5-5L3 11.5a1.5 1.5 0 0 1 2.5-1.5L7 12"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

$('#principles').innerHTML = principles
  .map((p) => `<article class="card value reveal"><div class="value__icon">${svg(p.icon)}</div><h3>${p.title}</h3><p>${p.text}</p></article>`)
  .join('');

$('#services').innerHTML = services
  .map((s) => `
    <article class="card reveal" id="dv-${s.id}">
      <div class="ph tone-${s.tone}" role="img" aria-label="${s.name}"></div>
      <div class="card__body">
        <h3>${s.name}</h3>
        <p>${s.text}</p>
        <div class="card__meta">
          <span><span class="muted">${s.time} · từ</span> <span class="price">${money(s.price)}</span></span>
          <a href="#dat-lich" class="btn" data-book="${s.name}">Đặt lịch</a>
        </div>
      </div>
    </article>`)
  .join('');

$('#combos').innerHTML = combos
  .map((c) => `
    <article class="card combo reveal ${c.hot ? 'combo--hot' : ''}">
      ${c.hot ? '<span class="combo__tag">HOT</span>' : ''}
      <h3>${c.name}</h3>
      <p>${c.items}</p>
      <p><span class="combo__old">${money(c.old)}</span><span class="combo__price">${money(c.price)}</span></p>
      <a href="#dat-lich" class="btn" data-book="${c.name}">Đặt combo</a>
    </article>`)
  .join('');

$('#testimonials').innerHTML = testimonials
  .map((t) => `<figure class="review"><div class="stars" aria-label="${t.stars} sao">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div><p>“${t.text}”</p><strong>— ${t.name}</strong></figure>`)
  .join('');

$('#posts').innerHTML = posts
  .map((p) => `
    <article class="card post reveal">
      <div class="ph tone-${p.tone}" role="img" aria-label="${p.title}"></div>
      <div class="card__body"><span class="muted">${p.date}</span><h3>${p.title}</h3><p>${p.text}</p></div>
    </article>`)
  .join('');

const serviceLinks = services.map((s) => `<li><a href="#dv-${s.id}">${s.name}</a></li>`).join('');
$('#nav-services').innerHTML = serviceLinks;
$('#footer-services').innerHTML = serviceLinks;
$('#b-service').innerHTML += [...services, ...combos].map((s) => `<option>${s.name}</option>`).join('');

// ===== Header sticky + nút lên đầu trang =====
const header = $('#header');
const toTop = $('#to-top');
const onScroll = () => {
  header.classList.toggle('is-stuck', scrollY > 40);
  toTop.classList.toggle('show', scrollY > 400);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0 }));

// ===== Menu mobile =====
const burger = $('.burger');
const nav = $('#nav');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

// Dropdown "Hỗ trợ khách hàng" (cho bàn phím / cảm ứng)
const dd = $('.dropdown');
$('.dropdown__btn').addEventListener('click', (e) => {
  const open = dd.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', open);
});

// ===== Hiệu ứng xuất hiện khi cuộn =====
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add('in'), io.unobserve(en.target))),
  { threshold: 0.12 }
);
$$('.reveal').forEach((el) => io.observe(el));

// ===== Slider đánh giá =====
const track = $('#testimonials');
const dots = $('#dots');
let slide = 0;
dots.innerHTML = testimonials.map((_, i) => `<button role="tab" aria-label="Đánh giá ${i + 1}"></button>`).join('');
const go = (i) => {
  slide = (i + testimonials.length) % testimonials.length;
  track.style.transform = `translateX(-${slide * 100}%)`;
  $$('button', dots).forEach((b, j) => b.setAttribute('aria-selected', j === slide));
};
$$('button', dots).forEach((b, i) => b.addEventListener('click', () => go(i)));
go(0);
let timer = setInterval(() => go(slide + 1), 5000);
$('#slider').addEventListener('mouseenter', () => clearInterval(timer));
$('#slider').addEventListener('mouseleave', () => (timer = setInterval(() => go(slide + 1), 5000)));

// ===== Chọn dịch vụ → tự điền form =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-book]');
  if (btn) $('#b-service').value = btn.dataset.book;
});

// ===== Form: validate + gửi =====
const PHONE_RE = /^0\d{9}$/;
const setError = (input, msg) => {
  const field = input.closest('.field');
  field.classList.toggle('invalid', !!msg);
  $('.error', field).textContent = msg;
  return !msg;
};

const validate = (form) => {
  const name = form.elements.name;
  const phone = form.elements.phone;
  const phoneVal = phone.value.replace(/[\s.]/g, '');
  let ok = setError(name, name.value.trim().length < 2 ? 'Vui lòng nhập họ và tên.' : '');
  ok = setError(phone, !phoneVal ? 'Vui lòng nhập số điện thoại.' : !PHONE_RE.test(phoneVal) ? 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.' : '') && ok;

  const time = form.elements.time;
  if (time && time.value) {
    const d = new Date(time.value);
    const h = d.getHours() + d.getMinutes() / 60;
    const msg = d < new Date() ? 'Vui lòng chọn thời gian trong tương lai.' : h < 9 || h > 20.5 ? 'Vui lòng chọn giờ trong khoảng 9:00 – 20:30.' : '';
    ok = setError(time, msg) && ok;
  }
  return ok;
};

$$('#booking, #consult').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = $('.form__msg', form);
    if (!validate(form)) {
      msg.textContent = '';
      $('.invalid input', form)?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    console.log('Đơn đặt lịch:', data);
    msg.textContent = 'Đặt lịch thành công! Chúng tôi sẽ gọi lại sớm.';
    alert('Đặt lịch thành công! Chúng tôi sẽ gọi lại sớm.');
    form.reset();
  });
  // Xóa lỗi khi người dùng sửa
  form.addEventListener('input', (e) => e.target.closest('.field.invalid') && setError(e.target, ''));
});
