'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const stageLabels = [
    'Initiation (stage 1)',
    'Planning (stage 2)',
    'Execution (stage 3)',
    'Monitoring and Controlling (stage 4)',
    'Closure (stage 5)',
];

const Page = ({ params }) => {
    const { project_id } = params;
    const router = useRouter();
    const user_id = useSelector(state => state.user.user_id);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newUpdate, setNewUpdate] = useState('');
    const [completionStatus, setCompletionStatus] = useState({});

    useEffect(() => {
        if (!user_id) {
            router.push('/auth/login');
            return;
        }
    
        const fetchProjectDetails = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Projects')
                .select('*')
                .eq('id', project_id)
                .single();
    
            if (data) {
                const updates = Array.isArray(data.updates) ? data.updates : [];
                setProject({ ...data, updates });
    
                // Initialize completion status from the database
                const initialStatus = {};
                if (data.completion_status) {
                    data.completion_status.forEach(status => {
                        initialStatus[status.participantId] = status.completed;
                    });
                }
                setCompletionStatus(initialStatus);
            } else {
                console.error(error);
            }
            setLoading(false);
        };
    
        fetchProjectDetails();
    }, [project_id, router, user_id]);

    const handleAddUpdate = async (e) => {
        e.preventDefault();
        const updatedUpdates = [...project.updates, newUpdate];

        const { data, error } = await supabase
            .from('Projects')
            .update({ updates: updatedUpdates })
            .eq('id', project_id)
            .select();

        if (data) {
            setProject({ ...data[0], updates: updatedUpdates });
            setNewUpdate('');
        } else {
            console.error(error);
        }
    };

    const handleCompletionToggle = async (participant) => {
        const newStatus = !completionStatus[participant];
    
        // Update the local state first
        setCompletionStatus((prevStatus) => ({
            ...prevStatus,
            [participant]: newStatus,
        }));
    
        // Fetch current completion status from the project
        const currentCompletionStatus = project.completion_status || [];
    
        // Check if the participant already exists in the completion status
        const existingStatusIndex = currentCompletionStatus.findIndex(
            (status) => status.participantId === participant
        );
    
        if (existingStatusIndex >= 0) {
            // Update existing status
            currentCompletionStatus[existingStatusIndex].completed = newStatus;
        } else {
            // Add new status
            currentCompletionStatus.push({ participantId: participant, completed: newStatus });
        }
    
        // Update the database with the new completion status
        const { data, error } = await supabase
            .from('Projects')
            .update({ completion_status: currentCompletionStatus })
            .eq('id', project_id)
            .select();
    
        if (error) {
            console.error('Error updating completion status:', error);
            // Optionally, revert the local state if the update fails
            setCompletionStatus((prevStatus) => ({
                ...prevStatus,
                [participant]: !newStatus,
            }));
        } else {
            // Update successful
            setProject(data[0]); // Optionally update project state
        }
    };

    const handleNextStage = async () => {
        const allCompleted = Object.values(completionStatus).every(status => status);

        if (project.project_stage >= 5) {
            alert('The project is already at the final stage and cannot be advanced further.');
            return;
        }
        if (allCompleted) {
            alert('All participants must complete their tasks before moving to the next stage.');
            return;
        }
        
        if (allCompleted) {
            const { data, error } = await supabase
                .from('Projects')
                .update({ project_stage: project.project_stage + 1 })
                .eq('id', project_id)
                .select();

            if (data) {
                setProject(data[0]);
                setCompletionStatus({}); // Reset status if needed
            } else {
                console.error(error);
            }
        } else {
            alert('All participants must complete their tasks before moving to the next stage.');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <svg className="animate-spin h-10 w-10 text-[#4A7C4A]" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
                </svg>
                <p className="text-center mt-4 text-[#4A7C4A]">Loading project details...</p>
            </div>
        );
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    const progressPercentage = (project.project_stage / stageLabels.length) * 100;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className='flex'>
                <h1 className="text-3xl font-bold mb-4">{project.project_name}</h1>
                {project.user_id === user_id ? <p className='text-yellow-500'>Owner</p> : <p className='text-yellow-500'>Participant</p>}
            </div>
            <p><strong>Project ID:</strong> {project.id}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Current Stage:</strong> {stageLabels[project.project_stage - 1]}</p>
            <p><strong>Participants:</strong> {project.participants.join(', ')}</p>
            <p><strong>Created On:</strong> {new Date(project.created_at).toLocaleDateString()}</p>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-green-600 h-full rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <p className="text-sm text-center mt-1">{progressPercentage.toFixed(0)}% Complete</p>
            </div>

            {/* Updates Section */}
            <h2 className="text-2xl font-bold mt-6">Progress Updates</h2>
            <ul className="list-disc pl-5">
                {project.updates && project.updates.slice(-2).map((update, index) => (
                    <li key={index}>{update}</li>
                ))}
            </ul>       

            <form onSubmit={handleAddUpdate} className="mt-4">
                <textarea
                    value={newUpdate}
                    onChange={(e) => setNewUpdate(e.target.value)}
                    placeholder="Add a new update..."
                    className="w-full p-3 border border-gray-300 rounded mb-2"
                    required
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                    Add Update
                </button>
            </form>

            {/* Completion Section */}
            <h2 className="text-2xl font-bold mt-6">Mark Completion for Current Stage</h2>
            {project.participants.map(participantId => (
                <div key={participantId} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={completionStatus[participantId] || false}
                        onChange={() => handleCompletionToggle(participantId)}
                        className="mr-2"
                        disabled={participantId !== user_id} // Disable for other users
                    />
                    <label>{participantId}</label>
                </div>
            ))}

            {
                project.user_id === user_id ? <button
                onClick={handleNextStage}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-4"
            >
                Move to Next Stage
            </button> : <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md transition mt-4"
            >
                Move to Next Stage
            </button> 
            }
        </div>
    );
};

export default Page;


