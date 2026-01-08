"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lime color for all elements - consistent across all
    const limeColor = "#BDD631";

    return (
        <section className="relative h-[calc(100vh-80px)] min-h-[600px] bg-olive overflow-hidden flex items-center">
            {/* BACKGROUND GRADIENTS & BLURS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-lime/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-forest/40 rounded-full blur-3xl" />

                {/* Grid overlay for texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(${limeColor} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* ========== RIGHT SIDE GRAPHICS CONTAINER ========== */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[55%] h-[80%] pointer-events-none">

                {/* QATAR MAP - Centered vertically */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[30%] lg:right-[33%] w-[260px] lg:w-[320px] h-[360px] lg:h-[440px] z-20 pointer-events-auto hover:scale-105 transition-transform duration-700">
                    <svg
                        className="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-500 hover:opacity-30"
                        viewBox="0 0 360 720"
                        fill={limeColor}
                        fillOpacity="0.12"
                        stroke={limeColor}
                        strokeOpacity="0.2"
                        strokeWidth="1"
                    >
                        <g>
                            <path d="M87.6,146.8 L87.0,144.4 L84.3,147.4 L78.5,141.2 L79.2,131.9 L89.5,106.8 L91.1,98.4 L92.2,78.5 L96.7,82.2 L97.9,84.7 L100.3,84.7 L109.2,58.5 L117.1,47.1 L128.4,42.3 L134.3,40.9 L150.9,34.3 L154.4,31.8 L156.5,25.1 L165.7,15.6 L167.8,9.1 L175.0,11.7 L183.1,9.1 L197.5,0.0 L228.9,16.9 L235.3,24.0 L236.0,32.4 L235.2,43.3 L235.6,52.8 L239.7,56.8 L247.2,59.8 L249.6,67.1 L250.0,76.1 L252.0,84.2 L258.2,89.8 L263.1,90.7 L263.5,144.2 L235.5,144.6 L235.3,127.8 L216.2,127.9 L216.1,114.0 L195.2,114.0 L195.2,101.4 L139.6,101.5 L139.7,147.1 Z" />
                            <path d="M257.7,266.2 L259.9,290.0 L261.1,320.8 L275.8,349.7 L250.9,341.4 L219.8,339.2 L212.8,294.5 L212.8,259.9 L218.6,266.2 Z" />
                            <path d="M275.8,349.7 L261.1,320.8 L259.9,290.0 L257.7,266.2 L259.6,240.0 L278.1,219.4 L300.9,228.4 L311.2,234.6 L304.4,236.3 L299.0,239.2 L293.5,236.5 L294.6,259.4 L293.7,266.7 L288.3,274.7 L286.1,278.9 L287.0,283.0 L301.7,308.2 L304.1,314.3 L304.9,320.4 L303.8,339.4 Z" />
                            <path d="M315.2,411.4 L308.0,398.3 L302.3,393.1 L275.8,349.7 L303.8,339.4 L303.8,339.4 L302.4,362.4 L303.0,372.0 L305.2,376.9 L310.2,379.0 L333.6,382.6 L337.2,386.4 L340.6,395.1 L342.1,402.7 L327.3,400.3 Z M282.8,438.2 L269.8,420.9 L279.1,412.9 L295.5,428.2 L288.7,432.8 Z" />
                            <path d="M275.8,349.7 L302.3,393.1 L308.0,398.3 L315.2,411.4 L305.3,421.5 L295.5,428.2 L279.1,412.9 L269.8,420.9 L282.8,438.2 L273.5,446.7 L267.4,465.6 L259.9,480.5 L231.3,467.9 L231.9,503.0 L187.3,503.2 L187.8,662.9 L184.5,667.5 L185.5,671.0 L158.5,692.7 L137.7,699.8 L115.1,700.0 L91.1,696.6 L71.0,688.1 L51.9,666.6 L22.7,618.4 L30.2,617.5 L40.6,608.2 L43.3,597.0 L39.9,555.4 L36.6,544.4 L19.5,512.6 L18.2,506.1 L22.5,493.8 L23.4,485.3 L22.9,477.4 L20.5,474.0 L9.8,467.5 L6.9,452.7 L6.3,436.6 L2.7,426.2 L5.6,418.3 L4.9,409.2 L3.2,399.4 L2.7,389.9 L5.9,366.2 L5.6,357.0 L0.0,324.2 L4.6,305.3 L5.1,296.7 L0.0,291.4 L10.7,277.2 L18.3,276.0 L22.8,281.5 L24.1,289.5 L27.6,292.8 L27.6,301.3 L38.2,303.3 L31.9,285.6 L30.5,278.1 L30.0,270.2 L32.2,260.1 L32.5,254.7 L30.0,249.3 L26.8,247.1 L18.1,245.5 L13.5,243.3 L18.0,237.8 L28.8,235.6 L34.1,232.7 L37.9,223.5 L42.1,223.1 L44.6,227.2 L47.6,228.1 L49.6,231.4 L48.9,238.8 L46.3,250.6 L46.7,263.0 L49.9,271.3 L54.6,276.1 L58.6,274.9 L60.8,261.4 L61.0,250.9 L62.7,246.3 L67.3,241.6 L73.3,246.0 L78.7,246.2 L81.3,243.2 L86.8,230.4 L89.8,225.1 L78.8,229.3 L68.7,231.1 L60.3,227.7 L54.6,216.1 L54.1,209.9 L57.0,189.3 L62.7,181.8 L59.7,175.5 L59.7,162.4 L65.2,163.7 L68.3,155.5 L72.0,153.2 L74.7,154.6 L78.5,163.5 L78.6,168.6 L140.1,168.5 L140.1,187.2 L183.3,187.1 L186.2,210.1 L196.8,236.7 L212.8,259.9 L212.8,294.5 L219.8,339.2 L250.9,341.4 Z" />
                            <path d="M342.1,402.7 L343.5,410.5 L344.5,446.6 L340.5,491.6 L342.6,496.8 L339.2,500.6 L333.2,527.0 L328.1,535.4 L314.4,551.0 L310.2,561.7 L300.8,566.3 L298.9,570.1 L288.2,612.1 L286.1,616.8 L281.4,620.4 L279.3,628.7 L276.7,647.0 L271.5,653.7 L255.3,663.4 L252.0,666.7 L249.9,676.8 L244.9,683.6 L239.4,689.1 L235.7,695.2 L231.0,688.8 L232.5,682.6 L236.1,675.7 L238.1,666.7 L235.0,661.9 L227.8,661.0 L213.8,662.5 L213.1,654.8 L210.6,654.6 L206.5,657.6 L201.2,659.6 L194.2,660.4 L187.8,662.9 L187.3,503.2 L231.9,503.0 L231.3,467.9 L259.9,480.5 L267.4,465.6 L273.5,446.7 L282.8,438.2 L288.7,432.8 L295.5,428.2 L305.3,421.5 L315.2,411.4 L327.3,400.3 Z" />
                            <path d="M212.8,259.9 L196.8,236.7 L186.2,210.1 L183.3,187.1 L140.1,187.2 L140.1,168.5 L78.6,168.6 L84.2,164.8 L87.9,158.9 L89.0,151.7 L87.6,146.8 L139.7,147.1 L139.6,101.5 L195.2,101.4 L195.2,114.0 L216.1,114.0 L216.2,127.9 L235.3,127.8 L235.5,144.6 L263.5,144.2 L263.1,90.7 L266.2,91.2 L283.3,89.7 L293.0,90.6 L300.9,93.1 L307.8,96.9 L314.4,101.8 L319.7,107.1 L324.1,113.8 L327.0,121.5 L334.1,169.1 L334.0,175.1 L332.9,180.1 L329.7,182.3 L327.4,180.9 L325.1,174.6 L321.7,173.1 L318.6,175.0 L315.8,179.3 L314.3,184.3 L314.9,188.4 L318.5,191.6 L321.9,191.2 L326.0,185.3 L332.4,195.3 L327.2,205.5 L319.3,208.7 L317.7,197.3 L312.3,198.9 L298.8,206.4 L304.6,208.7 L310.7,212.4 L315.5,216.8 L317.8,221.2 L316.6,230.7 L311.2,234.6 L300.9,228.4 L278.1,219.4 L259.6,240.0 L257.7,266.2 L218.6,266.2 Z" />
                        </g>
                        {/* Doha Dot - Single blinking indicator */}
                        <circle cx="330" cy="390" r="6" fill={limeColor} fillOpacity="0.9">
                            <animate attributeName="r" values="5;9;5" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="fill-opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                {/* ===== WIND TURBINES - LEFT SIDE OF MAP ===== */}

                {/* Turbine L1 - Top left of map */}
                <div className="absolute top-[8%] right-[70%] w-14 h-14 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.15">
                        <circle cx="50" cy="50" r="4" />
                        <path d="M50 46 L51 12 L49 12 Z" />
                        <path d="M50 46 L51 12 L49 12 Z" transform="rotate(120 50 50)" />
                        <path d="M50 46 L51 12 L49 12 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* Turbine L2 - Middle left of map */}
                <div className="absolute top-[30%] right-[75%] w-12 h-12 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.12">
                        <circle cx="50" cy="50" r="3" />
                        <path d="M50 47 L51 18 L49 18 Z" />
                        <path d="M50 47 L51 18 L49 18 Z" transform="rotate(120 50 50)" />
                        <path d="M50 47 L51 18 L49 18 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* Turbine L3 - Lower left of map */}
                <div className="absolute top-[55%] right-[72%] w-10 h-10 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.1">
                        <circle cx="50" cy="50" r="3" />
                        <path d="M50 47 L51 20 L49 20 Z" />
                        <path d="M50 47 L51 20 L49 20 Z" transform="rotate(120 50 50)" />
                        <path d="M50 47 L51 20 L49 20 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* ===== WIND TURBINES - RIGHT SIDE ===== */}

                {/* Turbine R1 - Top Right Corner - MAIN */}
                <div className="absolute top-[0%] right-[5%] w-16 h-16 lg:w-20 lg:h-20 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.18">
                        <circle cx="50" cy="50" r="5" />
                        <path d="M50 45 L52 10 L48 10 Z" />
                        <path d="M50 45 L52 10 L48 10 Z" transform="rotate(120 50 50)" />
                        <path d="M50 45 L52 10 L48 10 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* Turbine R2 - Far Right Middle */}
                <div className="absolute top-[35%] right-[2%] w-14 h-14 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.14">
                        <circle cx="50" cy="50" r="4" />
                        <path d="M50 46 L51 12 L49 12 Z" />
                        <path d="M50 46 L51 12 L49 12 Z" transform="rotate(120 50 50)" />
                        <path d="M50 46 L51 12 L49 12 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* Turbine R3 - Bottom Right */}
                <div className="absolute bottom-[20%] right-[6%] w-12 h-12 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.12">
                        <circle cx="50" cy="50" r="3" />
                        <path d="M50 47 L51 15 L49 15 Z" />
                        <path d="M50 47 L51 15 L49 15 Z" transform="rotate(120 50 50)" />
                        <path d="M50 47 L51 15 L49 15 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* Turbine BL - Bottom Left of Map - NEW LARGE */}
                <div className="absolute bottom-[15%] right-[55%] w-16 h-16 lg:w-20 lg:h-20 pointer-events-auto cursor-pointer z-10 transition-transform duration-300 hover:scale-125">
                    <svg className="w-full h-full animate-[spin_30s_linear_infinite] hover:brightness-150 transition-all" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.18">
                        <circle cx="50" cy="50" r="5" />
                        <path d="M50 45 L52 10 L48 10 Z" />
                        <path d="M50 45 L52 10 L48 10 Z" transform="rotate(120 50 50)" />
                        <path d="M50 45 L52 10 L48 10 Z" transform="rotate(240 50 50)" />
                    </svg>
                </div>

                {/* ===== SOLAR PANEL ICONS ===== */}

                {/* Solar Panel 1 - Top left area */}
                <svg className="absolute top-[18%] right-[65%] w-10 h-10 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.15">
                    <path d="M4 19h16v2H4zM20 3H4v14h16V3zm-2 2v4h-3V5h3zm-5 0v4h-2V5h2zm-4 0v4H6V5h3zm-3 6h3v4H6v-4zm5 0h2v4h-2v-4zm4 0h3v4h-3v-4z" />
                </svg>

                {/* Solar Panel 2 - Bottom left area */}
                <svg className="absolute bottom-[35%] right-[68%] w-8 h-8 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.12">
                    <path d="M4 19h16v2H4zM20 3H4v14h16V3zm-2 2v4h-3V5h3zm-5 0v4h-2V5h2zm-4 0v4H6V5h3zm-3 6h3v4H6v-4zm5 0h2v4h-2v-4zm4 0h3v4h-3v-4z" />
                </svg>

                {/* ===== HEXAGONS - EDGES ONLY ===== */}

                <svg className="absolute top-[3%] right-[55%] w-10 h-10 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.15" strokeWidth="2">
                    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                </svg>

                <svg className="absolute top-[12%] right-[8%] w-9 h-9 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.12" strokeWidth="2">
                    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                </svg>

                <svg className="absolute bottom-[28%] right-[2%] w-12 h-12 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.1" strokeWidth="2">
                    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                </svg>

                <svg className="absolute bottom-[12%] right-[60%] w-8 h-8 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.1" strokeWidth="2">
                    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                </svg>

                {/* ===== LEAVES ===== */}

                <svg className="absolute top-[5%] right-[80%] w-9 h-9 rotate-45 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.15">
                    <path d="M50 0C50 0 65 35 50 55C35 75 50 100 50 100C50 100 35 75 50 55C65 35 50 0 50 0Z" />
                </svg>

                <svg className="absolute bottom-[45%] right-[78%] w-7 h-7 -rotate-20 transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.1">
                    <path d="M50 0C50 0 65 35 50 55C35 75 50 100 50 100C50 100 35 75 50 55C65 35 50 0 50 0Z" />
                </svg>

                <svg className="absolute top-[48%] right-[5%] w-8 h-8 rotate-[70deg] transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer z-10" viewBox="0 0 100 100" fill={limeColor} fillOpacity="0.12">
                    <path d="M50 0C50 0 65 35 50 55C35 75 50 100 50 100C50 100 35 75 50 55C65 35 50 0 50 0Z" />
                </svg>

                {/* ===== ESG ICONS ===== */}

                {/* Globe Icon - Far left */}
                <svg className="absolute top-[42%] right-[82%] w-8 h-8 transition-all duration-300 hover:scale-125 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.15">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>

                {/* Chart Icon - Top right */}
                <svg className="absolute top-[22%] right-[12%] w-7 h-7 transition-all duration-300 hover:scale-125 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.14">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>

                {/* Recycle Icon - Bottom */}
                <svg className="absolute bottom-[8%] right-[50%] w-7 h-7 transition-all duration-300 hover:scale-125 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.1">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                </svg>

                {/* Water Drop / Clean Energy Icon */}
                <svg className="absolute top-[65%] right-[80%] w-7 h-7 transition-all duration-300 hover:scale-125 pointer-events-auto cursor-pointer z-10" viewBox="0 0 24 24" fill={limeColor} fillOpacity="0.12">
                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
                </svg>

                {/* ===== DECORATIVE CIRCLES - Fixed color to match ===== */}
                <svg className="absolute top-[10%] right-[18%] w-16 h-16 pointer-events-auto cursor-pointer z-5 transition-all duration-300 hover:scale-110 hover:brightness-150" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.1" strokeWidth="1">
                    <circle cx="50" cy="50" r="45" />
                </svg>

                <svg className="absolute bottom-[15%] right-[15%] w-12 h-12 pointer-events-auto cursor-pointer z-5 transition-all duration-300 hover:scale-110 hover:brightness-150" viewBox="0 0 100 100" fill="none" stroke={limeColor} strokeOpacity="0.08" strokeWidth="1">
                    <circle cx="50" cy="50" r="45" />
                </svg>

                {/* ===== ANIMATED PARTICLES ===== */}
                {mounted && [...Array(18)].map((_, i) => {
                    const right = Math.random() * 80 + 10;
                    const top = Math.random() * 80 + 5;
                    return (
                        <div
                            key={`dot-${i}`}
                            className="absolute rounded-full pointer-events-auto hover:scale-150 transition-transform z-10"
                            style={{
                                top: `${top}%`,
                                right: `${right}%`,
                                width: `${Math.random() * 3 + 2}px`,
                                height: `${Math.random() * 3 + 2}px`,
                                backgroundColor: limeColor,
                                opacity: Math.random() * 0.2 + 0.08,
                                animation: 'pulse 3s infinite',
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    )
                })}

                {/* ===== CONNECTING LINES ===== */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 500" fill="none" stroke={limeColor} strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="4 4">
                    <path d="M30,50 Q100,100 150,120" />
                    <path d="M380,80 Q320,140 280,160" />
                    <path d="M20,320 Q80,280 140,260" />
                    <path d="M390,400 Q330,360 280,340" />
                </svg>
            </div>

            {/* CONTENT AREA (Left Side) */}
            <div className="relative z-20 w-full mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl lg:ml-0 lg:-ml-8 xl:-ml-12">
                    {/* Location badge */}
                    <div className="flex items-center gap-2 mb-5">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime"></span>
                        </span>
                        <span className="text-lime text-base font-medium tracking-wide uppercase">Doha, Qatar</span>
                    </div>

                    {/* Main headline */}
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-cream leading-[1.05] tracking-tight mb-5">
                        Making
                        <span className="block mt-2">Sustainability</span>
                        <span className="flex items-center gap-4 mt-2 text-lime">
                            <svg className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="italic font-light">Happen</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-cream/80 text-xl lg:text-2xl max-w-lg mb-6 leading-relaxed border-l-2 border-lime/30 pl-5">
                        Premier ESG and sustainability advisory for organizations in Qatar and globally.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-forest text-base font-semibold rounded-full hover:bg-white hover:text-forest transition-all shadow-[0_0_20px_rgba(189,214,49,0.3)] hover:shadow-[0_0_30px_rgba(189,214,49,0.5)] transform hover:-translate-y-1"
                        >
                            Start a Conversation
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream text-base font-medium rounded-full hover:bg-cream/10 hover:border-cream/50 transition-colors group backdrop-blur-sm"
                        >
                            Explore Services
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-80 animate-bounce z-30">
                <span className="text-cream text-[10px] tracking-[0.15em] uppercase font-medium">Scroll</span>
                <svg className="w-5 h-9 text-lime" fill="none" viewBox="0 0 24 42" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="38" rx="10" strokeOpacity="0.8" />
                    <path d="M12 10v6" strokeLinecap="round" />
                    <path d="M12 28l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </section>
    );
}
