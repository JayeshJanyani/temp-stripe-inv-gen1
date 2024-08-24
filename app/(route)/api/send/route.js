import { EmailTemplate } from '@/components/email-template/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;

if (!apiKey) {
  throw new Error("Missing API key. Please set the RESEND_API_KEY environment variable.");
}

export const resend = new Resend(apiKey);


// export async function POST() {
//     // console.log('sendInvoiceEmail',pdfBuffer)
//     const { data, error } = await resend.emails.send({
//         from: 'JJANYANI <contact@generateyourinvoice.com>',
//         to: ['delivered@resend.dev'],
//         subject: 'Hello world',
//         headers: {
//             'Access-Control-Allow-Origin': 'http://localhost:3000',
//           }
//         // attachments: [
//         //     {
//         //         filename: 'invoice.pdf',
//         //         content: Buffer.from(pdfBuffer, 'base64')
//         //     }
//         // // ]
//         // filename: 'invoice.pdf',
//         // content: pdfBuffer, // Attach the generated PDF data
//         // contentType: 'application/pdf',
//     });

//     if (error) {
//         console.error("Error sending email:", error);
//     } else {
//         console.log("Email sent successfully:", data);
//     }
//     return Response.json({ data }, { status: 200 });
// }



export async function POST(req) {
  const { to, subject, fileData } = req.body;
  console.log('fileData',fileData);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'janyanijayesh4@gmail.com',
      subject: `${subject}`,
      attachments: [
                     {
                         filename: 'invoice.pdf',
                         content: fileData
                     }
                 ]
    })
  });

  // if (res.ok) {
  //   const data = await res.json();
  //   return NextResponse.json(data);
  // }
  return NextResponse.json(res.json());
}