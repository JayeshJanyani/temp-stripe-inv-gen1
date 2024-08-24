import { Resend } from "resend";

// Ensure the API key is being read correctly
const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;

if (!apiKey) {
    throw new Error("Missing API key. Please set the RESEND_API_KEY environment variable.");
}

export const resend = new Resend(apiKey);

export const sendInvoiceEmail = async (pdfBuffer) => {
    console.log('sendInvoiceEmail',pdfBuffer)
    const { data, error } = await resend.emails.send({
        from: 'JJANYANI <contact@generateyourinvoice.com>',
        to: ['delivered@resend.dev'],
        subject: 'Hello world',
        attachments: [
            {
                filename: 'invoice.pdf',
                content: pdfBuffer
            }
        ]
    });

    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log("Email sent successfully:", data);
    }
};