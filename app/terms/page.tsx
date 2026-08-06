import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The Terms of Service governing your use of BloxMind — the context-aware desktop AI agent for Roblox Studio.',
}

const POLICIES = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By downloading, installing, or using BloxMind ("the Software"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Software.',
    ],
  },
  {
    title: '2. License',
    body: [
      'We grant you a limited, non-exclusive, non-transferable, revocable license to use the Software for personal or commercial purposes in connection with Roblox Studio development, subject to these Terms.',
      'You may not resell, sublicense, rent, or redistribute the Software without prior written consent.',
    ],
  },
  {
    title: '3. Acceptable Use',
    body: [
      'You agree not to use the Software to:',
      '• Violate any applicable law or regulation, including Roblox Terms of Service.',
      '• Develop malicious code, cheats, exploits, or content that harms Roblox or its community.',
      '• Attempt to reverse engineer, decompile, or extract the source code of the Software.',
    ],
  },
  {
    title: '4. AI-Generated Content',
    body: [
      'BloxMind uses third-party AI models to generate code and content. You are solely responsible for the output you generate, deploy, and publish using the Software.',
      'We do not warrant the accuracy, reliability, or safety of AI-generated code. Always review generated code before deployment.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'BloxMind and its logo are owned by BloxMind. The Software is provided "as is" and we retain all rights not expressly granted to you.',
    ],
  },
  {
    title: '6. Disclaimers & Limitation of Liability',
    body: [
      'THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      'IN NO EVENT SHALL BLOXMIND BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SOFTWARE.',
    ],
  },
  {
    title: '7. Termination',
    body: [
      'We may terminate or suspend your access to the Software at any time, without notice, for conduct that we believe violates these Terms or is harmful to others.',
    ],
  },
  {
    title: '8. Changes to These Terms',
    body: [
      'We reserve the right to modify these Terms at any time. We will update the "Last updated" date at the top of this page. Continued use of the Software after changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      'If you have any questions about these Terms, please contact us at support@bloxmind.ai.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 5, 2026">
      <p className="text-sm leading-relaxed">
        Welcome to BloxMind. These Terms of Service govern your use of the
        BloxMind application. Please read them carefully.
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