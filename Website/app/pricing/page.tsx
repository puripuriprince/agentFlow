import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$9",
    features: ["1 AI Agent", "Basic customization", "Email support"],
  },
  {
    name: "Pro",
    price: "$29",
    features: ["5 AI Agents", "Advanced customization", "Priority support", "API access"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited AI Agents", "Full customization", "Dedicated support", "Custom integrations"],
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Pricing Plans</h1>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                <p className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-lg font-normal">{plan.price !== "Custom" && "/month"}</span>
                </p>
                <ul className="mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center mb-2">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient hover:opacity-90">Choose Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

