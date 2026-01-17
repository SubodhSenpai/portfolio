"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // We'll use standard HTML form submission for reliability with formsubmit.co
    // But we can intercept onSubmit to show loading state
    const onSubmit = (e: React.FormEvent) => {
        setIsSubmitting(true);
        // Let the form submit naturally after a brief delay to show loading state
        // Or just use iframe method for true SPA experience? 
        // For simplicity and robustness, simple redirection form submission is best for V1.
        // The user will be redirected to formsubmit.co captcha/success page then back.
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    >
                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden cursor-default relative"
                        >
                            {/* Header */}
                            <div className="bg-neutral-800 px-6 py-6 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold">Say Hello 👋</h2>
                                    <p className="text-neutral-400 text-sm mt-1">I'd love to hear from you!</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-6">
                                <form
                                    action={`https://formsubmit.co/${portfolioData.personal.email}`}
                                    method="POST"
                                    onSubmit={() => setIsSubmitting(true)}
                                    className="space-y-4"
                                >
                                    {/* Honeypot for spam */}
                                    <input type="text" name="_honey" style={{ display: 'none' }} />
                                    {/* Disable Captcha for smoother experience (optional, user can enable later) */}
                                    <input type="hidden" name="_captcha" value="false" />
                                    {/* Redirect back to portfolio */}
                                    <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : 'https://subodh.dev'} />

                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-sm font-semibold text-neutral-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-neutral-400"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-semibold text-neutral-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-neutral-400"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="message" className="text-sm font-semibold text-neutral-700">Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            required
                                            rows={4}
                                            placeholder="Tell me about your project..."
                                            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-neutral-400 resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-neutral-500 mt-4">
                                        Powered by Formsubmit.co
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
