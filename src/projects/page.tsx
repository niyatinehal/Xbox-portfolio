'use client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const projects = [
    {
        title: 'K-Verse',
        desc: 'A full-stack social media app',
        tags: ['React', 'Tailwind', 'CRUD'],
        link: 'https://k-verse-connect.netlify.app/'
    },
    {
        title: 'Bookshala',
        desc: 'E-commerce app for books',
        tags: ['React', 'Cart', 'Filter'],
        link: 'https://bookshalaa-library.netlify.app/'
    },
    {
        title: 'Profile',
        desc: 'Know more about me',
        tags: ['Bio', 'Skills', 'Achievements'],
        link: '/profile' // this will use next/link
    }
];

const transition = { type: 'spring', stiffness: 300, damping: 25 };

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-8 text-white">
            <motion.h1
                className="text-4xl font-bold text-lime-400 mb-6"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
            >
                📂 Projects
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => {
                    const isInternal = project.link.startsWith("/");

                    const Card = (
                        <motion.div
                            className="bg-gray-900 p-6 rounded-xl border border-lime-700/40 shadow-xl hover:border-lime-400/60"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...transition, delay: 0.2 + index * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h2 className="text-xl font-bold text-lime-300">{project.title}</h2>
                            <p className="text-sm text-gray-400 mt-1">{project.desc}</p>
                            <div className="flex gap-2 flex-wrap mt-3 text-xs">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="bg-lime-800/30 px-2 py-1 rounded-full text-lime-300">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    );

                    return isInternal ? (
                        <Link href={project.link} key={index}>
                            <a className="block">{Card}</a>
                        </Link>
                    ) : (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            {Card}
                        </a>
                    );
                })}
            </div>
        </main>
    );
}
