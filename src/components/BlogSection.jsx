import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- BLOG CONTENT DATA ---
const BLOG_POSTS = [
  {
    id: "root-101",
    date: "14 DEC 2025",
    title: "Breaking the Chains: The Android Modding Ladder",
    description:
      'A technical guide to escaping the "Walled Garden". Understanding Bootloader Chains of Trust, Recovery Partitions, Root Privilege Escalation, and Zygote Injection.',
    content: (
      <>
        <div className="space-y-10 text-sm md:text-base leading-relaxed text-text-2">
          {/* INTRO */}
          <div>
            <p className="mb-4">
              Android is built on the Linux kernel, yet it lacks the freedom
              associated with Linux. Out of the box, it effectively operates as
              a "Walled Garden," where the manufacturer (OEM) enforces a strict
              Chain of Trust to ensure system integrity.
            </p>
            <p>
              To gain true administrative control, we must systematically
              dismantle these security layers. This is the{" "}
              <strong>Modding Ladder</strong>.
            </p>
          </div>

          {/* LEVEL 1: BOOTLOADER */}
          <div className="border border-border p-6 bg-bg-2 relative group">
            <div className="absolute top-0 left-0 bg-accent-1 text-black font-bold px-2 py-0.5 text-xs">
              LEVEL 1
            </div>
            <h3 className="text-xl font-bold text-text-1 mt-4 mb-2">
              The Bootloader (Chain of Trust)
            </h3>
            <p className="mb-4">
              The bootloader is the first program that runs when you power on
              the device. Its primary responsibility is to verify the
              cryptographic signature of the OS kernel and recovery image before
              loading them.
            </p>
            <ul className="list-disc pl-5 text-text-3 space-y-2">
              <li>
                <strong>Locked State:</strong> The bootloader strictly enforces
                signature verification. It will only boot images signed by the
                OEM's private key.
              </li>
              <li>
                <strong>Unlocked State:</strong> We disable this signature
                check. This allows the bootloader to boot <em>unsigned</em> or
                custom-signed code (like Custom ROMs or modified kernels).
              </li>
            </ul>
            <div className="mt-4 p-2 border border-dashed border-border text-xs text-text-4 font-mono">
              Note: Unlocking triggers a factory reset and often trips hardware
              fuses (e.g., Samsung Knox), permanently marking the device as
              "untrusted."
            </div>
          </div>

          {/* LEVEL 2: RECOVERY */}
          <div className="border border-border p-6 bg-bg-2 relative group">
            <div className="absolute top-0 left-0 bg-accent-1 text-black font-bold px-2 py-0.5 text-xs">
              LEVEL 2
            </div>
            <h3 className="text-xl font-bold text-text-1 mt-4 mb-2">
              Custom Recovery (Partition Access)
            </h3>
            <p className="mb-4">
              The stock recovery environment is minimalist, designed only to
              flash update packages signed with official keys. To modify the
              system, we replace it with a <strong>Custom Recovery</strong>{" "}
              (like TWRP).
            </p>
            <p className="mb-4">
              Technically, this gives us unrestricted read/write access to the
              device's partitions (`/system`, `/data`, `/vendor`) while the main
              OS is dormant.
            </p>
            <div className="font-mono text-xs bg-black p-3 text-green-500 border-l-2 border-green-500">
              <span className="text-gray-500">
                # Flashing Custom Recovery via Fastboot
              </span>
              <br />
              &gt; fastboot devices
              <br />
              <span className="opacity-70">List of devices attached</span>
              <br />
              <br />
              &gt; fastboot flash recovery twrp.img
              <br />
              <span className="opacity-70">
                Sending 'recovery' (65536 KB)... OKAY
              </span>
              <br />
              <span className="opacity-70">Writing 'recovery'... OKAY</span>
              <br />
              <br />
              &gt; fastboot boot twrp.img
              <br />
              <span className="opacity-70">Booting... OKAY</span>
            </div>
          </div>

          {/* LEVEL 3: ROOT */}
          <div className="border border-border p-6 bg-bg-2 relative group">
            <div className="absolute top-0 left-0 bg-accent-1 text-black font-bold px-2 py-0.5 text-xs">
              LEVEL 3
            </div>
            <h3 className="text-xl font-bold text-text-1 mt-4 mb-2">
              Root Access (Privilege Escalation)
            </h3>
            <p className="mb-4">
              Standard Android apps run in a sandbox with a specific User ID
              (UID). They cannot access system-level files. "Rooting" introduces
              the <code>su</code> (Super User) binary to the system path.
            </p>
            <p className="mb-4">
              Modern solutions like <strong>Magisk</strong> use a "Systemless"
              approach. Instead of modifying the actual `/system` partition
              (which would break OTA updates and SafetyNet), Magisk mounts a
              "mask" over the file system during boot.
            </p>
            <ul className="list-disc pl-5 text-text-3 space-y-1">
              <li>
                <strong>The Daemon:</strong> Magisk runs a daemon (`magiskd`)
                that intercepts requests for root access.
              </li>
              <li>
                <strong>The Manager:</strong> An app that manages which
                applications are granted access to the `su` binary.
              </li>
            </ul>
          </div>

          {/* LEVEL 4: LSPOSED & ZYGOTE */}
          <div className="border border-border p-6 bg-bg-2 relative group">
            <div className="absolute top-0 left-0 bg-accent-1 text-black font-bold px-2 py-0.5 text-xs">
              LEVEL 4
            </div>
            <h3 className="text-xl font-bold text-text-1 mt-4 mb-2">
              LSPosed & The Zygote
            </h3>
            <p className="mb-4">
              This is where dynamic instrumentation happens. To understand
              LSPosed, you must understand the{" "}
              <a href="https://en.wikipedia.org/wiki/Android_execution_environment" target="_blank" rel="noopener noreferrer" className="text-accent-1 font-bold hover:underline">Zygote</a> process.
            </p>
            <p className="mb-4">
              <strong>The Zygote</strong> is the primordial process for all
              Android apps. During system boot, it pre-loads common Java classes
              and resources. Whenever you launch an app, Android `forks`
              (clones) the Zygote to create the new app process. This saves
              memory and time.
            </p>
            <p className="mb-4">
              <strong>LSPosed</strong> injects code into the Zygote itself.
              Because every app is a clone of Zygote, every app inherits this
              injected code.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="flex-1 border border-border p-3 bg-bg-3">
                <div className="text-text-2 text-xs font-bold mb-2 uppercase tracking-wider">
                  Method Hooking
                </div>
                <div className="text-text-4 text-xs">
                  LSPosed finds a target method in memory (e.g.,
                  `isScreenshotAllowed`) and replaces its address pointer. When
                  the system calls this function, it unknowingly executes our
                  custom code instead.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// --- COMPONENT ---

export default function BlogSection({ onExit }) {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const activePost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-bg-4 text-text-1 font-mono p-4 md:p-8 pt-24 max-w-4xl mx-auto">
      {/* Header / Nav */}
      <div className="flex items-center justify-between mb-12 border-b-2 border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-accent-1">~/moksh/</span>blog
        </h1>
        <button
          onClick={onExit}
          className="px-3 py-1 text-sm border border-border hover:border-accent-1 hover:text-accent-1 transition-colors uppercase cursor-pointer"
        >
          [ Exit ]
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPostId ? (
          // VIEW 1: INDEX
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group border border-border p-5 cursor-pointer transition-all bg-bg-2 hover:bg-bg-3 relative overflow-hidden"
              >
                {/* 4 Corners Hover Effect */}
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-accent-1 transition-all duration-300"></div>
                {/* Top Right */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-accent-1 transition-all duration-300"></div>
                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-accent-1 transition-all duration-300"></div>
                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-accent-1 transition-all duration-300"></div>

                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3 px-2">
                  <h2 className="text-xl font-bold group-hover:text-accent-1 transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-xs text-text-4 font-mono mt-1 md:mt-0 border border-border/50 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
                <p className="text-text-3 text-sm leading-relaxed mb-4 px-2">
                  {post.description}
                </p>
                <div className="flex items-center text-xs text-accent-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300 px-2">
                  <span>READ_ENTRY</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          // VIEW 2: READER
          <motion.div
            key="reader"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setSelectedPostId(null)}
              className="mb-8 text-sm text-text-4 hover:text-accent-1 flex items-center gap-2 group transition-colors cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                &lt;
              </span>{" "}
              <span>RETURN_TO_INDEX</span>
            </button>

            <article className="border border-border p-6 md:p-10 bg-bg-1 relative">
              {/* Header */}
              <header className="mb-10 border-b border-border pb-6">
                <div className="text-xs text-text-4 mb-2 font-mono flex items-center gap-2">
                  <span>{activePost.date}</span>
                  <span className="w-1 h-1 bg-accent-1 rounded-full"></span>
                  <span className="text-accent-1">GUIDE</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-1 mb-4 leading-tight">
                  {activePost.title}
                </h1>
              </header>

              {/* Content */}
              <div className="blog-content">{activePost.content}</div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-border/50 flex justify-between items-center text-xs text-text-5 font-mono">
                <div>UID: 0 (root)</div>
                <div>EOF</div>
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
