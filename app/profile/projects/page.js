'use client'; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { useSelector } from 'react-redux';

const ProjectStages = () => {
    const router = useRouter();
    const user_id = useSelector(state => state.user.user_id);
    
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [participants, setParticipants] = useState('');
    const [description, setDescription] = useState('');
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [loading, setLoading] = useState(true);
    const [creatingProject, setCreatingProject] = useState(false)

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('Projects')
                .select('id, project_name, participants, project_stage, created_at, user_id');

            if (data) {
                // Filter projects to include those where the user_id is either the owner or in participants
                const filteredProjects = data.filter(project => 
                    project.user_id === user_id || 
                    project.participants.includes(user_id)
                );
                setProjects(filteredProjects);
            } else {
                console.error(error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (e) => {
        e.preventDefault();
        setCreatingProject(true)

        try {
            const { data, error } = await supabase
            .from('Projects')
            .insert([{
                project_name: newProjectName,
                description: description,
                participants: participants.split(',').map(participant => participant.trim()),
                project_stage: 1, // Default stage
                user_id: user_id,
            }])
            .select();

            if (data) {
                setNewProjectName('');
                setParticipants('');
                setShowCreateProject(false); // Hide the form after creation
                fetchProjects(); // Refresh the project list
            } else {
                console.error(error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCreatingProject(false)
        }
    };

    useEffect(() => {
        if (!user_id) {
            router.push('/auth/login');
        } else {
            fetchProjects();
        }
    }, [user_id, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
                </svg>
                <p className="text-center mt-4 text-[#4A7C4A]">Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button 
                onClick={() => setShowCreateProject(!showCreateProject)} 
                className="mt-6 mb-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
                {showCreateProject ? 'Cancel' : 'Create New Project'}
            </button>

            {showCreateProject && (
                <div className="mt-4 bg-gray-100 shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-xl font-bold mb-4">Create New Project</h2>
                    <form onSubmit={createProject}>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700" htmlFor="projectName">Project Name</label>
                            <input
                                type="text"
                                id="projectName"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder='eg: Twitter Project'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700" htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder='eg: this project is about...'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700" htmlFor="participants">Participants (comma-separated)</label>
                            <input
                                type="text"
                                id="participants"
                                value={participants}
                                onChange={(e) => setParticipants(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder='12kjniwcwc-wckjc-wjnc, 2j3ikjnojw-cjnsjkccw, etc...'
                            />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                            {creatingProject ? 'creating project...' : 'Create Project'}
                        </button>
                    </form>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-4">Available Projects</h1>

            {projects.length === 0 ? (
                <p className='text-[#4A7C4A] text-center'>No projects available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
                            <h2 className="text-xl font-semibold mb-2 text-green-600">{project.project_name}</h2>
                            <p className="mb-1"><strong>Current Stage: </strong> 
                                {project.project_stage === 1 ? 'Initiation (stage 1)' : 
                                 project.project_stage === 2 ? 'Planning (stage 2)' : 
                                 project.project_stage === 3 ? 'Execution (stage 3)' : 
                                 project.project_stage === 4 ? 'Monitoring and Controlling (stage 4)' : 
                                 project.project_stage === 5 ? 'Closure (stage 5)' : 
                                 'Unknown Stage'}
                            </p>
                            <p className="mb-1"><strong>Participants:</strong> {project.participants.join(', ')}</p>
                            <p className="mb-4"><strong>Created On:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
                            <button
                                onClick={() => router.push(`/profile/projects/${project.id}`)} 
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectStages;
