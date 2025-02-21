export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="mb-4">
            At AgentForge, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our website and services.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when you create an account, use our
            services, or communicate with us. This may include your name, email address, and usage data.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you,
            and to comply with legal obligations.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>
          <p className="mt-8">
            For more detailed information about our privacy practices, please contact us at privacy@agentforge.ai.
          </p>
        </div>
      </main>
    </div>
  )
}

