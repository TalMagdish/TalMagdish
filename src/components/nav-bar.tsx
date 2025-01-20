'use client';

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export function NavBar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm"
    >
      <nav className="container flex h-16 items-center justify-between px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold"
        >
          Tal
        </motion.div>
        <ul className="hidden space-x-4 md:flex">
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" asChild>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
} 