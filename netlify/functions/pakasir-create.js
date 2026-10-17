exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  try {
    const { usd, email } = JSON.parse(event.body || '{}');
    if (!usd || !email) return { statusCode: 400, headers, body: JSON.stringify({ error: 'usd & email wajib' }) };

    const amount = Math.round(parseFloat(usd) * 17800);

    const res = await fetch('https://pakasir.com/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Slug': process.env.PAKASIR_SLUG,
        'X-Api-Key': process.env.PAKASIR_API_KEY
      },
      body: JSON.stringify({
        order_id: `DLR-${Date.now()}`,
        amount: amount,
        customer_email: email,
        customer_name: email,
        description: `Beli $${usd} = Rp${amount.toLocaleString('id-ID')}`
      })
    });

    const result = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(result) };

  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
