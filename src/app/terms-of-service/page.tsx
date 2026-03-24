import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Terms of Service | Kabalot",
  description: "Terms of Service for using Kabalot receipt and expense management services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell title="Terms of Service" effectiveDate="March 24, 2026" lastUpdated="March 24, 2026">
      <h2>1. Agreement and Acceptance</h2>
      <p>
        These Terms of Service ("Terms") form a binding agreement between you and Kabalot ("Kabalot", "we", "our",
        or "us") governing your access to and use of our website, applications, APIs, and related services
        (collectively, the "Service"). By creating an account, accessing, or using the Service, you agree to these
        Terms and our Privacy Policy.
      </p>

      <h2>2. Eligibility and Account Registration</h2>
      <ul>
        <li>You must be at least 18 years old and capable of entering into a legal contract.</li>
        <li>You must provide accurate and complete account information and keep it current.</li>
        <li>You are responsible for safeguarding your credentials and for all activity on your account.</li>
        <li>You must promptly notify us of any unauthorized access or suspected security incident.</li>
      </ul>

      <h2>3. Service Description</h2>
      <p>
        Kabalot provides tools to upload, store, organize, and process receipts and related financial records for
        project and expense management. Features may include data extraction, categorization, integrations, exports,
        and communication tools such as Telegram notifications.
      </p>

      <h2>4. Subscription, Billing, and Payment Authorization</h2>
      <ul>
        <li>
          Certain features require a paid subscription. Pricing, billing cycles, and included limits are disclosed at
          checkout.
        </li>
        <li>
          By purchasing, you authorize us and our payment processors to charge your selected payment method for
          recurring and one-time fees, including taxes where applicable.
        </li>
        <li>
          Subscriptions renew automatically at the end of each billing period unless canceled before renewal.
        </li>
        <li>
          You are responsible for maintaining valid payment details. Failed charges may result in suspension or
          downgrade of paid features.
        </li>
      </ul>

      <h2>5. Trial Plans, Upgrades, and Downgrades</h2>
      <ul>
        <li>We may offer free trials or promotional plans subject to additional terms presented at sign-up.</li>
        <li>Upgrades may take effect immediately and include prorated billing where supported.</li>
        <li>
          Downgrades or cancellations take effect at the end of the current paid billing term unless otherwise stated.
        </li>
      </ul>

      <h2>6. Refunds and Cancellations</h2>
      <p>
        Refund handling is governed by our Refund Policy. By purchasing a subscription, you acknowledge and agree to
        the refund terms published on the Refund Policy page.
      </p>

      <h2>7. Acceptable Use</h2>
      <p>You agree not to misuse the Service. Prohibited conduct includes:</p>
      <ul>
        <li>Violating any applicable law, regulation, or third-party rights.</li>
        <li>Uploading malicious code, malware, or content intended to disrupt system integrity.</li>
        <li>Attempting unauthorized access to accounts, systems, or data.</li>
        <li>Reverse engineering, scraping, or abusing the Service beyond permitted API limits.</li>
        <li>Using the Service for fraud, money laundering, or deceptive commercial practices.</li>
      </ul>

      <h2>8. User Content and Data Rights</h2>
      <ul>
        <li>
          You retain ownership of content and data you upload ("User Content"). You grant us a limited license to
          host, process, and transmit User Content solely to provide and improve the Service.
        </li>
        <li>
          You represent that you have all necessary rights, permissions, and legal basis to upload and process User
          Content.
        </li>
        <li>
          We may generate derived metadata and analytics to operate, secure, and improve the Service, as described in
          our Privacy Policy.
        </li>
      </ul>

      <h2>9. Intellectual Property</h2>
      <p>
        The Service, including software, design, branding, text, and other materials (excluding your User Content),
        is owned by Kabalot or its licensors and protected by applicable intellectual property laws. No rights are
        granted except as explicitly stated in these Terms.
      </p>

      <h2>10. Third-Party Services and Integrations</h2>
      <p>
        The Service may integrate with third-party providers (including cloud infrastructure, messaging platforms, AI
        providers, and payment processors). Your use of third-party services may be subject to their separate terms and
        privacy notices, and we are not responsible for third-party services we do not control.
      </p>

      <h2>11. Availability, Changes, and Suspension</h2>
      <ul>
        <li>We may modify, suspend, or discontinue features at any time, with or without notice.</li>
        <li>
          We may suspend or restrict access if required for security, legal compliance, payment delinquency, or Terms
          violations.
        </li>
        <li>
          We use commercially reasonable efforts to maintain availability but do not guarantee uninterrupted operation.
        </li>
      </ul>

      <h2>12. Data Retention and Account Termination</h2>
      <ul>
        <li>You may close your account at any time through account settings or by contacting support.</li>
        <li>
          Upon termination, your right to access paid features ends immediately, and we may delete or anonymize account
          data after a commercially reasonable retention period, subject to legal obligations.
        </li>
      </ul>

      <h2>13. Disclaimers</h2>
      <p>
        The Service is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we
        disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose,
        title, and non-infringement. We do not provide legal, tax, accounting, or financial advice.
      </p>

      <h2>14. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Kabalot and its affiliates, officers, employees, and partners will not
        be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of
        profits, revenue, data, goodwill, or business opportunities. Our aggregate liability for claims arising out of
        or relating to the Service will not exceed the amount paid by you to Kabalot in the 12 months preceding the
        event giving rise to liability.
      </p>

      <h2>15. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Kabalot from and against claims, liabilities, damages,
        losses, and expenses (including reasonable legal fees) arising out of your use of the Service, User Content, or
        violation of these Terms or applicable law.
      </p>

      <h2>16. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms are governed by applicable laws of your operating jurisdiction, without regard to conflict-of-law
        principles. You and Kabalot agree to attempt to resolve disputes informally before filing formal proceedings.
      </p>

      <h2>17. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be posted on this page with an updated
        "Last updated" date. Continued use of the Service after changes become effective constitutes acceptance of the
        updated Terms.
      </p>

      <h2>18. Contact Information</h2>
      <p>
        For legal notices or questions, contact{" "}
        <a href="mailto:support@kabalot.app">support@kabalot.app</a>.
      </p>
    </LegalPageShell>
  );
}
