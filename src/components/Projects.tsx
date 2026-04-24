import { ExternalLink, Code } from 'lucide-react';

export default function Projects() {
  const projects = [
    { id: 1, title: 'E-Commerce Platform', desc: 'Full-stack marketplace focused on minimal design.', tech: ['React', 'Node', 'TypeScript'] },
    { id: 2, title: 'WebGL Demo', desc: 'Interactive 3D experience.', tech: ['Three.js', 'Vite'] },
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => alert(`Navigating to ${project.title}`)}
            className="group relative bg-neutral-800 p-6 rounded-xl border border-neutral-700 cursor-pointer hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400">{project.title}</h3>
            <p className="text-gray-400 mb-6">{project.desc}</p>
            <div className="flex gap-2 flex-wrap mb-8">
              {project.tech.map(t => (
                <span key={t} className="text-xs bg-neutral-700 px-3 py-1 rounded-full text-gray-200">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 flex gap-3 text-neutral-400">
              <Code size={20} className="hover:text-white" />
              <ExternalLink size={20} className="hover:text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
