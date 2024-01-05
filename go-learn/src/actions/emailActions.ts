'use server'

import { render } from "@react-email/render";
import { sendEmail } from "../lib/emails";
import { NotionMagicLinkEmail } from "../emails/notion-magic-link";

export async function sendWelcomeEmail(
    { to }: { to: string },
) {
    const resp = await sendEmail({
        to: "bradleybeasley2000@gmail.com",
        subject: "Welcome to NextAPI",
        html: render(NotionMagicLinkEmail({ loginCode: '123456' })),
    });

    if (resp.accepted)
        return { message: "Email sent successfully" };
}