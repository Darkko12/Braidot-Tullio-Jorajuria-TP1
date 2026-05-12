  /* ── ACCORDION ─────────────────────────────── */
  function toggleAcc(id) {
    const body = document.getElementById(id);
    const btn  = document.getElementById(id + '-btn');
    const icon = document.getElementById(id + '-icon');
    const open = body.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  /* ── CARRUSEL TALLERES ─────────────────────── */
  (function() {
    const track   = document.getElementById('tallTrack');
    const total   = track.children.length;
    const AUTO_MS = 4500;
    let current   = 0;
    let timer     = null;

    function go(idx) {
      current = ((idx % total) + total) % total;
      track.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1)';
      track.style.transform  = `translateX(-${current * 100}%)`;
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => go(current + 1), AUTO_MS);
    }

    go(0);
    startAuto();
  })();

  /* ── CARRUSEL PRODUCTORES ──────────────────── */
  (function() {
    const track    = document.getElementById('prodTrack');
    const slides   = Array.from(track.children);
    const total    = slides.length;
    const fill     = document.getElementById('prodProgress');
    const AUTO_MS  = 4000;

    let current = 0;
    let timer   = null;
    let fillTimer = null;

    function go(idx) {
      current = ((idx % total) + total) % total;
      track.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1)';
      track.style.transform  = `translateX(-${current * 100}%)`;
      startFill();
    }

    function startFill() {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      clearTimeout(fillTimer);
      fillTimer = setTimeout(() => {
        fill.style.transition = `width ${AUTO_MS}ms linear`;
        fill.style.width = '100%';
      }, 30);
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => go(current + 1), AUTO_MS);
    }

    go(0);
    startAuto();
  })();

  /* ── MODAL ──────────────────────────────────── */
  function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('nombre').focus(), 350);
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  function highlight(id) {
    const el = document.getElementById(id);
    el.style.borderColor = 'var(--red)';
    el.style.boxShadow   = '0 0 0 3px rgba(192,18,18,.15)';
    el.focus();
    setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
  }

  function handleSubmit() {
    const nombreVal   = document.getElementById('nombre').value.trim();
    const emailVal    = document.getElementById('email').value.trim();
    const diaVal      = document.getElementById('dia').value;

    if (!nombreVal)                          { highlight('nombre');   return; }
    if (!emailVal || !emailVal.includes('@')){ highlight('email');    return; }
    if (!diaVal)                             { highlight('dia');      return; }

    const primerNombre = nombreVal.split(' ')[0];
    const diaTexto     = diaVal === '24' ? 'jueves 24 de julio' : 'viernes 25 de julio';

    document.getElementById('successTitle').innerHTML =
      '¡Listo, <span class="success-name">' + primerNombre + '</span>!';
    document.getElementById('successMsg').innerHTML =
      'Tu reserva para el <strong>' + diaTexto + '</strong> está confirmada.<br><br>' +
      'En breve vas a recibir el comprobante en <span class="success-email">' + emailVal + '</span> ' +
      'desde <strong>hola@paulinacocina.net</strong>.<br><br>' +
      '¡Nos vemos en el Mercado "Sabe la Tierra"!';

    document.getElementById('modalFormBody').style.display = 'none';
    document.getElementById('modalSuccess').classList.add('visible');
  }
