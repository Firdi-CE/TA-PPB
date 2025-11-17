import React from 'react';
import { staticProjects } from '../data/projects.js'; 

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Proyek Saya
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staticProjects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg rounded-lg p-6">
              
              {/* --- PERUBAHAN DI SINI --- */}
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-blue-600 hover:underline"
                >
                  {project.title}
                </a>
              </h2>
              {/* --- AKHIR PERUBAHAN --- */}

              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((techName, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {techName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}