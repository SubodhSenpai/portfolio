"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Twitter, Globe, Mail, MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from 'next/link';

export default function PortfolioPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl tracking-tighter hover:text-blue-600 transition-colors">
                        {portfolioData.personal.name}.
                    </Link>
                    <div className="flex gap-4">
                        <a href={portfolioData.personal.links.github} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors"><Github size={20} /></a>
                        <a href={portfolioData.personal.links.linkedin} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-24">

                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col gap-6"
                >
                    <motion.div variants={itemVariants} className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
                        {portfolioData.personal.role}
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                        Hello, I'm {portfolioData.personal.name}. <br />
                        <span className="text-neutral-400">I build intelligent systems.</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-neutral-600 max-w-2xl leading-relaxed">
                        {portfolioData.personal.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-4 text-sm text-neutral-500 font-medium">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> {portfolioData.personal.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> {portfolioData.personal.email}
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-200">
                        {portfolioData.personal.quickStats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                                <div className="text-sm text-neutral-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Skills Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {Object.entries(portfolioData.skills).map(([category, skills]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold uppercase tracking-wider text-neutral-400 mb-4 border-b border-neutral-200 pb-2">{category}</h3>
                                <div className="space-y-4">
                                    {skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium text-neutral-800">{skill.name}</span>
                                                <span className="text-neutral-400 text-sm">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-neutral-100 rounded-full h-2">
                                                <div className="bg-neutral-800 h-2 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
                        Web Development Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portfolioData.projects.map((project) => (
                            <div key={project.name} className="group relative bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                                        <p className="text-neutral-500 text-sm">{project.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><Github size={18} /></a>}
                                        {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="p-2 hover:bg-neutral-100 rounded-full transition-colors"><ExternalLink size={18} /></a>}
                                    </div>
                                </div>
                                <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                                    {project.tech}
                                </p>
                                <ul className="space-y-2">
                                    {project.features?.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-neutral-500">
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Experience Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-green-600 rounded-full"></span>
                        Experience
                    </h2>
                    <div className="border-l-2 border-neutral-200 pl-8 space-y-12 relative">
                        {portfolioData.experience.map((exp, idx) => (
                            <div key={idx} className="relative">
                                <span className="absolute -left-[41px] top-1 w-5 h-5 bg-neutral-50 border-4 border-green-600 rounded-full"></span>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-neutral-900">{exp.role}</h3>
                                    <div className="flex items-center gap-2 text-neutral-500 text-sm font-medium">
                                        <Calendar size={14} />
                                        {exp.period}
                                    </div>
                                </div>
                                <div className="text-lg font-medium text-neutral-700 mb-4">{exp.company} | {exp.location}</div>
                                <ul className="space-y-2">
                                    {exp.achievements.map((item, i) => (
                                        <li key={i} className="text-neutral-600 flex gap-2">
                                            <span className="mt-2 w-1 h-1 bg-neutral-400 rounded-full shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="bg-neutral-900 text-white rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work together?</h2>
                        <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                            I'm currently available for freelance projects and open to full-time opportunities.
                        </p>
                        <a
                            href={`mailto:${portfolioData.personal.email}`}
                            className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors"
                        >
                            <Mail size={18} />
                            Say Hello
                        </a>
                    </div>
                    {/* Decorative background blur */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
                </section>
            </main>

            <footer className="bg-neutral-100 border-t border-neutral-200 py-8 text-center text-neutral-500 text-sm">
                <p>© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
            </footer>
        </div>
    );
}
