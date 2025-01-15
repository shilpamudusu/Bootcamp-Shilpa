// components/LandingPage.js

export default function LandingPage() {
    const projects = [
      {
        name: 'Next.js Starter',
        description: 'A basic Next.js starter project to jumpstart your web development.',
        link: 'https://shilpa-nextjs-starter.bootcamp.aganitha.ai/',
      },
      {
        name: 'Kaminari Starter',
        description: 'A project starter with Kaminari integration for pagination.',
        link: 'https://shilpa-kaminari.bootcamp.aganitha.ai/',
      },
      {
        name: 'T3 App',
        description: 'Full-stack T3 app with SQLite and Prisma for seamless backend management.',
        link: './t3-app/', // Local development link
      },
      {
        name: 'Product Dashboard',
        description: 'A product catalog dashboard featuring SSG, SSR, and state management.',
        link: 'https://shilpa-product-dashboard.bootcamp.aganitha.ai/',
      },
    ];
  
    return (
      <div className="bg-gray-100 min-h-screen py-16 px-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">My Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold text-primary mb-3">{project.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-secondary text-white rounded-lg text-center hover:bg-primary transition-all duration-300"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  