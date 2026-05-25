const menuBtn=document.getElementById('menuBtn');
const sidebar=document.getElementById('sidebar');
const overlay=document.getElementById('overlay');
function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
}
function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}
menuBtn.addEventListener('click',openMenu);
overlay.addEventListener('click',closeMenu);