'use client';  // Add this because framer-motion is a client component

import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Code2, 
  Database, 
  Globe, 
  LineChart, 
  Rocket, 
  Server, 
  Smartphone,
  Cpu,
  Cloud,
  Bot,
  Network
} from "lucide-react"

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section */}
        <section className="container flex min-h-screen flex-col items-center justify-start px-4 md:px-8 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Tal Magdish</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Software Engineer / AI Engineer
            </p>
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                talmagdish@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Manhattan, NY
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="relative w-full max-w-2xl h-[400px] border-4 border-dashed border-gray-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseLeave={() => {
              const button = document.querySelector('.follow-button');
              if (button) {
                button.style.left = '50%';
                button.style.top = '50%';
                // Reset the button text and clear interval when mouse leaves
                const buttonText = button.querySelector('.button-text');
                if (buttonText) {
                  buttonText.textContent = 'Click Me!';
                  // Clear the interval
                  if (buttonText.dataset.intervalId) {
                    clearInterval(Number(buttonText.dataset.intervalId));
                    delete buttonText.dataset.intervalId;
                    delete buttonText.dataset.intervalSet;
                  }
                }
              }
            }}
          >
            <motion.div
              className="absolute follow-button"
              initial={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
              animate={{ x: "-50%", y: "-50%" }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                left: "50%",
                top: "50%",
              }}
            >
              <motion.a
                href="/minecraft"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                  if (rect && e.clientX >= rect.left && e.clientX <= rect.right && 
                      e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.parentElement?.style.setProperty('left', `${x}px`);
                    e.currentTarget.parentElement?.style.setProperty('top', `${y}px`);
                    
                    // Change text after following for a while
                    const buttonText = e.currentTarget.querySelector('.button-text');
                    if (buttonText) {
                      const texts = [
                        "Don't Leave!",
                        "Where Are You Going!?",
                        "Please Stay!",
                        "Just Click Me!",
                        "🥺🥺🥺🥺🥺"
                      ];
                      
                      // Change text every 2 seconds
                      if (!buttonText.dataset.intervalSet) {
                        buttonText.dataset.intervalSet = 'true';
                        const intervalId = setInterval(() => {
                          const randomText = texts[Math.floor(Math.random() * texts.length)];
                          buttonText.textContent = randomText;
                        }, 2000);
                        // Store the interval ID so we can clear it later
                        buttonText.dataset.intervalId = intervalId.toString();
                      }
                    }
                  }
                }}
              >
                <Button variant="default">
                  <span className="button-text">Click Me!</span>
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="mt-16 flex gap-4 justify-center">
            <Button size="icon" variant="ghost" asChild>
              <a href="https://github.com/TalMagdish" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://linkedin.com/in/Tal-Magdish" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="mailto:talmagdish@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container py-24 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Rocket className="h-8 w-8 text-primary" />
              Professional Journey
            </h2>
            <div className="space-y-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="relative overflow-hidden border-l-4 border-l-primary">
                  <div className="absolute top-0 right-0 p-4">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Current
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      Founding Engineer at Greenboard
                    </CardTitle>
                    <CardDescription className="text-base">
                      May 2023 - Present • New York, NY
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">AI & Infrastructure</h4>
                      <ul className="list-none space-y-3">
                        <li className="flex items-start gap-2">
                          <Bot className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>Architected RAG infrastructure with intelligent query routing across Anthropic, OpenAI, and Perplexity, implementing vector DB storage and retrieval systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Cloud className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>Redesigned cloud architecture using AWS services (Lambda, S3, DynamoDB) and MYSQL for improved scalability</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Product Development</h4>
                      <ul className="list-none space-y-3">
                        <li className="flex items-start gap-2">
                          <Code2 className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>Built vendor diligence automation with AI risk assessment and PDF generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LineChart className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>?</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-secondary">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Server className="h-6 w-6 text-primary" />
                      SDE Intern at Amazon AWS
                    </CardTitle>
                    <CardDescription className="text-base">
                      May 2023 - August 2023 • Seattle, WA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Key Achievements</h4>
                      <ul className="list-none space-y-3">
                        <li className="flex items-start gap-2">
                          <Database className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>Developed automated server utilization monitoring system with 5-minute scan intervals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Network className="h-5 w-5 mt-1 text-muted-foreground" />
                          <span>Implemented intelligent resource allocation using AWS MSK, Lambda, EC2, and CloudWatch</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Add more experience cards with similar styling */}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container py-24 px-4 md:px-8 bg-muted/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Cpu className="h-8 w-8 text-primary" />
              Technical Arsenal
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'OCaml'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-primary" />
                      Cloud & DevOps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Web Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Firebase'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI & ML
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['RAG', 'LangChain', 'OpenAI', 'Anthropic', 'Vector DBs', 'Embeddings'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="container py-24 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <Card>
              <CardHeader>
                <CardTitle>Johns Hopkins University</CardTitle>
                <CardDescription>B.S. in Computer Science and Mathematics • Anticipated May 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">GPA: 3.92 (Dean's List) | SAT: 1560</p>
                <p className="font-semibold mb-2">Campus Employment:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Calculus and Linear Algebra Peer Tutor</li>
                  <li>Oral Presentations Teaching Assistant</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    </>
  )
}
