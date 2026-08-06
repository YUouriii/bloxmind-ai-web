import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'The Privacy Policy explaining how BloxMind collects, uses, and protects your information.',
}

const POLICIES = [
  {
    title: '1. Information We Collect',
    body: [
      '• Account & Usage Data: We do not require an account to use BloxMind. Anonymous usage metrics (e.g., feature adoption, error reports) may be collected to improve the product.',
      '• Code & Project Data: BloxMind reads and processes your Roblox project files locally on your device to generate code. We do not transmit your project source code to our servers.',
      '• AI Provider Data: When you use an AI provider (OpenAI, Anthropic, etc.), your prompts and code context are transmitted to the provider you select, subject to their respective privacy policies.',
    ],
  },
  {
    title: '2. How We Use Information',
    body: [
      'We use the information we collect to operate, maintain, and improve BloxMind, to provide customer support, and to respond to your requests.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    title: '3. Data Storage & Security',
    body: [
      'BloxMind stores local preferences and workspace history on your device. We implement reasonable technical and organizational measures to protect any data processed through our services.',
      'No system is 100% secure, and we cannot guarantee absolute security of any information you transmit.',
    ],
  },
  {
    title: '4. Third-Party Services',
    body: [
      'BloxMind integrates with third-party services including:',
      '• AI model providers (OpenAI, Anthropic, Google, etc.)',
      '• GitHub (for releases and repository access)',
      '• Roblox Studio and Rojo (for live sync)',
      'These services have their own privacy policies and data handling practices.',
    ],
  },
  {
    title: '5. Data Retention',
    body: [
      "We retain anonymized analytics data for as long as is necessary to improve the product. Workspace history stored locally remains under your control and can be deleted by clearing BloxMind's local storage.",
    ],
  },
  {
    title: "6. Children's Privacy",
    body: [
      'BloxMind is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us immediately.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'You may request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us at privacy@bloxmind.ai.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last updated" date at the top of this page.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      'If you have any questions about this Privacy Policy, please contact us at privacy@bloxmind.ai.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 5, 2026">
      <p className="text-sm leading-relaxed">
        This Privacy Policy explains how BloxMind collects, uses, and protects
        your information when you use our software.
      </p>
      {POLICIES.map((section) => (
        <section key={section.title} className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
          {section.body.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </LegalPage>
  )
}