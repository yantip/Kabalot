import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Kabalot",
  description: "Privacy Policy describing how Kabalot collects, uses, stores, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" effectiveDate="March 24, 2026" lastUpdated="March 24, 2026">
      <h2>1. Scope</h2>
      <p>
        This Privacy Policy explains how Kabalot ("Kabalot", "we", "our", or "us") collects, uses, discloses, and
        protects personal data when you use our website, applications, APIs, and related services (the "Service").
      </p>

      <h2>2. Data We Collect</h2>
      <p>Depending on how you use the Service, we may collect:</p>
      <ul>
        <li>
          Account and identity data: name, email address, login credentials, and profile details you provide.
        </li>
        <li>
          Billing and transaction data: subscription plan, billing status, payment metadata, and processor transaction
          IDs (we do not store full payment card numbers).
        </li>
        <li>
          Content data: receipts, invoice files, extracted fields, categories, project metadata, and notes you upload
          or generate through the Service.
        </li>
        <li>
          Technical data: IP address, user-agent, approximate location, device identifiers, and logs for security and
          diagnostics.
        </li>
        <li>
          Usage analytics: feature usage, clicks, events, performance metrics, and product interactions.
        </li>
        <li>
          Communication data: support emails, webhook payload logs, and messaging integration metadata (for example,
          Telegram identifiers where integration is enabled).
        </li>
      </ul>

      <h2>3. Sources of Data</h2>
      <ul>
        <li>Directly from you (account creation, uploads, and support requests).</li>
        <li>Automatically from your use of the Service (cookies, logs, analytics tools).</li>
        <li>From service providers and integrations you connect or authorize.</li>
      </ul>

      <h2>4. Legal Bases for Processing</h2>
      <p>Where required by law, we process personal data under one or more legal bases:</p>
      <ul>
        <li>Performance of contract (providing the Service you requested).</li>
        <li>Legitimate interests (security, fraud prevention, analytics, product improvement).</li>
        <li>Compliance with legal obligations.</li>
        <li>Consent (for optional processing where legally required).</li>
      </ul>

      <h2>5. How We Use Data</h2>
      <ul>
        <li>To provide, maintain, secure, and improve the Service.</li>
        <li>To process subscriptions, invoices, and payment-related events.</li>
        <li>To extract and organize receipt information and generate user-requested outputs.</li>
        <li>To send transactional messages, service notices, and support responses.</li>
        <li>To detect abuse, fraud, unauthorized access, and other policy violations.</li>
        <li>To comply with legal requests and enforce our terms and policies.</li>
      </ul>

      <h2>6. Cookies and Similar Technologies</h2>
      <p>
        We may use cookies, local storage, and similar technologies for authentication, session management, security,
        and analytics. You can control cookie settings through your browser; disabling certain cookies may affect
        Service functionality.
      </p>

      <h2>7. Data Sharing and Disclosure</h2>
      <p>We may share data in the following limited circumstances:</p>
      <ul>
        <li>With infrastructure and hosting providers that process data on our behalf.</li>
        <li>With payment processors for billing and fraud prevention.</li>
        <li>With messaging, analytics, and support providers necessary to operate the Service.</li>
        <li>When required by law, legal process, or competent authority request.</li>
        <li>To protect rights, safety, and security of users, Kabalot, and the public.</li>
        <li>In connection with a merger, acquisition, restructuring, or asset sale.</li>
      </ul>
      <p>We do not sell personal data for money.</p>

      <h2>8. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries other than your own. Where required, we implement
        legally recognized safeguards for cross-border data transfers.
      </p>

      <h2>9. Data Retention</h2>
      <p>
        We retain personal data only as long as needed for the purposes described in this policy, including contractual
        obligations, legal compliance, dispute resolution, and enforcement. Retention periods vary by data category and
        account status.
      </p>

      <h2>10. Security Measures</h2>
      <p>
        We apply commercially reasonable administrative, technical, and organizational safeguards to protect personal
        data, including access controls, encryption in transit, logging, and least-privilege principles. No system is
        100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>11. Your Privacy Rights</h2>
      <p>Depending on your jurisdiction, you may have rights to:</p>
      <ul>
        <li>Access, correct, or delete personal data.</li>
        <li>Request portability of your data.</li>
        <li>Restrict or object to certain processing.</li>
        <li>Withdraw consent where processing relies on consent.</li>
        <li>File a complaint with a supervisory authority.</li>
      </ul>
      <p>
        To exercise rights, contact <a href="mailto:support@kabalot.app">support@kabalot.app</a>. We may verify your
        identity before fulfilling requests.
      </p>

      <h2>12. Children&apos;s Privacy</h2>
      <p>
        The Service is not directed to children under 18, and we do not knowingly collect personal data from children.
        If we become aware of such collection, we will take reasonable steps to delete the data.
      </p>

      <h2>13. Third-Party Links and Services</h2>
      <p>
        The Service may link to or integrate with third-party services not operated by us. Their privacy practices are
        governed by their own policies, and we encourage you to review them.
      </p>

      <h2>14. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy periodically. Material updates will be posted on this page with an updated "Last
        updated" date. Continued use of the Service after updates become effective means you accept the updated policy.
      </p>

      <h2>15. Contact</h2>
      <p>
        For privacy questions or requests, contact{" "}
        <a href="mailto:support@kabalot.app">support@kabalot.app</a>.
      </p>
    </LegalPageShell>
  );
}
