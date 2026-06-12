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
      from: "FamilyWay <contato@familyway.tur.br>",
      to: "wetzel.88@gmail.com",
      replyTo: email,
      subject: `🌎 Novo lead FamilyWay - ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f6f8fb;padding:40px;">
          
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            
            <!-- HEADER -->
            <div style="background:#0F4C81;color:#fff;padding:20px;text-align:center;">
              <h2 style="margin:0;">✈️ Nova solicitação FamilyWay</h2>
            </div>

            <!-- BODY -->
            <div style="padding:24px;">

              <p><strong>Nome:</strong> ${name}</p>

              <p><strong>Telefone:</strong> ${dialCode || ""} ${phone}</p>

              <p><strong>País:</strong> ${country || "Não informado"}</p>

              <p><strong>E-mail:</strong> ${email}</p>

              <p><strong>Destino:</strong> ${destination || "Não informado"}</p>

              <p><strong>Data da viagem:</strong> ${travelDate || "Não informada"}</p>

              <!-- BOTÕES -->
              <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px;">

                <!-- RESPONDER EMAIL -->
                <a href="mailto:${email}?subject=Resposta FamilyWay"
                   style="
                    display:inline-block;
                    background:#0F4C81;
                    color:#fff;
                    padding:12px 16px;
                    border-radius:8px;
                    text-decoration:none;
                    font-weight:bold;
                    text-align:center;
                   ">
                  ✉️ Responder cliente
                </a>

                <!-- WHATSAPP -->
                <a href="https://wa.me/${(dialCode || "").replace("+", "")}${phone.replace(/\D/g, "")}"
                   target="_blank"
                   style="
                    display:inline-block;
                    background:#25D366;
                    color:#fff;
                    padding:12px 16px;
                    border-radius:8px;
                    text-decoration:none;
                    font-weight:bold;
                    text-align:center;
                   ">
                  💬 Abrir WhatsApp
                </a>

              </div>

            </div>

            <!-- FOOTER -->
            <div style="background:#f1f5f9;padding:16px;text-align:center;font-size:12px;color:#64748b;">
              Enviado automaticamente pelo site FamilyWay
            </div>

          </div>
        </div>
      `,
    });

    await resend.emails.send({
  from: "FamilyWay <contato@familyway.tur.br>",
  to: email,
  subject: "Recebemos sua solicitação ✈️",
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

      <div style="background:#0F4C81;color:#ffffff;padding:24px;text-align:center;">
        <h2 style="margin:0;">Obrigado pelo contato!</h2>
      </div>

      <div style="padding:32px;color:#334155;line-height:1.7;">

        <p>Olá <strong>${name}</strong>,</p>

        <p>
          Recebemos sua solicitação através do site da FamilyWay.
        </p>

        <p>
          Nossa equipe analisará as informações enviadas e retornará o contato o mais breve possível.
        </p>

        <p>
          Enquanto isso, fique à vontade para responder este e-mail ou falar conosco pelo WhatsApp caso tenha alguma dúvida adicional.
        </p>

        <p style="margin-top:32px;">
          ✈️ <strong>Você viaja. Nossa família cuida.</strong>
        </p>

      </div>

      <div style="background:#f8fafc;padding:20px;text-align:center;font-size:12px;color:#64748b;">
        FamilyWay — Atendimento online para Brasil e Exterior
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