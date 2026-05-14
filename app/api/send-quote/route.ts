import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_c4dX7crJ_LhBKSqDHWURUQj19aUHhdwJ9');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const nombre = formData.get('nombre') as string;
    const correo = formData.get('correo') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const tipoProyecto = formData.get('tipoProyecto') as string;
    const gasto = formData.get('gasto') as string;
    const zona = formData.get('zona') as string;
    const tipoPanel = formData.get('tipoPanel') as string;
    const paneles = formData.get('paneles') as string;
    const inversion = formData.get('inversion') as string;
    const roi = formData.get('roi') as string;
    const recibo = formData.get('recibo') as File | null;

    let attachments = [];
    if (recibo && recibo.size > 0) {
      const arrayBuffer = await recibo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: recibo.name,
        content: buffer,
      });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #059669; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Cotización Solar - Renergy</h1>
        </div>
        <div style="padding: 32px; background-color: #f8fafc;">
          <h2 style="color: #0f172a; margin-top: 0;">Hola, ${nombre}</h2>
          <p style="color: #475569; line-height: 1.6;">Aquí tienes el resumen de tu cotización estimada para tu proyecto <strong>${tipoProyecto}</strong> en la zona <strong>${zona}</strong>.</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 8px; display: inline-block;">Detalles del Sistema</h3>
            <ul style="list-style: none; padding: 0; color: #334155; line-height: 2;">
              <li><strong>Gasto Bimestral Actual:</strong> $${Number(gasto).toLocaleString()} MXN</li>
              <li><strong>Tipo de Panel:</strong> ${tipoPanel}</li>
              <li><strong>Paneles Recomendados:</strong> ${paneles}</li>
              <li><strong>Inversión Estimada:</strong> $${Number(inversion).toLocaleString()} MXN</li>
              <li><strong>Retorno de Inversión (ROI):</strong> ${roi} años</li>
            </ul>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 16px; border-radius: 8px; border: 1px solid #a7f3d0; color: #065f46;">
            <p style="margin: 0; font-weight: bold;">Datos de Contacto Proporcionados:</p>
            <p style="margin: 4px 0 0 0;">WhatsApp: ${whatsapp} | Correo: ${correo}</p>
          </div>
          
          <p style="color: #475569; line-height: 1.6; margin-top: 24px;">Un asesor se pondrá en contacto contigo pronto para afinar los detalles y ofrecerte una propuesta formal.</p>
        </div>
        <div style="background-color: #0f172a; padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Renergy. Todos los derechos reservados.</p>
        </div>
      </div>
    `;

    // Send to company
    await resend.emails.send({
      from: 'Renergy <onboarding@resend.dev>',
      to: ['renergy.web@gmail.com'],
      subject: `Nueva Cotización: ${nombre} - ${tipoProyecto}`,
      html: htmlContent,
      attachments,
    });

    // Send to client
    await resend.emails.send({
      from: 'Renergy <onboarding@resend.dev>',
      to: [correo],
      subject: 'Tu Cotización Solar - Renergy',
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
