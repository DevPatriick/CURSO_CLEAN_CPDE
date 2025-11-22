const nodemailer = require('nodemailer')

const nodemailerService = () => {
    const sendEmail = async ({
        date_borrow,
        date_return,
        name,
        CPF,
        email,
        book
    }) => {
        const transporter = nodemailer.createTransport({
            host: 'live.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: "smtp@mailtrap.io",
                pass: "020a6861d3a8eaab1017edad132326d1"
            }
        })
        
        const date_borrow_BR = new Date(date_borrow).toLocaleDateString('pt-BR', { timeZone: 'UTC'})
        const date_return_BR = new Date(date_return).toLocaleDateString('pt-BR', { timeZone: 'UTC'})
        const htmlBody = `
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f4f6f8; padding:24px;">
            <tr>
                <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 18px rgba(16,24,40,0.06);">
                    <!-- Header -->
                    <tr>
                    <td style="padding:20px 24px; text-align:left; background: linear-gradient(90deg,#5eead4,#60a5fa); color:#022c43;">
                        <h1 style="margin:0; font-size:20px;">📚 Biblioteca — Empréstimo Confirmado</h1>
                        <p style="margin:6px 0 0; font-size:13px; opacity:0.95;">Obrigado por usar nossa biblioteca — aqui estão os detalhes do seu empréstimo.</p>
                    </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                    <td style="padding:20px 24px;">
                        <p style="margin:0 0 12px; font-size:15px;">Olá <strong>${name}</strong> <span style="font-size:15px">(${CPF})</span> 👋,</p>

                        <div style="background:#f7fbff; border:1px solid #e6f0ff; padding:14px; border-radius:10px; margin-bottom:14px;">
                        <p style="margin:0 0 8px; font-weight:600;">📘 Livro:</p>
                        <p style="margin:0 0 6px; font-size:15px;"><strong>${book}</strong></p>
                        </div>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:14px;">
                        <tr>
                            <td style="vertical-align:top; padding-right:10px;">
                            <div style="padding:12px; border-radius:8px; background:#fff7ed; border:1px solid #ffedd5; text-align:center;">
                                <div style="font-size:20px; margin-bottom:4px;">📅</div>
                                <div style="font-size:13px; color:#92400e;">Retirada</div>
                                <div style="font-weight:600; margin-top:6px;">${date_borrow_BR}</div>
                            </div>
                            </td>
                            <td style="vertical-align:top;">
                            <div style="padding:12px; border-radius:8px; background:#f0fdf4; border:1px solid #dcfce7; text-align:center;">
                                <div style="font-size:20px; margin-bottom:4px;">🔁</div>
                                <div style="font-size:13px; color:#166534;">Devolução</div>
                                <div style="font-weight:600; margin-top:6px;">${date_return_BR}</div>
                            </div>
                            </td>
                        </tr>
                        </table>

                        <p style="margin:0 0 14px; font-size:14px; color:#0f172a;">
                        Desejamos uma ótima leitura! Se precisar renovar ou tiver qualquer dúvida, responda este e-mail ou visite sua conta na biblioteca. ✨
                        </p>

                        <div style="text-align:center; margin-top:6px;">
                        <a href="{{LIBRARY_URL}}" style="display:inline-block; text-decoration:none; padding:10px 18px; border-radius:8px; background:linear-gradient(90deg,#60a5fa,#7c3aed); color:#fff; font-weight:600;">Ver empréstimos 📖</a>
                        </div>
                    </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                    <td style="padding:16px 24px; background:#fbfdff; font-size:12px; color:#64748b; text-align:center;">
                        <div>📍 Biblioteca Patrick — Rua dos Andradas</div>
                        <div style="margin-top:6px;">Se você não reconhece este empréstimo, por favor nos contate imediatamente.</div>
                        <div style="margin-top:8px; font-size:11px; color:#94a3b8;">&copy; Biblioteca Patrick</div>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>

        `


        await transporter.sendMail({
            from: '"Library Patrick" <no-reply@demomailtrap.co>',
            to: 'andrade.patrickreis@gmail.com',
            subject: 'Novo livro emprestado',
            // text: `Olá ${name} (${CPF}), você pegou o livro '${book}' emprestado dia ${date_borrow_BR} com retorno para o dia ${date_return_BR}. Boa Leitura!`
            html: htmlBody
        })
    }

    return { sendEmail }
}

module.exports = { nodemailerService }
