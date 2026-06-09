import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    phone,
    country,
    dialCode,
    email,
    destination,
    travelDate,
  } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }

  try {
    await resend.emails.send({
      from: "FamilyWay <onboarding@resend.dev>",
      to: "wetzel.88@gmail.com",
      subject: `🌎 Novo lead FamilyWay - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:40px;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

            <div style="background:#0F4C81;color:#fff;padding:20px;text-align:center;">
              <h2 style="margin:0;">✈️ Nova solicitação FamilyWay</h2>
            </div>

            <div style="padding:24px;">

              <p><strong>Nome:</strong> ${name}</p>

              <p><strong>Telefone:</strong> ${dialCode || ""} ${phone}</p>

              <p><strong>País:</strong> ${country || "Não informado"}</p>

              <p><strong>E-mail:</strong> ${email}</p>

              <p><strong>Destino:</strong> ${
                destination || "Não informado"
              }</p>

              <p><strong>Data da viagem:</strong> ${
                travelDate || "Não informada"
              }</p>

            </div>

            <div style="background:#f1f5f9;padding:16px;text-align:center;font-size:12px;color:#64748b;">
              Enviado automaticamente pelo site FamilyWay
            </div>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return res.status(500).json({
      message: "Erro ao enviar e-mail",
    });
  }
}