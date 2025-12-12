import React, { useEffect } from "react";
import { useGetAllEducationQuery } from "../redux/api/educationApi";
import { toast } from "sonner";

const About = () => {
    const { data, isError } = useGetAllEducationQuery();

    useEffect(() => {
        if (isError) {
            toast.error("Error: Failed to load education module.");
        }
    }, [isError]);

    const skills = ['JavaScript (ES6+)', 'React.js', 'Node.js', 'React-Native', 'Expo', 'Tailwind css', 'Bootstrap', "Html", "Css", "MongoDB", "Git & GitHub"];

    return (
        <section id="about" className="min-h-screen bg-black text-green-500 font-mono py-20 px-4 border-t border-green-900/30">
            <div className="max-w-6xl mx-auto">
                <div className="border border-green-500 rounded p-1 mb-8">
                    <div className="bg-green-900/20 p-2 border-b border-green-500 flex justify-between items-center">
                        <span className="text-xs">SYSTEM_INFO: USER_PROFILE</span>
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Stats/Avatar/Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border-2 border-green-500/50 p-2 relative group bg-black">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500"></div>

                            <div className="h-64 w-full bg-green-900/10 flex items-center justify-center border border-green-500/20 relative overflow-hidden">
                                <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className={`border border-green-500/10 ${i % 3 === 0 ? 'bg-green-500/10' : ''}`}></div>
                                    ))}
                                </div>
                                <div className="text-center z-10 relative">
                                    <div className="text-4xl font-bold text-green-500 mb-2 animate-pulse">
                                        &lt;USER /&gt;
                                    </div>
                                    <div className="text-xs text-green-700 tracking-widest uppercase">Identity Protected</div>
                                    <div className="mt-4 text-[10px] text-green-800 font-mono text-left w-32 mx-auto">
                                        <div className="flex justify-between"><span>STR:</span><span>98%</span></div>
                                        <div className="flex justify-between"><span>INT:</span><span>99%</span></div>
                                        <div className="flex justify-between"><span>DEX:</span><span>95%</span></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full h-1 bg-green-500 animate-scan"></div>
                            </div>

                            <div className="bg-green-900/30 p-2 mt-2 text-center text-xs border border-green-900">
                                <span className="mr-2 text-green-500">●</span> STATUS: ONLINE<br />
                                ID: BHAGWAN_GIRE [ADMIN]
                            </div>
                        </div>

                        <div className="border border-green-500/30 p-4 bg-black relative">
                            <h3 className="border-b border-green-500/50 pb-2 mb-4 text-lg font-bold flex items-center">
                                <span className="mr-2 text-green-500">{'>'}</span> CONTACT_PROTOCOLS
                            </h3>
                            <ul className="space-y-4 text-sm font-mono">
                                <li className="group">
                                    <div className="text-green-700 text-xs mb-1 group-hover:text-green-500 transition-colors">Target Address [EMAIL]</div>
                                    <div className="pl-4 border-l border-green-900 group-hover:border-green-500 transition-colors">bhagwangire05@gamil.com</div>
                                </li>
                                <li className="group">
                                    <div className="text-green-700 text-xs mb-1 group-hover:text-green-500 transition-colors">Comm Link [PHONE]</div>
                                    <div className="pl-4 border-l border-green-900 group-hover:border-green-500 transition-colors">+91 839832391</div>
                                </li>
                                <li className="group">
                                    <div className="text-green-700 text-xs mb-1 group-hover:text-green-500 transition-colors">Geo Coordinates [LOC]</div>
                                    <div className="pl-4 border-l border-green-900 group-hover:border-green-500 transition-colors">Chhatrapati Sambhajinagar, MH</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel: Data */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="text-green-700 mr-2">root@system:~$</span> cat about_me.txt
                            </h2>
                            <div className="bg-gray-900/50 p-6 border-l-2 border-green-500 text-green-400 leading-relaxed">
                                <p className="mb-4">
                                    {'>'} Initiating bio-scan... <br />
                                    {'>'} Subject: Bhagwan Babasaheb Gire <br />
                                    {'>'} Education: Bachelor’s in Computer Science (Dr. Babasaheb Ambedkar Marathwada University) <br />
                                    {'>'} Experience: 6-month internship at Matic UI (Full Stack Developer) <br />
                                    {'>'} Objectives: Building robust web/mobile applications and expanding tech stack knowledge.
                                </p>
                                <p>
                                    Loading hobbies module... [Done] <br />
                                    <span className="text-green-300">['Photography', 'Reading', 'Traveling']</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="text-green-700 mr-2">root@system:~$</span> run education_history.exe
                            </h2>
                            <div className="space-y-4">
                                {data && data.map((edu, index) => (
                                    <div key={index} className="flex items-start p-4 border border-green-500/20 hover:border-green-500/60 hover:bg-green-900/10 transition-all">
                                        <div className="mr-4 text-green-600 mt-1">
                                            {'>'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-green-300">{edu.degree}</h4>
                                            <div className="text-sm text-green-600">{edu.stream} @ {edu.institute}</div>
                                            <div className="text-xs text-gray-500">[{edu.year}]</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="text-green-700 mr-2">root@system:~$</span> list_skills --all
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill) => (
                                    <div key={skill} className="bg-green-900/20 border border-green-500/30 px-3 py-2 text-sm flex items-center hover:bg-green-500 hover:text-black transition-colors cursor-crosshair">
                                        <span className="mr-2 opacity-50">./</span>{skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
