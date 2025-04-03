const Menu = require('../schemas/menu');

// Tạo cây menu cha - con
async function getMenuTree() {
  const menus = await Menu.find().lean();
  const map = {};
  const tree = [];

  menus.forEach(menu => {
    menu.children = [];
    map[menu._id] = menu;
  });

  menus.forEach(menu => {
    if (menu.parent && map[menu.parent]) {
      map[menu.parent].children.push(menu);
    } else {
      tree.push(menu);
    }
  });

  return tree;
}

// Render HTML ul > li
function renderMenuHTML(menuList) {
  let html = '<ul>';
  for (const item of menuList) {
    html += `<li><a href="${item.URL}">${item.text}</a>`;
    if (item.children && item.children.length > 0) {
      html += renderMenuHTML(item.children);
    }
    html += '</li>';
  }
  html += '</ul>';
  return html;
}

module.exports = {
  getMenuTree,
  renderMenuHTML
};
