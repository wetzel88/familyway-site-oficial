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
      to: "contato@familyway.tur.br",
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
from: "FamilyWay contato@familyway.tur.br",
to: email,
subject: "Recebemos sua solicitação ✈️",
html: `

<div style="background:#0F4C81;padding:30px;text-align:center;"> <h1 style="margin:0;color:#ffffff;font-size:24px;"> Recebemos sua solicitação ✈️ </h1> </div> <div style="padding:40px 30px;color:#334155;line-height:1.7;"> <p style="margin-top:0;"> Olá <strong>${name}</strong>, </p> <p> Muito obrigado por entrar em contato com a FamilyWay. </p> <p> Recebemos sua solicitação com sucesso e em breve retornaremos para entender melhor seus planos e ajudar a construir a viagem ideal para você. </p> <p> Enquanto isso, caso prefira agilizar o atendimento, você também pode falar diretamente conosco pelo WhatsApp. </p> <div style="text-align:center;margin:35px 0;"> <a href="https://wa.me/5547991518026" style=" background:#F97316; color:#0F4C81; text-decoration:none; padding:14px 30px; border-radius:999px; font-weight:bold; font-size:16px; display:inline-block; " > 💬 Conversar pelo WhatsApp </a> </div> <div style="text-align:center;margin-top:40px;"> <img src="https://familyway.tur.br/logo-email.png" alt="FamilyWay" style=" width:220px; max-width:80%; height:auto; display:block; margin:0 auto; " /> </div> <p style=" text-align:center; color:#0F4C81; font-size:20px; font-weight:bold; margin-top:20px; margin-bottom:0; " > Você viaja. Nossa família cuida. </p> </div> <div style=" background:#f8fafc; border-top:1px solid #e2e8f0; padding:24px; text-align:center; " > <p style="margin:0;color:#64748b;font-size:14px;"> Atendimento online para clientes no Brasil e no exterior. </p> <p style="margin:10px 0 0 0;color:#64748b;font-size:14px;"> ✉️ contato@familyway.tur.br </p> <p style="margin:10px 0 0 0;"> <a href="https://instagram.com/familyway.tur" style=" color:#F97316; text-decoration:none; font-weight:bold; " > 📷 @familyway.tur </a> </p> </div>
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