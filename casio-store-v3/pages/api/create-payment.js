import { MercadoPagoConfig, Preference } from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { items, buyer } = req.body;

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preference = new Preference(client);

  const mpItems = items.map((item) => ({
    id: String(item.product.id),
    title: item.variant
      ? `${item.product.name} - ${item.variant}`
      : item.product.name,
    quantity: item.qty,
    unit_price: item.product.price,
    currency_id: "MXN",
    picture_url: item.product.images[0] || "",
  }));

  try {
    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: buyer?.name || "",
          email: buyer?.email || "",
          phone: { number: buyer?.phone || "" },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pending`,
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
        statement_descriptor: "CASIO MEXICO",
        external_reference: `ORDER-${Date.now()}`,
      },
    });

    res.status(200).json({ init_point: result.init_point, id: result.id });
  } catch (err) {
    console.error("MP Error:", err);
    res.status(500).json({ error: "Error creando preferencia de pago" });
  }
}
