'use server'

import { render } from "@react-email/render";
import { sendEmail } from "../lib/emails";
import { Contact, User, UserVerification } from "@prisma/client";
import NewUserWelcomeEmail from "../emails/NewUserWelcome";

export async function sendWelcomeEmail(
    { username, forename, surname }: User,
    { email }: Contact,
    { id: authKey, verificationCode: authVal }: UserVerification
) {
    const resp = await sendEmail({
        to: email ?? '',
        subject: `Welcome to GoLearn, ${forename} ${surname}`,
        html: render(NewUserWelcomeEmail({ username, authKey, authVal })),
    });

    if (resp.accepted)
        return { message: "Email sent successfully" };
}

export async function sendPasswordResetEmail(
    { username, forename, surname }: User,
    { email }: Contact,
    { id: authKey, verificationCode: authVal }: UserVerification
) {
    const resp = await sendEmail({
        to: email ?? '',
        subject: `Password reset for GoLearn, ${forename} ${surname}`,
        html: render(NewUserWelcomeEmail({ username, authKey, authVal })),
    });

    if (resp.accepted)
        return { message: "Email sent successfully" };
}