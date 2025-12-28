import { X, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    challenges?: string;
    outcome?: string;
  } | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0a0b]/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="bg-[#141416] border border-[#262629] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#0a0a0b]/60 backdrop-blur-sm border border-[#262629] hover:bg-[#0a0a0b]/80 hover:border-[#f59e0b]/50 transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-[#a1a1a6] group-hover:text-[#fafafa]" />
            </button>
            
            {/* Accent glow at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#fafafa] mb-4"
            >
              {project.title}
            </motion.h2>
            
            {/* Technology tags */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  className="px-3 py-1 text-sm rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <div className="space-y-6">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="text-[#fafafa] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  Overview
                </h3>
                <p className="text-[#a1a1a6] leading-relaxed">{project.fullDescription}</p>
              </motion.div>

              {/* Challenges */}
              {project.challenges && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-[#fafafa] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    Challenges
                  </h3>
                  <p className="text-[#a1a1a6] leading-relaxed">{project.challenges}</p>
                </motion.div>
              )}

              {/* Outcome */}
              {project.outcome && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <h3 className="text-[#fafafa] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    Outcome
                  </h3>
                  <p className="text-[#a1a1a6] leading-relaxed">{project.outcome}</p>
                </motion.div>
              )}

              {/* Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#fafafa] text-[#0a0a0b] rounded-lg font-medium hover:bg-[#f59e0b] transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                    View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#262629] text-[#fafafa] rounded-lg font-medium hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
