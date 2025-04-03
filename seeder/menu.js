const mongoose = require('mongoose');
const Menu = require('../schemas/menu');

mongoose.connect('mongodb://localhost:27017/S5');

const seed = async () => {
  await Menu.deleteMany(); // xoá sạch trước khi seed

  // Tạo menu cha
  const gioiThieu = await Menu.create({ text: 'gioi thieu', URL: '/' });
  const phongBan = await Menu.create({ text: 'phong-ban-trung tam', URL: '/' });
  const khoaVien = await Menu.create({ text: 'khoa-vien', URL: '/' });

  // Menu con cho gioi thieu
  await Menu.create({ text: 'tong quan', URL: '/', parent: gioiThieu._id });
  await Menu.create({ text: 'lich su phat trien', URL: '/lich-su-phat-trien', parent: gioiThieu._id });

  // Menu con cho phong-ban-trung tam
  await Menu.create({ text: 'phong dao tao', URL: '/phong-dao-tao', parent: phongBan._id });
  await Menu.create({ text: 'phong CTSV', URL: '/phong-ctsv', parent: phongBan._id });
  await Menu.create({ text: 'phong tai chinh', URL: '/phong-tai-chinh', parent: phongBan._id });

  // Menu con cho khoa-vien
  await Menu.create({ text: 'khoa cntt', URL: '/khoa-cntt', parent: khoaVien._id });
  await Menu.create({ text: 'vien ki thuat', URL: '/vien-kt', parent: khoaVien._id });

  console.log('✅ Seed thành công!');
  process.exit();
};

seed();
