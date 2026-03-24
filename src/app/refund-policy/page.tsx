import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Refund Policy | Kabalot",
  description: "Refund Policy for Kabalot subscriptions, billing disputes, and cancellation terms.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageShell title="Refund Policy" effectiveDate="March 24, 2026" lastUpdated="March 24, 2026">
      <h2>1. Policy Purpose</h2>
      <p>
        This Refund Policy describes when subscription or one-time charges for Kabalot may be refunded and the process
        for requesting refunds. This policy applies to purchases made directly through Kabalot.
      </p>

      <h2>2. Subscription Charges and Renewals</h2>
      <ul>
        <li>Paid plans are billed in advance on the billing cycle selected at checkout.</li>
        <li>Subscriptions renew automatically until canceled.</li>
        <li>
          You can cancel at any time from your billing settings; cancellation prevents future renewal charges.
        </li>
      </ul>

      <h2>3. Standard Refund Rule</h2>
      <p>
        Unless required by applicable consumer protection law, subscription fees are generally non-refundable once a
        billing cycle starts. Access remains active through the paid period after cancellation.
      </p>

      <h2>4. Cases Eligible for Refund Review</h2>
      <p>We may provide full or partial refunds, at our discretion, in cases such as:</p>
      <ul>
        <li>Duplicate charges caused by a payment processing error.</li>
        <li>Incorrect billing amount due to a technical malfunction.</li>
        <li>Confirmed unauthorized transaction reported promptly.</li>
        <li>Material and prolonged service outage attributable to Kabalot.</li>
      </ul>

      <h2>5. Non-Refundable Cases</h2>
      <ul>
        <li>Partial-month usage after a renewal is processed.</li>
        <li>Failure to cancel before automatic renewal.</li>
        <li>Change of mind after successful purchase and delivered access.</li>
        <li>Account suspension due to violations of our Terms of Service.</li>
      </ul>

      <h2>6. Refund Request Window</h2>
      <p>
        To be considered, refund requests should be submitted within 14 days of the relevant charge date unless local
        law mandates a different period.
      </p>

      <h2>7. How to Request a Refund</h2>
      <p>Send a request to <a href="mailto:support@kabalot.app">support@kabalot.app</a> with:</p>
      <ul>
        <li>Account email address.</li>
        <li>Date and amount of charge.</li>
        <li>Last 4 digits or transaction reference (do not send full card number).</li>
        <li>Reason for request and any supporting details.</li>
      </ul>
      <p>
        We aim to review requests within 5-10 business days. Approved refunds are returned to the original payment
        method and may take additional time based on bank or card network processing.
      </p>

      <h2>8. Chargebacks</h2>
      <p>
        Before initiating a chargeback with your bank or card issuer, contact us first so we can investigate and help
        resolve the issue quickly. Filing abusive or fraudulent chargebacks may result in service suspension.
      </p>

      <h2>9. Provider-Specific Terms</h2>
      <p>
        If your payment was processed by a third-party marketplace or app store, their refund and billing policies may
        apply in addition to this policy.
      </p>

      <h2>10. Policy Updates</h2>
      <p>
        We may update this policy from time to time. The latest version will always be available on this page with an
        updated "Last updated" date.
      </p>
    </LegalPageShell>
  );
}
