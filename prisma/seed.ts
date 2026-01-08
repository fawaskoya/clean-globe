import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@thecleanglobe.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@thecleanglobe.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  // Create default site settings (using firstOrCreate pattern since no unique field)
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        whatsappNumber: "+97455225960",
        whatsappMessage: "Hello! I'm interested in your services.",
      },
    });
  }

  // ... (previous admin user and settings code)

  // Seed Services
  const services = [
    {
      slug: "esg-advisory",
      name: "ESG Advisory",
      shortDescription: "Establish robust governance, manage material risks, and align with global reporting standards.",
      description: "Establish robust governance, manage material risks, and align with global reporting standards.",
      fullDescription: "We assist organizations in structuring their Environmental, Social, and Governance (ESG) approach. Our work focuses on identifying material risks, establishing governance structures, and preparing data for disclosure against recognized standards.",
      deliverables: JSON.stringify([
        "Assess and design your ESG strategy",
        "Strategy and governance frameworks",
        "Policy development and management tools",
        "Benchmarking and measurement",
        "Carbon disclosure reporting (GRI, SASB)",
      ]),
      timeline: "Typical engagement: 6 to 10 weeks, depending on data readiness.",
      faqs: JSON.stringify([
        { question: "Why is an ESG strategy necessary?", answer: "Investors and regulators increasingly require evidence of non-financial risk management. A structured strategy ensures compliance and access to capital." },
        { question: "Which reporting standards do you support?", answer: "We align with GRI, SASB, TCFD, and local QSE requirements where applicable." },
        { question: "Do you support implementation?", answer: "Yes. We move beyond strategy to assist with policy writing, data collection processes, and management reporting." },
      ]),
    },
    {
      slug: "sustainability-advisory",
      name: "Sustainability Advisory",
      shortDescription: "Integrate sustainability into daily operations, from supply chains to green offices.",
      description: "Integrate sustainability into daily operations, from supply chains to green offices.",
      fullDescription: "Our team supports the integration of sustainability into daily operations. This includes corporate social responsibility (CSR) programs, supply chain auditing, and facility management practices that reduce environmental impact.",
      deliverables: JSON.stringify([
        "Corporate Social Responsibility (CSR) impact",
        "Green office and facility sustainability",
        "Sustainable supply chain auditing",
        "UN SDG alignment and compliance",
        "Resiliency planning and risk management",
      ]),
      timeline: "Timeline varies by scope. Specific projects typically run 3-6 months.",
      faqs: JSON.stringify([
        { question: "How do you assess supply chains?", answer: "We review supplier policies and performance data to identify environmental and social risks." },
        { question: "What does UN SDG alignment involve?", answer: "We map your current activities to specific Sustainable Development Goals to identify gaps and reporting opportunities." },
        { question: "Is training included?", answer: "We provide workshops and capacity building for internal teams as part of the implementation phase." },
      ]),
    },
    {
      slug: "energy-advisory",
      name: "Energy Advisory",
      shortDescription: "Reduce operational costs through technical audits, energy modeling, and efficiency planning.",
      description: "Reduce operational costs through technical audits, energy modeling, and efficiency planning.",
      fullDescription: "We identify opportunities to reduce energy consumption and operating costs. Our services range from technical audits of existing facilities to energy modeling for new projects and advisory on energy performance contracting.",
      deliverables: JSON.stringify([
        "Energy management and ROI monitoring",
        "Technical energy audits",
        "Energy saving investment advisory",
        "Performance contracting (ESCO) support",
        "Advanced building energy modeling",
      ]),
      timeline: "Audits typically require 2-4 weeks; implementation support is ongoing.",
      faqs: JSON.stringify([
        { question: "What is the output of an energy audit?", answer: "A technical report detailing consumption patterns, specific efficiency measures, estimated costs, and ROI calculations." },
        { question: "How do ESCO services work?", answer: "We advise on Energy Service Company (ESCO) contracts, where savings are often used to finance the necessary upgrades." },
        { question: "Can you model complex buildings?", answer: "Yes. We use industry-standard software to simulate energy performance for new designs or major renovations." },
      ]),
    },
    {
      slug: "climate-change-advisory",
      name: "Climate Change Advisory",
      shortDescription: "Quantify climate risks, manage carbon footprints, and access green financing.",
      description: "Quantify climate risks, manage carbon footprints, and access green financing.",
      fullDescription: "We help organizations quantify and manage climate-related risks. This includes TCFD-aligned reporting, carbon footprint calculation, and advisory on carbon markets and green financing mechanisms.",
      deliverables: JSON.stringify([
        "Climate risk assessment (TCFD aligned)",
        "Low carbon strategy and abatement models",
        "Carbon footprint calculation and assurance",
        "Green bond and carbon finance advisory",
        "Climate adaptation strategy",
      ]),
      timeline: "Standard risk assessment: 8-12 weeks.",
      faqs: JSON.stringify([
        { question: "What is TCFD reporting?", answer: "It is a framework for disclosing climate-related financial risks (physical and transitional) to investors and stakeholders." },
        { question: "How do carbon offsets work?", answer: "We help you identify verified high-quality offset projects to compensate for residual emissions." },
        { question: "Do you support green bond issuance?", answer: "We provide the technical frameworks and second-party opinions required for green bond validation." },
      ]),
    },
    {
      slug: "net-zero-advisory",
      name: "Net Zero Advisory",
      shortDescription: "Achieve net-zero status through certified green building frameworks and decarbonization.",
      description: "Achieve net-zero status through certified green building frameworks and decarbonization.",
      fullDescription: "We guide projects and portfolios toward net-zero status. Our expertise covers green building certifications (LEED, GSAS, WELL) and holistic strategies for waste, water, and energy reduction.",
      deliverables: JSON.stringify([
        "Green building certification (LEED, WELL, GSAS)",
        "Net Zero Energy, Water, and Waste roadmaps",
        "Decarbonization strategy and analytics",
        "Sustainable operations training",
        "Custom monitoring dashboards",
      ]),
      timeline: "Project-dependent. Certification processes often span 6-12+ months.",
      faqs: JSON.stringify([
        { question: "Which certification should we pursue?", answer: "We evaluate your location, asset type, and goals to recommend LEED, GSAS, or WELL." },
        { question: "What is defined as Net Zero?", answer: "It typically refers to achieving a balance between greenhouse gases emitted and removed, or energy consumed and generated." },
        { question: "Do you provide monitoring tools?", answer: "We specify and can help implement dashboard systems to track utility performance against targets." },
      ]),
    },
    {
      slug: "sustainability-technology",
      name: "Technology Solutions",
      shortDescription: "Innovative software and monitoring tools for real-time sustainability management.",
      description: "Innovative software and monitoring tools for real-time sustainability management.",
      fullDescription: "We leverage cutting-edge technology to streamline sustainability management. From precise carbon accounting software to real-time energy monitoring dashboards, our digital solutions turn complex data into actionable insights.",
      deliverables: JSON.stringify([
        "Carbon accounting software implementation",
        "Real-time energy monitoring dashboards",
        "Supply chain data platforms",
        "IoT sensor integration",
        "Automated ESG reporting tools",
      ]),
      timeline: "Implementation varies from 4-12 weeks depending on system complexity.",
      faqs: JSON.stringify([
        { question: "Do you build custom software?", answer: "We partner with leading tech providers and can configure custom dashboards to meet your specific needs." },
        { question: "Can it integrate with our ERP?", answer: "Yes, our solutions are designed to connect with existing enterprise resource planning systems." },
        { question: "Is the data secure?", answer: "We prioritize data security and ensure all platforms comply with global data protection standards." },
      ]),
    },
    {
      slug: "sustainability-training",
      name: "Training & Capacity Building",
      shortDescription: "Empower your workforce with the knowledge to drive internal sustainability initiatives.",
      description: "Empower your workforce with the knowledge to drive internal sustainability initiatives.",
      fullDescription: "True transformation requires culture change. We provide comprehensive training programs designed to upskill your workforce, from executive boardrooms to operational teams, ensuring sustainability is understood and practiced at every level.",
      deliverables: JSON.stringify([
        "Executive leadership workshops",
        "Sustainability fundamentals training",
        "Technical skill-building (e.g., carbon accounting)",
        "Employee engagement programs",
        "customized e-learning modules",
      ]),
      timeline: "Workshops range from half-days to multi-week certification programs.",
      faqs: JSON.stringify([
        { question: "Can you train our board members?", answer: "Yes, we offer high-level sessions focused on governance, risk, and strategic oversight for executives." },
        { question: "Do you offer certification?", answer: "We provide certificates of completion and can prepare teams for external accreditations." },
        { question: "Is it in-person or online?", answer: "We offer both delivery formats to suit your organization's preference and logistics." },
      ]),
    },
  ];

  console.log("🌱 Seeding services...");
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Seed Mock Projects
  console.log("🌱 Seeding projects...");
  const projects = [
    {
      slug: "lusail-green-tower",
      title: "Lusail Green Tower",
      description: "LEED Gold certification and energy modeling for a 45-story commercial tower in Lusail City.",
      content: "Full project details...",
      images: JSON.stringify([]),
      category: "Green Building",
      published: true,
    },
    {
      slug: "doha-industrial-audit",
      title: "Doha Industrial Facility Audit",
      description: "Comprehensive energy audit identifying 25% annual savings for a major manufacturing plant.",
      content: "Full project details...",
      images: JSON.stringify([]),
      category: "Energy Audit",
      published: true,
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // Seed Mock Contact
  console.log("🌱 Seeding test enquiry...");
  await prisma.contactSubmission.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      company: "Future Corp",
      phone: "+974 5555 5555",
      service: "ESG Advisory",
      message: "We are looking to start our ESG reporting journey and need assistance with strategy.",
    }
  });

  console.log("✅ Database seeded successfully!");
  console.log("\n📋 Admin Credentials:");
  console.log("   Email: admin@thecleanglobe.com");
  console.log("   Password: admin123");
  console.log("\n🔗 Admin Dashboard URL:");
  console.log("   http://localhost:3000/admin/login");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

