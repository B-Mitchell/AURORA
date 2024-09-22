'use client';
import React from 'react';

const ProjectPhases = () => {

    return (
        <div className="p-6">
                <div className="w-[70%] m-auto">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Project Phases</h2>
                        <div>
                            <h3 className="font-semibold">stage 1: Initiation:</h3>
                            <ul className="list-disc ml-6">
                                <li>Define project goals and objectives.</li>
                                <li>Identify stakeholders.</li>
                                <li>Conduct a feasibility study or analysis.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">stage 2: Planning:</h3>
                            <ul className="list-disc ml-6">
                                <li>Develop a project plan outlining tasks, timelines, and resources.</li>
                                <li>Define roles and responsibilities.</li>
                                <li>Create a budget and identify risks.</li>
                                <li>Set key milestones and deliverables.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">stage 3: Execution:</h3>
                            <ul className="list-disc ml-6">
                                <li>Begin work on project tasks according to the plan.</li>
                                <li>Coordinate with team members and stakeholders.</li>
                                <li>Communicate progress and any issues that arise.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">stage 4: Monitoring and Controlling:</h3>
                            <ul className="list-disc ml-6">
                                <li>Track project progress against the plan.</li>
                                <li>Adjust schedules and resources as needed.</li>
                                <li>Manage risks and resolve issues.</li>
                                <li>Ensure quality control throughout the process.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">stage 5: Closure:</h3>
                            <ul className="list-disc ml-6">
                                <li>Complete all project tasks and deliverables.</li>
                                <li>Obtain final approval from stakeholders.</li>
                                <li>Conduct a project review to identify successes and areas for improvement.</li>
                                <li>Document lessons learned and archive project materials.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">stage 6: Post-Completion:</h3>
                            <ul className="list-disc ml-6">
                                <li>Provide any necessary training or support.</li>
                                <li>Gather feedback from users or stakeholders.</li>
                                <li>Transition the project to maintenance or operational teams, if applicable.</li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ProjectPhases;
