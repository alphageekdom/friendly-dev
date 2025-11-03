import { Link } from 'react-router';
import type { Route } from './+types/details';
import type { Project } from '~/types';
import { FaArrowLeft } from 'react-icons/fa';

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);

  if (!res.ok) throw new Response('Project not found', { status: 404 });

  const project: Project = await res.json();
  return project;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  //   console.log(project);
  return (
    <>
      <Link
        to="/projects"
        className="mb-6 flex items-center text-blue-400 transition hover:text-blue-500"
      >
        <FaArrowLeft className="mr-2" /> Back To Projects
      </Link>

      <div className="grid items-start gap-8 md:grid-cols-2">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold text-blue-400">
            {project.title}
          </h1>
          <p className="mb-4 text-sm text-gray-300">
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p className="mb-6 text-gray-200">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
