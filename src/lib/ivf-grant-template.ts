/**
 * Draft-first IVF/family-building eligibility inquiry.
 *
 * This intentionally contains no PHI, medical attachments, donor/clinic IDs,
 * or retailer links. It is a starting point for Eric and Ashley to approve
 * before any send. Keep the subject ASCII-safe because it may travel through
 * older intake systems and mail clients.
 */
export type IvfGrantTemplateId = "ivf-grant-inquiry";

export function isIvfGrantTemplateId(id: string): id is IvfGrantTemplateId {
  return id === "ivf-grant-inquiry";
}

export function getIvfGrantTemplate(id: IvfGrantTemplateId): {
  subject: string;
  html: string;
  text: string;
} {
  if (id !== "ivf-grant-inquiry") {
    throw new Error(`Unknown IVF template: ${id}`);
  }

  return {
    subject: "IVF grant eligibility question - Eric and Ashley Schaefer",
    text: `Hello {{Name}},

My wife Ashley and I are a married couple in Honolulu seeking information about current family-building grants and assistance programs.

Could you please tell us whether your current program accepts inquiries for donor-egg IVF and/or a gestational-carrier path, and what the first eligibility step is? We would also appreciate the current application window, required clinician forms, fees, and whether an inquiry can be reviewed before any treatment begins.

We are not attaching medical records or personal identifiers in this first question. We can provide only the documents your official process requires after we understand the eligibility route and have reviewed it together.

For general public background, Eric is also the author of P48X and a faith-based creator. That context is separate from this request; our question here is only about family-building eligibility.

Thank you for your time. If another person handles eligibility questions, would you please forward this or share the correct contact?

Eric and Ashley Schaefer
Honolulu, Hawaii
Reply to this email or contact elionreigns@gmail.com
https://coralcrownsolutions.com/ivf/`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>IVF grant eligibility question</title>
</head>
<body style="margin:0;background:#f5f7fb;color:#172033;font-family:Arial,Helvetica,sans-serif;line-height:1.6;">
  <div style="max-width:620px;margin:0 auto;padding:28px 16px;">
    <div style="background:#ffffff;border:1px solid #dbe4ee;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(23,32,51,.08);">
      <div style="background:linear-gradient(135deg,#173b5f,#276b75);color:#ffffff;padding:28px 30px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.86;">Family-building inquiry</p>
        <h1 style="margin:0;font-size:26px;line-height:1.2;">IVF grant eligibility question</h1>
        <p style="margin:12px 0 0;font-size:14px;opacity:.92;">A brief first question from Eric and Ashley Schaefer</p>
      </div>
      <div style="padding:30px;">
        <p style="margin:0 0 18px;">Hello {{Name}},</p>
        <p style="margin:0 0 18px;">My wife Ashley and I are a married couple in Honolulu seeking information about current family-building grants and assistance programs.</p>
        <p style="margin:0 0 18px;">Could you please tell us whether your current program accepts inquiries for <strong>donor-egg IVF</strong> and/or a <strong>gestational-carrier path</strong>, and what the first eligibility step is? We would also appreciate the current application window, required clinician forms, fees, and whether an inquiry can be reviewed before any treatment begins.</p>
        <div style="margin:22px 0;padding:18px 20px;background:#eef6f7;border-left:4px solid #276b75;border-radius:10px;color:#24414b;"><strong>Privacy note:</strong> We are not attaching medical records or personal identifiers in this first question. We can provide only the documents your official process requires after we understand the eligibility route and have reviewed it together.</div>
        <p style="margin:0 0 18px;">For general public background, Eric is also the author of <strong>P48X</strong> and a faith-based creator. That context is separate from this request; our question here is only about family-building eligibility.</p>
        <p style="margin:0 0 22px;">Thank you for your time. If another person handles eligibility questions, would you please forward this or share the correct contact?</p>
        <div style="padding-top:20px;border-top:1px solid #e5eaf0;font-size:14px;color:#526174;"><strong style="color:#172033;">Eric and Ashley Schaefer</strong><br>Honolulu, Hawaii<br><a href="mailto:elionreigns@gmail.com" style="color:#276b75;">elionreigns@gmail.com</a><br><a href="https://coralcrownsolutions.com/ivf/" style="color:#276b75;">Public family-building overview</a></div>
      </div>
    </div>
    <p style="margin:14px 0 0;text-align:center;font-size:11px;color:#7b8798;">Draft template for human review. No medical attachments are included.</p>
  </div>
</body>
</html>`,
  };
}
