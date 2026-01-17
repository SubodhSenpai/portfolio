"use client";

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Link from 'next/link';
import { Terminal, User, Rocket } from 'lucide-react';

export default function AntigravityPage() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false);

    // Mouse position ref
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setIsClient(true);
        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    };

    useEffect(() => {
        if (!isClient || !canvasRef.current || !sceneRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Runner = Matter.Runner,
            Composite = Matter.Composite,
            Events = Matter.Events;

        const engine = Engine.create();
        const world = engine.world;

        engine.gravity.y = 0;
        engine.gravity.x = 0;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });

        // --- ADVANCED 3D PARTICLE FIELD ---
        const particleCount = 4000; // High density for cloud effect
        const particles: Matter.Body[] = [];
        const baseState: { x: number, y: number, z: number, vx: number, vy: number }[] = [];

        // 3D Grid Distribution
        // We occupy a large volume to create depth
        const depth = 800;
        const cols = Math.ceil(Math.sqrt(particleCount * (width / height)));
        const rows = Math.ceil(particleCount / cols);
        const spacingX = width * 1.2 / cols; // Slightly wider than screen
        const spacingY = height * 1.2 / rows;
        const offsetX = -width * 0.1; // Center the larger field
        const offsetY = -height * 0.1;

        for (let i = 0; i < particleCount; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Base 3D position
            const x = offsetX + col * spacingX + (Math.random() - 0.5) * 10;
            const y = offsetY + row * spacingY + (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 200; // Slight depth variation

            baseState.push({ x, y, z, vx: 0, vy: 0 });

            // Physical body (Sensor)
            // Vertical dashes (2x10) instead of horizontal
            const particle = Bodies.rectangle(width / 2, height / 2, 2, 10, {
                isSensor: true,
                frictionAir: 0.05,
                render: { fillStyle: '#fff' }
            });
            particles.push(particle);
        }
        World.add(world, particles);

        // Physics Constants
        let time = 0;
        const focalLength = 600;
        const bubbleRadius = 120; // The size of the "cursor ball"
        const mouseInteractionRadius = 180; // slightly larger for gravity effect
        const springStrength = 0.05;
        const damping = 0.82;

        Events.on(engine, "beforeUpdate", () => {
            time += 0.01;
            const mouseX = mousePos.current.x;
            const mouseY = mousePos.current.y;

            particles.forEach((body, i) => {
                const state = baseState[i];

                // 1. SPRING PHYSICS (Elastic Return)
                // Calculate force to return to base position
                const dxBase = state.x - body.position.x;
                const dyBase = state.y - body.position.y;

                state.vx += dxBase * springStrength;
                state.vy += dyBase * springStrength;

                // 2. CURSOR BUBBLE PHYSICS
                const dxMouse = body.position.x - mouseX;
                const dyMouse = body.position.y - mouseY;
                const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
                const dist = Math.sqrt(distSq);

                // If inside interaction zone
                if (dist < mouseInteractionRadius) {

                    // A. GRAVITY/ATTRACTION - Pull towards bubble surface
                    const angle = Math.atan2(dyMouse, dxMouse);

                    // Ideally we want them ON the surface (dist = bubbleRadius)
                    if (dist < bubbleRadius) {
                        // INSIDE BUBBLE: Push OUT to surface
                        const pushOut = bubbleRadius - dist;
                        state.vx += Math.cos(angle) * pushOut * 0.2;
                        state.vy += Math.sin(angle) * pushOut * 0.2;

                        // Rotate to lie FLAT on the surface (Tangent)
                        Matter.Body.setAngle(body, angle + Math.PI / 2);
                    } else {
                        // OUTSIDE BUT CLOSE: Pull IN to surface (Gravity), but keep some distance
                        const pullIn = (dist - bubbleRadius) * 0.1;
                        state.vx -= Math.cos(angle) * pullIn * 0.1;
                        state.vy -= Math.sin(angle) * pullIn * 0.1;

                        // Standard vertical orientation when outside
                        Matter.Body.setAngle(body, 0);
                    }
                } else {
                    Matter.Body.setAngle(body, 0);
                }

                // 3. Autonomous Drift
                state.vx += Math.sin(time + state.y * 0.01) * 0.1;
                state.vy += Math.cos(time + state.x * 0.01) * 0.1;

                // Apply Velocity + Damping
                state.vx *= damping;
                state.vy *= damping;

                const screenX = body.position.x + state.vx;
                const screenY = body.position.y + state.vy;

                Matter.Body.setPosition(body, { x: screenX, y: screenY });

                // 4. 3D PROJECTION & ORIENTATION
                // Calculate scale based on Z (pseudo-depth from drift)
                // Let's create a "doming" effect where center is close, edges far
                const centerX = width / 2;
                const centerY = height / 2;
                const distFromCenter = Math.sqrt(Math.pow(screenX - centerX, 2) + Math.pow(screenY - centerY, 2));

                // Virtual Z curves away at edges
                const curveZ = state.z + (distFromCenter * distFromCenter) / 2000;
                const scale = focalLength / (focalLength + curveZ);


                // 6. VISIBILITY (Show particles near bubble)
                let opacity = 0;
                // Visible if near the bubble surface
                if (dist < mouseInteractionRadius) {
                    opacity = Math.max(0, 1 - (dist - bubbleRadius) / 50);
                    // Make particles ON the bubble fully visible
                    if (dist < bubbleRadius + 10) opacity = 1;
                }

                // Color scaling
                const normalizedY = Math.min(1, Math.max(0, screenY / height));
                const hue = normalizedY * 300;

                body.render.fillStyle = `hsl(${hue}, 100%, 50%)`;
                body.render.opacity = opacity;
                body.render.visible = opacity > 0.05;

                // Reset scale after render so it doesn't compound
                // Use a trick: setAngle resets the vertices from base shape usually, 
                // but Matter.Body.scale is permanent. 
                // We need to be careful. Better to just set scale directly conceptually 
                // Actually, resizing bodies every frame is expensive in Matter.js.
                // Let's just adjust visual opacity/color to simulate depth efficiently.
            });
        });

        Matter.Runner.run(Runner.create(), engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            Composite.clear(world, false);
            Engine.clear(engine);
            if (render.canvas) render.canvas.remove();
        };

    }, [isClient]);

    return (
        <div
            ref={sceneRef}
            onMouseMove={handleMouseMove}
            className="relative w-screen h-screen bg-white overflow-hidden font-sans selection:bg-purple-100 cursor-none"
        >
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

            {/* STATIC CENTERED CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">

                {/* Main Heading */}
                <div className="w-[90vw] max-w-[900px] mb-12 pointer-events-auto cursor-default">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-center text-[#1a1a1a] leading-tight tracking-tighter">
                        Interact with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Cursor</span>
                    </h1>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                    {/* Dev Portfolio (Dark Button) */}
                    <Link href="/dev">
                        <button className="group relative flex items-center gap-2 px-8 py-4 bg-[#111] text-white rounded-[1.5rem] font-medium transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-lg cursor-pointer">
                            <Terminal className="w-5 h-5" />
                            <span>Dev Portfolio</span>
                        </button>
                    </Link>

                    {/* Visual Portfolio (Light Button) */}
                    <Link href="/portfolio">
                        <button className="group relative flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-[1.5rem] font-medium transition-all hover:bg-gray-50 hover:border-gray-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer">
                            <User className="w-5 h-5" />
                            <span>Visual Portfolio</span>
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}
