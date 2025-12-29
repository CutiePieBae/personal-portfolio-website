import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image: string;
  };
  onClick: () => void;
  featured?: boolean;
}

export function ProjectCard({ project, onClick, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl cursor-pointer
        bg-card border border-border shadow-[var(--card-shadow)]
        hover:border-accent/50 hover:shadow-[var(--card-shadow-hover)]
        transition-all duration-300
        ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Accent corner glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        
        {/* View project indicator */}
        <div className="absolute top-4 right-4 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <ExternalLink className="w-4 h-4 text-accent" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 -mt-8">
        <h3 className="text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full
                bg-accent/10 text-accent border border-accent/20
                transition-colors duration-300 group-hover:bg-accent/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (featured ? 5 : 3) && (
            <span className="px-3 py-1 text-xs text-muted-foreground">
              +{project.technologies.length - (featured ? 5 : 3)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
