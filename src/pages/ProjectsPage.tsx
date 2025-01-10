import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ProjectList } from '../components/projects/ProjectList';
import { TaskList } from '../components/projects/TaskList';
import { TimeEntryList } from '../components/projects/TimeEntryList';
import { ProjectForm } from '../components/projects/forms/ProjectForm';
import { TaskForm } from '../components/projects/forms/TaskForm';
import { TimeEntryForm } from '../components/projects/forms/TimeEntryForm';
import { Modal } from '../components/common/Modal';
import { Share2, Plus } from 'lucide-react';
import { getProjects, createProject } from '../services/projects/projects';
import { getTasks, createTask } from '../services/projects/tasks';
import type { Project, Task, TimeEntry } from '../types/project';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewTimeEntryModalOpen, setIsNewTimeEntryModalOpen] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    async function loadTasks() {
      if (selectedProject) {
        try {
          const data = await getTasks(selectedProject.id);
          setTasks(data);
        } catch (err) {
          console.error('Failed to load tasks:', err);
        }
      }
    }

    loadTasks();
  }, [selectedProject]);

  const handleNewProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await createProject(project);
      setProjects(prev => [newProject, ...prev]);
      setIsNewProjectModalOpen(false);
    } catch (err) {
      console.error('Failed to create project:', err);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleNewTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await createTask(task);
      setTasks(prev => [newTask, ...prev]);
      setIsNewTaskModalOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Failed to create task. Please try again.');
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="text-red-600">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Projects
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage your projects and tasks
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            {loading ? (
              <div className="text-center py-4">Loading projects...</div>
            ) : (
              <ProjectList
                projects={projects}
                onSelect={setSelectedProject}
              />
            )}
          </section>

          {selectedProject && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tasks for {selectedProject.name}
                </h3>
                <button
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </button>
              </div>
              <TaskList
                tasks={tasks}
                onSelect={setSelectedTask}
              />
            </section>
          )}
        </div>
      </div>

      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="New Project"
      >
        <ProjectForm
          onSubmit={handleNewProject}
          onCancel={() => setIsNewProjectModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        title="New Task"
      >
        {selectedProject && (
          <TaskForm
            projectId={selectedProject.id}
            onSubmit={handleNewTask}
            onCancel={() => setIsNewTaskModalOpen(false)}
          />
        )}
      </Modal>
    </Layout>
  );
}