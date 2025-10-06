import { createNavbar } from "./navbar.js";
createNavbar();
const p = document.createElement("p");
p.className = "poster-text";
const div = document.createElement("div");
div.className = "series-grid";
document.body.appendChild(p);
document.body.appendChild(div);
function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}
const grid = document.querySelector(".series-grid");
const heading = document.querySelector(".poster-text");
async function runSearch() {
    const title = getQueryParam("title") || "";
    const res = await fetch(`https://backend-toc-c7i6.onrender.com/search?title=${encodeURIComponent(title)}&scan_all=true`);
    const dataDict = await res.json();
    const items = Object.values(dataDict);
    grid.innerHTML = "";
    if (!items.length) {
        const p = document.createElement("p");
        p.textContent = "ไม่พบรายการ";
        grid.appendChild(p);
        return;
    }
    heading.textContent = `ผลการค้นหา: "${title}" ทั้งหมด ${items.length} รายการ`;
    items.forEach(s => {
        const card = document.createElement("div");
        card.className = "series-card";
        card.style.cursor = "pointer";
        card.onclick = () => (window.location.href = `detail.html?url=${encodeURIComponent(s.url)}`);
        const img = document.createElement("img");
        img.src = "https://backend-toc-c7i6.onrender.com/image-proxy?url=" +
            encodeURIComponent(s.poster);
        img.alt = s.title;
        img.loading = "lazy";
        const titleEl = document.createElement("p");
        titleEl.textContent = s.title;
        card.appendChild(img);
        card.appendChild(titleEl);
        grid.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    runSearch();
});
