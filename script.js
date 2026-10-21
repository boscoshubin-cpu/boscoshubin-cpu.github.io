'use strict';
document.documentElement.classList.add('js');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const progress = document.querySelector('.progress');
const planet = document.querySelector('.planet-wrap');
const canvas = document.querySelector('#starfield');
const context = canvas.getContext('2d');
let paused = reducedMotion.matches;
let animationFrame = 0, previousFrame = 0, elapsed = 0;
let stars = [], width = 0, height = 0, heroVisible = true;
const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    entry.target.classList.add('visible'); revealObserver.unobserve(entry.target);
  }
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
function drawStars(time) {
  if (!context) return;
  context.clearRect(0, 0, width, height);
  for (const star of stars) {
    const twinkle = paused ? 0.8 : 0.7 + 0.3 * Math.sin(time * 0.0005 + star.phase);
    context.beginPath(); context.fillStyle = `rgba(211,221,204,${star.alpha * twinkle})`;
    context.arc(star.x, star.y, star.size, 0, Math.PI * 2); context.fill();
  }
}
function resizeCanvas() {
  if (!context) return;
  const ratio = Math.min(devicePixelRatio || 1, 2), bounds = canvas.getBoundingClientRect();
  width = bounds.width; height = bounds.height;
  canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: width < 680 ? 75 : 160 }, () => ({ x:Math.random()*width, y:Math.random()*height, size:Math.random()*1.1+0.25, phase:Math.random()*Math.PI*2, alpha:Math.random()*0.6+0.15 }));
  drawStars(elapsed);
}
function animate(time) {
  animationFrame = 0;
  if (paused || document.hidden || !heroVisible) return;
  if (previousFrame) elapsed += Math.min(time - previousFrame, 100);
  previousFrame = time; drawStars(elapsed); animationFrame = requestAnimationFrame(animate);
}
function syncAnimation() {
  cancelAnimationFrame(animationFrame); animationFrame = 0; previousFrame = 0;
  if (!paused && !document.hidden && heroVisible) animationFrame = requestAnimationFrame(animate);
}
function setMotion(value) {
  paused = value; document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
  motionButton.querySelector('span').textContent = paused ? '▷' : 'Ⅱ';
  planet.style.translate = ''; drawStars(elapsed); syncAnimation();
}
motionButton.addEventListener('click', () => setMotion(!paused));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
document.addEventListener('visibilitychange', syncAnimation);
new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncAnimation(); }).observe(document.querySelector('.hero'));
let scrollQueued = false;
function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;
  if (!paused && innerWidth > 680 && heroVisible) planet.style.translate = `0 ${Math.min(scrollY * 0.14, 100)}px`;
  scrollQueued = false;
}
addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas(); setMotion(paused); updateScroll();
const projects = {
  tap: { category:'BUILT WITH AI · CREATOR OPERATIONS', title:'TAP creator platform', description:'End-to-end tooling built around the practical needs of a TikTok affiliate campaign.', points:['A creator-facing application page.','Outreach copy to support campaign recruitment.','Progress tracking to keep creator operations connected.'] },
  click: { category:'INTERACTIVE EFFECT · TIKTOK', title:'TikTok Click Challenge', description:'An interactive Click Challenge effect built for a brand campaign on TikTok.', points:['A playful, participation-led format.','Designed around interaction with the campaign effect.','Contact me to learn more about the project.'] },
  discovery: { category:'AI WORKFLOW · CREATOR DISCOVERY', title:'Context before discovery.', description:'A knowledge-base-driven approach to finding and vetting creators who fit a specific client.', points:['Start with client materials, briefs and conversations.','Include past decisions and rejected creators as context.','Use that understanding to guide creator discovery and vetting.'] }
};
const dialog = document.querySelector('#project-dialog');
let dialogOpener;
document.querySelectorAll('.project-detail').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project]; if (!project) return;
  dialogOpener = button;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-points').replaceChildren(...project.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; }));
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); });
dialog.addEventListener('close', () => dialogOpener?.focus());
