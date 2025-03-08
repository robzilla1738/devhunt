import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookies Policy',
  description: 'Cookies Policy for DevHunt - learn how we use cookies',
};

export default function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cookies Policy</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">What Are Cookies</h2>
        <p>
          Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">How DevHunt Uses Cookies</h2>
        <p>
          When you use and access our platform, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Authentication</strong>: We use cookies to identify you when you visit our platform and as you navigate our platform.</li>
          <li><strong>Status</strong>: We use cookies to help us determine if you are logged into our platform.</li>
          <li><strong>Personalization</strong>: We use cookies to store information about your preferences and to personalize the platform for you.</li>
          <li><strong>Security</strong>: We use cookies as an element of the security measures used to protect user accounts, including preventing fraudulent use of login credentials, and to protect our platform generally.</li>
          <li><strong>Analysis</strong>: We use cookies to help us analyze the use and performance of our platform and services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Types of Cookies We Use</h2>
        <p>
          We use both session and persistent cookies on our platform and use different types of cookies to run the platform:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Essential cookies</strong>: These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</li>
          <li><strong>Performance cookies</strong>: These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
          <li><strong>Functionality cookies</strong>: These enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
          <li><strong>Targeting cookies</strong>: These may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform, deliver advertisements on and through the platform, and so on.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">How to Control and Delete Cookies</h2>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
        </p>
        <p>
          You can find information on how to manage cookies in your browser here:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
        </ul>
        <p>
          Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Changes to Our Cookies Policy</h2>
        <p>
          We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.
        </p>
        <p>
          You are advised to review this Cookies Policy periodically for any changes. Changes to this Cookies Policy are effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
        <p>
          If you have any questions about our Cookies Policy, please contact us at:
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