import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star } from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: 'Perfect for getting started with tree identification',
    features: [
      { name: 'Basic tree identification', included: true },
      { name: 'Community access', included: true },
      { name: '10 identifications per month', included: true },
      { name: 'Basic care tips', included: true },
      { name: 'Advanced tree analysis', included: false },
      { name: 'Expert consultation', included: false },
    ],
  },
  {
    name: 'Pro',
    price: {
      monthly: 9.99,
      yearly: 99.99,
    },
    description: 'For tree enthusiasts who want more features',
    features: [
      { name: 'Basic tree identification', included: true },
      { name: 'Community access', included: true },
      { name: 'Unlimited identifications', included: true },
      { name: 'Advanced care tips', included: true },
      { name: 'Advanced tree analysis', included: true },
      { name: 'Expert consultation', included: false },
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 29.99,
      yearly: 299.99,
    },
    description: 'For professionals and organizations',
    features: [
      { name: 'Basic tree identification', included: true },
      { name: 'Community access', included: true },
      { name: 'Unlimited identifications', included: true },
      { name: 'Advanced care tips', included: true },
      { name: 'Advanced tree analysis', included: true },
      { name: 'Expert consultation', included: true },
    ],
  },
];

export default function Pricing() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the perfect plan for your tree identification needs
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className={billingInterval === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}>
              Monthly billing
            </span>
            <Switch
              checked={billingInterval === 'yearly'}
              onCheckedChange={(checked) => setBillingInterval(checked ? 'yearly' : 'monthly')}
            />
            <span className={billingInterval === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}>
              Yearly billing
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${tier.highlighted ? 'border-primary shadow-lg' : ''}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingInterval === 'monthly' ? tier.price.monthly : tier.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{billingInterval === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.name}
                      className={`flex items-center ${!feature.included ? 'text-muted-foreground' : ''}`}
                    >
                      <Check
                        className={`w-5 h-5 mr-2 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Trusted by tree enthusiasts worldwide</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {/* Add testimonials or trust indicators here */}
          </div>
        </div>
      </div>
    </div>
  );
}