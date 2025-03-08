import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DevHunt - our terms and conditions',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">1. Introduction</h2>
        <p>
          Welcome to DevHunt ("we," "our," or "us"). By accessing or using our platform, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">2. Eligibility</h2>
        <p>
          To use our platform, you must be at least 13 years old. By using DevHunt, you represent and warrant that you meet this eligibility requirement.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">3. User Accounts</h2>
        <p>
          To access certain features of the platform, you'll need to create an account. You are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Providing accurate and complete information during the registration process</li>
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
        </ul>
        <p>
          You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">4. User Content</h2>
        <p>
          You retain ownership of any content you submit to the platform, including project descriptions, comments, forum posts, and profile information ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for the purpose of providing and promoting our services.
        </p>
        <p>
          You represent and warrant that:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>You own or have the necessary rights to the User Content you post</li>
          <li>Your User Content doesn't violate the rights of any third party</li>
          <li>Your User Content doesn't violate any applicable laws or regulations</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">5. Prohibited Conduct</h2>
        <p>
          You agree not to:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Use the platform for any illegal purpose</li>
          <li>Post content that is harmful, offensive, or violates the rights of others</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the platform or servers</li>
          <li>Attempt to gain unauthorized access to any part of the platform</li>
          <li>Use the platform to distribute spam or malware</li>
          <li>Scrape or collect data from the platform without permission</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">6. Intellectual Property</h2>
        <p>
          The platform, including its design, graphics, code, and content (excluding User Content), is owned by us and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the platform without our prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the platform at any time, with or without cause, and with or without notice. Upon termination, your right to use the platform will immediately cease.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">8. Disclaimer of Warranties</h2>
        <p>
          THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">10. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. If we make material changes, we'll provide notice through the platform or by other means. Your continued use of the platform after any changes indicates your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">12. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mb-8">
          <a href="mailto:terms@devhunt.vercel.app" className="text-blue-600 hover:underline">
            terms@devhunt.vercel.app
          </a>
        </p>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 