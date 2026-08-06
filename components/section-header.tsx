import { motion } from 'motion/react'

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={`max-w-2xl ${alignmentClass}`}
    >
      <motion.span
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
        className="font-mono text-xs uppercase tracking-widest text-primary"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
        className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          className="mt-4 text-pretty text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}