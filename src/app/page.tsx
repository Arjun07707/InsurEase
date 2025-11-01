import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Heart, LifeBuoy, Car, Plane, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure & Reliable",
    description: "Your data and transactions are protected with top-tier security.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Easy Claim Process",
    description: "File and track your claims online with our simple, transparent process.",
  },
  {
    icon: <LifeBuoy className="w-8 h-8 text-primary" />,
    title: "24/7 Customer Support",
    description: "Our dedicated team is here to help you anytime, anywhere.",
  },
];

const policyCategories = [
  { icon: <Heart className="w-10 h-10 mx-auto text-accent" />, name: "Health Insurance" },
  { icon: <LifeBuoy className="w-10 h-10 mx-auto text-accent" />, name: "Life Insurance" },
  { icon: <Car className="w-10 h-10 mx-auto text-accent" />, name: "Vehicle Insurance" },
  { icon: <Plane className="w-10 h-10 mx-auto text-accent" />, name: "Travel Insurance" },
];

const testimonials = [
  {
    avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl ?? '',
    avatarHint: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageHint,
    name: "Sarah J.",
    role: "Policyholder",
    quote: "InsurEase made finding the right policy so simple. The dashboard is intuitive and managing my policies has never been easier.",
  },
  {
    avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl ?? '',
    avatarHint: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageHint,
    name: "Michael B.",
    role: "Small Business Owner",
    quote: "The claims process was surprisingly fast and hassle-free. I was kept updated at every step. Highly recommended!",
  },
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center" aria-label="InsurEase Home">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Happy family"
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
            <div className="container px-4 md:px-6 relative text-white">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                        Peace of Mind, Simplified
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        InsurEase is your trusted partner for managing all your insurance needs. Secure, simple, and reliable.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/browse-policies">
                            <Button size="lg">Explore Policies</Button>
                        </Link>
                        <Link href="/login">
                          <Button size="lg" variant="secondary">
                            Access Dashboard
                          </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose InsurEase?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a comprehensive platform designed to give you control and clarity over your insurance policies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="grid gap-4 text-center">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="policies" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Policies for Every Need</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-center md:text-xl/relaxed mt-4">
              From health to travel, we have you covered.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {policyCategories.map((category) => (
                <Card key={category.name} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {category.icon}
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Trusted by Thousands</h2>
            <div className="grid gap-8 mt-12 lg:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join InsurEase today and experience insurance management like never before.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/login">
                <Button size="lg" className="w-full" variant="secondary">Create an Account</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} InsurEase. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
