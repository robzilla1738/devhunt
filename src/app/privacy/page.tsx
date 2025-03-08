import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DevHunt - learn how we handle your data',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Introduction</h2>
        <p>
          Welcome to DevHunt. We respect your privacy and are committed to protecting your personal data. 
          This Privacy Policy will inform you about how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">The Data We Collect About You</h2>
        <p>
          Personal data means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          <li><strong>Profile Data</strong> includes your username and password, projects created, comments, forum posts, and feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>To register you as a new user</li>
          <li>To manage our relationship with you</li>
          <li>To enable you to participate in platform features</li>
          <li>To administer and protect our business and this website</li>
          <li>To deliver relevant website content to you</li>
          <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Third-Party Authentication</h2>
        <p>
          We use third-party authentication providers like Google and GitHub to enable you to create an account and sign in to our platform. When you choose to authenticate using a third-party provider, we may collect personal information that your privacy settings with that provider permit us to access.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Right to withdraw consent</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-8">
          <a href="mailto:privacy@devhunt.vercel.app" className="text-blue-600 hover:underline">
            privacy@devhunt.vercel.app
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