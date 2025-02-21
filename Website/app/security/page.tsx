export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8">Security</h1>
          <p className="mb-4">
            At AgentForge, we prioritize the security of our users' data and our systems. We employ industry-standard
            security measures to protect against unauthorized access, alteration, disclosure, or destruction of data.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Security Practices</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption: We use SSL/TLS encryption to protect data in transit.</li>
            <li>
              Access Controls: We implement strict access controls to limit data access to authorized personnel only.
            </li>
            <li>Regular Audits: We conduct regular security audits and vulnerability assessments.</li>
            <li>Compliance: We adhere to industry security standards and are SOC 2 certified.</li>
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">Reporting Security Issues</h2>
          <p className="mb-4">
            If you believe you've found a security vulnerability in our service, please report it to us immediately. We
            appreciate your efforts to responsibly disclose your findings.
          </p>
          <p className="mt-8">
            For more information about our security practices or to report a security issue, please contact us at
            security@agentforge.ai.
          </p>
        </div>
      </main>
    </div>
  )
}

