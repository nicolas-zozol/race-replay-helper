const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-6">
          We collect only the information necessary to provide you with race replay recommendations. This includes your contact preferences (email, SMS, or Telegram) and your racing series preferences.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-6">
          Your information is used solely to send you notifications about race excitement levels and recommendations. We never share or sell your personal data to third parties.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-6">
          We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-6">
          You have the right to access, modify, or delete your personal information at any time. You can also opt out of communications or delete your account entirely.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
        <p className="mb-6">
          We use essential cookies to maintain your session and preferences. No tracking or advertising cookies are used on our platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-6">
          If you have any questions about our privacy practices, please contact us through our contact form or email us at privacy@racereplayhelper.com.
        </p>
      </div>
    </div>
  );
};

export default Privacy;