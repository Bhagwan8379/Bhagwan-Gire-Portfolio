import React, { useState, useEffect } from 'react';
import HackerBackground from './HackerBackground';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "INITIALIZING SYSTEM...\nLOADING PROFILE: BHAGWAN GIRE\nROLE: FULLSTACK DEVELOPER\nSTATUS: ONLINE";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="min-h-screen bg-black text-green-500 font-mono pt-20 px-4 flex flex-col justify-center relative overflow-hidden">
            {/* Background Effects */}
            <HackerBackground />

            <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-12 gap-1 h-full w-full z-0">
                {[...Array(96)].map((_, i) => (
                    <div key={i} className="text-xs break-all animate-pulse">
                        {Math.random().toString(2).substring(2)}
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="border border-green-500/50 p-6 rounded bg-black/80 backdrop-blur shadow-[0_0_20px_rgba(0,255,0,0.1)] relative">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

                        <div className="flex items-center gap-2 mb-4 border-b border-green-800 pb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-700 ml-2">TERMINAL_V3.0.1 - ROOT ACCESS GRANTED</span>
                        </div>
                        <pre className="whitespace-pre-wrap text-sm md:text-lg leading-relaxed min-h-[160px]">
                            <span className="text-green-300">root@mainframe:~$</span> ./init_profile.sh<br />
                            {text}
                            <span className="animate-pulse">_</span>
                        </pre>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="px-6 py-3 border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_10px_rgba(0,255,0,0.2)] flex items-center group">
                            <span className="mr-2 group-hover:rotate-90 transition-transform">{'>>'}</span> Execute Projects
                        </a>
                        <a href="#contact" className="px-6 py-3 border border-gray-700 hover:border-green-500 text-gray-400 hover:text-green-500 transition-all duration-300 uppercase tracking-widest text-sm font-bold flex items-center">
                            <span className="mr-2">{'//'}</span> Connect()
                        </a>
                    </div>

                    <div className="flex gap-6 pt-4 text-green-700 font-bold">
                        <a href="https://github.com/Bhagwan8379" className="hover:text-green-400 transition-colors uppercase text-xs tracking-widest hover:underline decoration-green-500 underline-offset-4">[ GITHUB_REPO ]</a>
                        <a href="https://leetcode.com/u/Bhagwan8379/" className="hover:text-green-400 transition-colors uppercase text-xs tracking-widest hover:underline decoration-green-500 underline-offset-4">[ LEETCODE ]</a>
                        <a href="https://www.linkedin.com/in/bhagwan-gire-84013a293/" className="hover:text-green-400 transition-colors uppercase text-xs tracking-widest hover:underline decoration-green-500 underline-offset-4">[ LINKEDIN_NETWORK ]</a>
                    </div>
                </div>

                <div className="relative hidden lg:block h-96 w-full border border-green-900 bg-black/50 p-4 font-mono text-xs overflow-hidden">
                    {/* Decorative ASCII Art / System Stats */}
                    <div className="absolute top-2 right-2 text-green-800">SYS_MONITOR</div>
                    <div className="grid grid-cols-2 gap-4 h-full content-center">
                        <div className="border border-green-800 p-4 relative">
                            <div className="absolute -top-3 left-2 bg-black px-1 text-green-600">CPU_CORE_0</div>
                            <div className="w-full bg-green-900/30 h-2 mt-2 overflow-hidden">
                                <div className="h-full bg-green-500 animate-pulse w-[75%]"></div>
                            </div>
                            <div className="flex justify-between mt-1 text-green-700">
                                <span>USAGE</span>
                                <span>75%</span>
                            </div>
                            <div className="mt-4 space-y-1 text-green-800">
                                <div>PROCESS_ID: 8080</div>
                                <div>THREAD_COUNT: 12</div>
                                <div>STATUS: OPTIMAL</div>
                            </div>
                        </div>

                        <div className="border border-green-800 p-4 relative">
                            <div className="absolute -top-3 left-2 bg-black px-1 text-green-600">MEMORY_ALLOC</div>
                            <div className="w-full bg-green-900/30 h-2 mt-2 overflow-hidden">
                                <div className="h-full bg-green-500 animate-pulse w-[45%]"></div>
                            </div>
                            <div className="flex justify-between mt-1 text-green-700">
                                <span>USAGE</span>
                                <span>45%</span>
                            </div>
                            <div className="mt-4 space-y-1 text-green-800">
                                <div>HEAP_SIZE: 1024MB</div>
                                <div>GC_CYCLE: IDLE</div>
                                <div>LEAKS: 0 DETECTED</div>
                            </div>
                        </div>

                        <div className="col-span-2 border border-green-800 p-4 font-mono text-[10px] leading-tight text-green-600 h-32 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-1 text-green-800">NETWORK_LOGS</div>
                            <div className="animate-scan absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none"></div>
                            <p>{'>'} PACKET_RECEIVED: SRC=192.168.1.105 PROTO=TCP LEN=40</p>
                            <p>{'>'} HANDSHAKE_INIT: SYN_ACK RECEIVED</p>
                            <p>{'>'} PORT_SCAN: 80 [OPEN], 443 [OPEN], 3000 [OPEN]</p>
                            <p>{'>'} DECRYPTING PAYLOAD...</p>
                            <p>{'>'} ACCESS_TOKEN: VERIFIED</p>
                            <p>{'>'} ESTABLISHING SECURE TUNNEL...</p>
                            <p>{'>'} CONNECTION_ESTABLISHED: 10.0.0.5 <span className="animate-pulse">_</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
