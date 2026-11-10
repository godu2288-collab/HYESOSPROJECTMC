// ===== ДАННЫЕ =====
const genres = [
  {
    id: "hardcore",
    name: "Хоррор",
    desc: "Атмосферные сборки с упором на страх и выживание."
  },
  {
    id: "vanilla",
    name: "Vanilla+",
    desc: "Оптимизация и улучшения без смены геймплея."
  }
];

const packs = [
  {
    id: "VERITY1.0",
    genre: "hardcore",
    name: "VERITY",
    short: "Атмосферный хоррор: темнота, звуки, верити, сюжет.",
    image: "https://placehold.co/320x180/1b1f24/8a94a3?text=Horror+Pack",
    mcVersion: "1.20.1",
    loader: "forge",
    loaderVersion: "Forge",
    size: "~200 МБ",
    ram: "6 ГБ",
    download: "https://disk.yandex.ru/d/bkITZwzXfrlX1Q",
    instructions: [
      "Скачайте архив по кнопке выше.",
      "Установите Forge 1.20.1 в лаунчере (кнопка «Установить»).",
      "Запустите игру один раз, закройте.",
      "За инструкцией по настройки мода, обратитесь ко мне.",
      "Скопируйте моды в <code>.minecraft/mods</code>, папку <code>config</code> — в корень <code>.minecraft</code>."
    ],
    hint: "Играйте в наушниках — большая часть атмосферы построена на звуке."
  },
  {
    id: "horror-1-20-1",
    genre: "hardcore",
    name: "HP HORROR4.0 Stable",
    short: "Классический хоррор на Forge 1.20.1: монстры, тьма, паранойя.",
    image: "https://placehold.co/320x180/1b1f24/8a94a3?text=Horror+1.20.1",
    mcVersion: "1.20.1",
    loader: "forge",
    loaderVersion: "Forge",
    size: "~180 МБ",
    ram: "8 ГБ",
    download: "https://disk.yandex.ru/d/b-NYCeHOEm1toA",
    instructions: [
      "Скачайте архив по кнопке выше.",
      "Установите Forge 1.20.1 в лаунчере.",
      "Запустите игру один раз, закройте.",
      "Скопируйте моды в <code>.minecraft/mods</code>, конфиги — в <code>.minecraft/config</code>."
    ],
    hint: "Не отключайте звук — на нём держится половина страха."
  },
  {
    id: "vanilla-plus",
    genre: "vanilla",
    name: "Vanilla+",
    short: "Оптимизация, шейдеры и QoL-моды на Fabric 1.21.11.",
    image: "https://placehold.co/320x180/1b1f24/8a94a3?text=Vanilla%2B",
    mcVersion: "1.21.11",
    loader: "fabric",
    loaderVersion: "Fabric",
    size: "~90 МБ",
    ram: "3 ГБ",
    download: "https://example.com/vanilla-plus.zip",
    instructions: [
      "Скачайте архив по кнопке выше.",
      "Установите Fabric 1.21.11 в лаунчере.",
      "Запустите игру один раз, закройте.",
      "Скопируйте моды в <code>.minecraft/mods</code>, шейдеры — в <code>.minecraft/shaderpacks</code>."
    ],
    hint: "Геймплей не меняется — только FPS, графика и удобство."
  }
];

// ===== РОУТИНГ =====
const app = document.getElementById("app");

function showHome() {
  app.innerHTML = `
    <h1 class="page-title">Жанры</h1>
    <p class="page-sub">Выберите категорию сборок</p>
    <div class="grid">
      ${genres.map(g => {
        const count = packs.filter(p => p.genre === g.id).length;
        return `
          <div class="card" onclick="showGenre('${g.id}')">
            <div class="card-title">${g.name}</div>
            <div class="card-desc">${g.desc}</div>
            <div class="badges"><span class="badge">${count} сборок</span></div>
          </div>`;
      }).join("")}
    </div>
  `;
  window.scrollTo(0, 0);
}

function showGenre(genreId) {
  const g = genres.find(x => x.id === genreId);
  if (!g) {
    showHome();
    return;
  }
  const list = packs.filter(p => p.genre === genreId);
  app.innerHTML = `
    <button class="back-btn" onclick="showHome()">Назад</button>
    <h1 class="page-title">${g.name}</h1>
    <p class="page-sub">${g.desc}</p>
    <div class="grid">
      ${list.length
        ? list.map(p => packCard(p)).join("")
        : `<p class="page-sub">Пока нет сборок в этом жанре.</p>`}
    </div>
  `;
  window.scrollTo(0, 0);
}

function packCard(p) {
  return `
    <div class="card" onclick="showPack('${p.id}')">
      <div class="card-title">${p.name}</div>
      <div class="card-desc">${p.short}</div>
      <div class="badges">
        <span class="badge">${p.mcVersion}</span>
        <span class="badge loader-${p.loader}">${p.loaderVersion}</span>
      </div>
    </div>`;
}

function showPack(packId) {
  const p = packs.find(x => x.id === packId);
  if (!p) {
    showHome();
    return;
  }
  app.innerHTML = `
    <button class="back-btn" onclick="showGenre('${p.genre}')">Назад</button>
    <div class="pack-header">
      <img src="${p.image}" alt="${p.name}">
      <div class="pack-info">
        <h2>${p.name}</h2>
        <p class="short">${p.short}</p>
        <table class="meta-table">
          <tr><td>Версия Minecraft</td><td>${p.mcVersion}</td></tr>
          <tr><td>Загрузчик</td><td>${p.loaderVersion}</td></tr>
          <tr><td>Размер</td><td>${p.size}</td></tr>
          <tr><td>ОЗУ</td><td>${p.ram}</td></tr>
        </table>
        <a class="download-btn" href="${p.download}" target="_blank" rel="noopener">Скачать</a>
      </div>
    </div>

    <div class="instructions">
      <h3>Установка</h3>
      <ol>
        ${p.instructions.map(s => `<li>${s}</li>`).join("")}
      </ol>
      ${p.hint ? `<div class="hint">${p.hint}</div>` : ""}
    </div>
  `;
  window.scrollTo(0, 0);
}

// ===== СТАРТ =====
showHome();
