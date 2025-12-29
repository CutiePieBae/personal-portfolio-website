import { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Palette, Server, Wrench } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { Navigation } from './components/Navigation';
import { ThemeToggle } from './components/ThemeToggle';

// Mock data - you can easily update this
const personalInfo = {
  name: "Chu Chun Yue",
  title: "Full Stack Developer",
  bio: "Passionate developer with 1+ years of experience building modern web applications. I specialize in creating elegant solutions to complex problems, with a focus on user experience and clean code.",
  email: "chuchunyue@yahoo.com",
  github: "https://github.com/CutiePieBae",
  linkedin: "https://www.linkedin.com/in/chu-c-97737210b",
  skills: {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "PostgreSQL", "Redis"],
    design: ["Figma", "UI/UX Design"],
    tools: ["AWS", "Docker", "Git"],
  }
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management and payment processing.",
    fullDescription: "Built a comprehensive e-commerce platform from the ground up, featuring real-time inventory tracking, secure payment processing via Stripe, and an intuitive admin dashboard. The platform handles thousands of concurrent users and processes hundreds of transactions daily.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjY3NTMyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubUrl: "https://github.com/CutiePieBae/ecommerce-platform",
    liveUrl: "https://demo-ecommerce.example.com",
    challenges: "The main challenge was optimizing database queries for the inventory system to handle real-time updates across multiple warehouses while maintaining data consistency. Implemented caching strategies with Redis and optimized SQL queries to reduce response time by 60%.",
    outcome: "Successfully launched the platform serving 10,000+ active users. The system processes an average of 500 orders per day with 99.9% uptime."
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team collaboration features.",
    fullDescription: "Developed a modern task management application that enables teams to collaborate effectively with real-time updates, drag-and-drop task organization, and comprehensive reporting features. The app integrates with popular tools like Slack and Google Calendar.",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Motion"],
    image: "https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2NjcyNTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubUrl: "https://github.com/CutiePieBae/task-manager",
    liveUrl: "https://taskmanager.example.com",
    challenges: "Implementing real-time synchronization across multiple clients while handling offline scenarios was complex. Used Firebase Realtime Database with custom conflict resolution logic to ensure data consistency.",
    outcome: "The app is used by 50+ teams and has received a 4.8/5 rating on Product Hunt. Users report a 40% increase in team productivity."
  },
  {
    id: 3,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and fitness goals.",
    fullDescription: "Created a comprehensive fitness tracking application available on iOS and Android. Features include workout logging, nutrition tracking, progress visualization with interactive charts, and social features to connect with friends and share achievements.",
    technologies: ["React Native", "GraphQL", "MongoDB", "Express", "Chart.js"],
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY2NzMwNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubUrl: "https://github.com/CutiePieBae/fitness-tracker",
    challenges: "Optimizing the app for battery efficiency while maintaining accurate tracking was crucial. Implemented smart background task scheduling and efficient data syncing to minimize battery drain.",
    outcome: "Launched with 5,000+ downloads in the first month. Users track an average of 15 workouts per month with a 70% retention rate after 30 days."
  },
  {
    id: 4,
    title: "Design System & Component Library",
    description: "Comprehensive UI component library with documentation and design guidelines.",
    fullDescription: "Built a complete design system and component library used across multiple products in an organization. Includes 100+ reusable components, comprehensive documentation, accessibility features, and automated visual regression testing.",
    technologies: ["React", "Storybook", "TypeScript", "Figma", "CSS-in-JS"],
    image: "https://images.unsplash.com/photo-1615220367990-1940567341f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjY3NjM2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubUrl: "https://github.com/CutiePieBae/design-system",
    liveUrl: "https://design-system.example.com",
    challenges: "Ensuring consistency across different frameworks and maintaining backward compatibility while evolving the system. Created a comprehensive migration guide and automated tools to help teams upgrade.",
    outcome: "Adopted by 8 product teams, reducing development time by 30% and ensuring consistent UX across all products. The system has 100% WCAG 2.1 AA compliance."
  }
];

const skillCategories = [
  { id: 'frontend', label: 'Frontend', icon: Code2, skills: personalInfo.skills.frontend },
  { id: 'backend', label: 'Backend', icon: Server, skills: personalInfo.skills.backend },
  { id: 'design', label: 'Design', icon: Palette, skills: personalInfo.skills.design },
  { id: 'tools', label: 'Tools', icon: Wrench, skills: personalInfo.skills.tools },
];

// Animated text component for character-by-character reveal
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Social link with magnetic hover effect
function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-4 rounded-full bg-card border border-border shadow-[var(--card-shadow)] hover:border-accent/50 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
      <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
    </motion.a>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent-glow),transparent_70%)]" />
        
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        
        {/* Animated accent orbs - enhanced for better visibility */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--hero-orb-1)_0%,transparent_60%)]"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--hero-orb-2)_0%,transparent_60%)]"
          animate={{
            x: [0, -35, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Third orb for extra depth */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--accent-glow-strong)_0%,transparent_70%)]"
          animate={{
            x: [0, 20, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-6 py-20 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile photo with glassmorphic style */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-32 h-32 mx-auto mb-10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent to-accent/50 rotate-6 shadow-lg" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-border shadow-[var(--card-shadow)]">
                <img 
                  src="/profile.png" 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-accent/25 blur-2xl -z-10" />
            </motion.div>
            
            {/* Name with character animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight"
            >
              <AnimatedText text={personalInfo.name} delay={0.5} />
            </motion.h1>
            
            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6"
            >
              {personalInfo.title}
            </motion.p>
            
            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Skills by category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto"
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + categoryIndex * 0.1 }}
                  className="p-4 rounded-xl bg-card/80 border border-border backdrop-blur-sm shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <category.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{category.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent/80 border border-accent/20"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="flex justify-center gap-4 mb-12"
            >
              <SocialLink href={personalInfo.github} icon={Github} label="GitHub" />
              <SocialLink href={personalInfo.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={`mailto:${personalInfo.email}`} icon={Mail} label="Email" />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="flex flex-col items-center gap-2"
            >
              <a
                href="#projects"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                View My Work
              </a>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 text-sm font-medium text-accent bg-accent/10 border border-accent/20 rounded-full mb-4"
            >
              Portfolio
            </motion.span>
            <h2 className="text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects. Click on any project to learn more about the challenges, solutions, and outcomes.
            </p>
          </motion.div>

          {/* Bento-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  featured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="relative py-20 px-6 border-t border-border">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-accent bg-accent/10 border border-accent/20 rounded-full mb-4">
              Contact
            </span>
            <h2 className="text-foreground mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to connect.
            </p>
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </motion.a>
            
            {/* Social links */}
            <div className="flex justify-center gap-4 mt-8">
              <SocialLink href={personalInfo.github} icon={Github} label="GitHub" />
              <SocialLink href={personalInfo.linkedin} icon={Linkedin} label="LinkedIn" />
            </div>
          </motion.div>
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 pt-8 border-t border-border text-muted-foreground/70 text-sm"
          >
            <p>© {new Date().getFullYear()} {personalInfo.name}. Crafted with care.</p>
          </motion.div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
