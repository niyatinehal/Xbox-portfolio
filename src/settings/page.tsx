'use client';
import { motion } from 'framer-motion';

const transition = { type: "spring" as const, stiffness: 300, damping: 25 };

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-8 text-white">
            <motion.h1
                className="text-4xl font-bold text-lime-400 mb-6"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
            >
                ⚙️ Settings & Contact
            </motion.h1>

            <motion.div
                className="bg-gray-900 rounded-xl p-6 border border-lime-700/40 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
            >
                <ul className="space-y-4 text-lime-300">
                    <li>📧 Email: niyatinehal67@gmail.com</li>
                    <li>🔗 LinkedIn: /niyati-nehal-5791221b6</li>
                    <li>🐙 GitHub: /niyatinehal</li>
                    <li>🌐 Portfolio: https://niyati-nehal.netlify.app/</li>
                </ul>
            </motion.div>
        </main>
    );
}
