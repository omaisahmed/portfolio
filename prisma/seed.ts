import { PrismaClient } from '@prisma/client'
import { seedTestimonials } from './seed/testimonials'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('parasyte', 10)
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: hashedPassword
    },
    create: {
      name: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword
    }
  })  

  // Create profile
  // await prisma.profile.upsert({
  //   where: { id: '1' },
  //   update: {
  //     name: 'Omais Ahmed',
  //     title: 'Software Developer',
  //     bio: 'I am a passionate software developer with over 3+ years of experience, dedicated to programming, software development, and consultation. I possess an extensive knowledge of software building cycle as well as proficiency in several programming languages, gained from diverse work experiences.',
  //     githubUrl: 'https://github.com/omaisahmed',
  //     linkedinUrl: 'https://linkedin.com/in/omaisahmed'
  //   },
  //   create: {
  //     id: '1',
  //     name: 'Omais Ahmed',
  //     title: 'Software Developer',
  //     bio: 'I am a passionate software developer with over 3+ years of experience, dedicated to programming, software development, and consultation. I possess an extensive knowledge of software building cycle as well as proficiency in several programming languages, gained from diverse work experiences.',
  //     githubUrl: 'https://github.com/omaisahmed',
  //     linkedinUrl: 'https://linkedin.com/in/omaisahmed'
  //   }
  // })

  // // Create services
  // await prisma.service.createMany({
  //   data: [
  //     {
  //       title: 'Front-End Development',
  //       description: 'Cutting edge, completely custom websites built from scratch. Bespoke and unique. No templates',
  //       icon: '💻'
  //     },
  //     {
  //       title: 'Back-End Development',
  //       description: 'Whether it\'s a corporate website, e-commerce platform or custom web applications - my code is robust.',
  //       icon: '⚙️'
  //     },
  //     {
  //       title: 'Open Source - Github',
  //       description: 'I actively work as an open-source contributor on github, with numerous projects and forks - liked and shared by other developers.',
  //       icon: '🌟'
  //     }
  //   ]
  // })

  // // Create projects
  // await prisma.project.createMany({
  //   data: [
  //     {
  //       title: 'Portfolio Website',
  //       description: 'A modern portfolio website built with Next.js and Tailwind CSS',
  //       images: ['/projects/portfolio.png'], // This is correct format
  //       githubUrl: 'https://github.com/omaisahmed/portfolio',
  //       liveUrl: 'https://omaisahmed.github.io/folio/',
  //       tags: ['Next.js', 'React', 'Tailwind CSS']
  //     },
  //     {
  //       title: 'Software Development Projects',
  //       description: 'Various software development projects showcasing different technologies and solutions',
  //       images: ['/projects/software.jpg'], // This is correct format
  //       githubUrl: 'https://github.com/omaisahmed',
  //       tags: ['JavaScript', 'React', 'Node.js', 'Full Stack']
  //     }
  //   ]
  // })
  
  // await seedTestimonials()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })