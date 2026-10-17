exports.handler = async (event) => {
  console.log('PAKASIR WEBHOOK:', event.body);
  // Kalau status paid, di sini auto kirim barang / WA / email
  // const data = JSON.parse(event.body);
  // if(data.status === 'paid') { ... }
  return { statusCode: 200, body: 'OK' };
};
