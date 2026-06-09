import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("RESEND_API_KEY:", !!process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Método não permitido",
    });
  }

  try {
    const {
      name,
      phone,
      email,
      destination,
      travelDate,
    } = req.body;

    const { data, error } = await resend.emails.send({
      from: "FamilyWay <onboarding@resend.dev>",
      to: ["wetzel.88@gmail.com"],
      subject: "Nova solicitação pelo site FamilyWay",
      html: `
        <h2>Nova solicitação de contato</h2>

        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Destino:</strong> ${destination || "-"}</p>
        <p><strong>Data prevista:</strong> ${travelDate || "-"}</p>
      `,
    });

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Erro ao enviar e-mail",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Erro interno",
    });
  }
}