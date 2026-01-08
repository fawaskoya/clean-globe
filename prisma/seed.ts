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

  // Seed Testimonials
  console.log("🌱 Seeding testimonials...");
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechForward Solutions",
      role: "COO",
      content: "CGC helped us navigate the complex landscape of ESG reporting. Their strategic insights were instrumental in our successful TCFD disclosure.",
      rating: 5,
      displayOrder: 1,
      published: true,
    },
    {
      name: "Ahmed Al-Mansoori",
      company: "Gulf Infrastructure",
      role: "Project Director",
      content: "The energy audit conducted by the Clean Globe team identified savings we hadn't even considered. Highly professional and results-driven.",
      rating: 5,
      displayOrder: 2,
      published: true,
    },
    {
      name: "Emily Chen",
      company: "Global Retail Inc.",
      role: "Sustainability Manager",
      content: "Achieving our net-zero targets seemed impossible until we partnered with CGC. Their roadmap was practical, scientifically sound, and easy to implement.",
      rating: 5,
      displayOrder: 3,
      published: true,
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  // Seed Blog Posts
  console.log("🌱 Seeding blog posts...");
  const blogPosts = [
    {
      slug: "energy-audit-explained",
      title: "The Energy Audit: Foundation for Operational Efficiency",
      excerpt: "A technical overview of energy auditing levels and their role in identifying capital-free savings and capital investment opportunities.",
      tags: JSON.stringify(["Energy", "Efficiency", "Cost Saving"]),
      content: `# The Energy Audit: Foundation for Operational Efficiency

Effective energy management necessitates precise measurement. An energy audit serves as the technical baseline for reducing operational expenditure and carbon emissions.

## Audit Scope and Levels

We strictly follow ASHRAE standards for energy audits, which categorize assessments into three levels:

### Level 1: Walk-Through Assessment
A preliminary review to identify low-cost/no-cost measures and obvious inefficiencies. This level provides a rough estimate of savings and costs, suitable for prioritizing further study.

### Level 2: Energy Survey and Analysis
A detailed breakdown of energy use. This involves analyzing utility bills over a 12-24 month period and quantifying the breakdown of energy consumption by end-use (HVAC, lighting, process loads). It produces a clear list of Energy Conservation Measures (ECMs) with calculated ROI.

### Level 3: Detailed Analysis of Capital-Intensive Modifications
Required for major capital investments. This involves comprehensive data collection and engineering analysis to provide a high degree of confidence for financial decision-making.

## Deliverables and Value

The primary output is a prioritized roadmap of ECMs. Experience shows that operational adjustments identified in Level 1 and 2 audits often yield 5-10% savings with minimal capital outlay, funding further efficiency projects.`,
      published: true,
      createdAt: new Date("2024-06-01"),
    },
    {
      slug: "esg-strategy-value",
      title: "The Strategic Value of ESG",
      excerpt: "Moving beyond compliance: How Environmental, Social, and Governance frameworks drive risk mitigation and capital access.",
      tags: JSON.stringify(["ESG", "Strategy", "Governance"]),
      content: `# The Strategic Value of ESG

Environmental, Social, and Governance (ESG) factors have transitioned from peripheral corporate social responsibility activities to central strategic pillars. For enterprises in the GCC region, a robust ESG framework is increasingly a prerequisite for market competitiveness and capital access.

## From Compliance to Capital Strategy

While regulatory compliance remains a baseline driver, the maturation of ESG demonstrates its role in value creation. Institutional investors and financial institutions utilize ESG performance as a proxy for management quality and risk resilience.

1.  **Capital Access**: Evidence of non-financial risk management is often required for favorable lending terms and attracting institutional equity.
2.  **Risk Mitigation**: Proactive management of environmental and social risks prevents costly operational disruptions and reputational damage.
3.  **Operational Resilience**: Sustainable supply chains and resource efficiency lower exposure to commodity price volatility.

## Implementation Approach

A pragmatic ESG strategy begins with a Materiality Assessment to identify issues relevant to the specific business model and sector. This ensures resources are allocated to areas with excessive financial and social impact, rather than generic checkbox exercises.`,
      published: true,
      createdAt: new Date("2024-05-15"),
    },
    {
      slug: "getting-started-sustainability",
      title: "Initiating Corporate Sustainability",
      excerpt: "A structured approach to establishing a corporate sustainability baseline and setting initial targets.",
      tags: JSON.stringify(["Getting Started", "Guide", "Strategy"]),
      content: `# Initiating Corporate Sustainability

Effective sustainability programs are built on data, not vague aspirations. For organizations initiating this process, the focus must be on establishing a credible baseline from which to measure progress.

## Phase 1: Baseline Assessment

Before setting targets, organizations must quantify their current impact.
*   **Utility Data**: Compile 12-24 months of electricity, water, and waste data.
*   **Supply Chain**: Map Tier 1 suppliers to identify primary environmental and social risks.

## Phase 2: Engagement and Governance

Sustainability cannot sit solely with a specific department.
*   **Executive Sponsorship**: Designate a board-level sponsor to ensure strategic alignment.
*   **Cross-Functional Teams**: operationalize goals through a "Green Team" or steering committee representing Operations, HR, Finance, and Procurement.

## Phase 3: Target Setting

Adopting "SMART" (Specific, Measurable, Achievable, Relevant, Time-bound) goals is critical. Avoid broad statements like "becoming green." Instead, commit to specific metrics, such as "Reducing Scope 2 emissions by 15% by 2026."`,
      published: true,
      createdAt: new Date("2024-07-01"),
    },
    {
      slug: "net-zero-roadmap",
      title: "Net Zero: Definitions and Hierarchy of Action",
      excerpt: "Defining Net Zero boundaries (Scope 1, 2, 3) and prioritizing reduction over offsetting.",
      tags: JSON.stringify(["Net Zero", "Strategy", "Carbon"]),
      content: `# Net Zero: Definitions and Hierarchy of Action

Achieving Net Zero involves balancing greenhouse gases emitted with those removed from the atmosphere. It is a rigorous technical challenge requiring a clear definition of boundaries and a strict hierarchy of mitigation actions.

## Defining the Boundary

Clarity on scope is essential for credible reporting.
*   **Net Zero Energy**: Often limited to site-based energy consumption and on-site generation.
*   **Net Zero Carbon**: Typically covers operational emissions (Scope 1 & 2).
*   **Net Zero Standard**: The Science Based Targets initiative (SBTi) requires coverage of value chain emissions (Scope 3), which often constitute the majority of an organization's footprint.

## The Mitigation Hierarchy

Credible Net Zero strategies prioritize internal reduction before compensation.

1.  **Demand Reduction**: Eliminate unnecessary energy use through efficiency and behavioral change.
2.  **Decarbonization**: Switch to lower-carbon energy vectors (e.g., electrification of fleets, renewable energy procurement).
3.  **Compensation**: Only after maximizing reduction and decarbonization should high-quality carbon removals be used to neutralize residual emissions.

This sequence ensures that the strategy drives tangible operational improvements rather than simply paying for external offsets.`,
      published: true,
      createdAt: new Date("2024-06-25"),
    },
    {
      slug: "sustainable-green-offices",
      title: "Sustainable Office Operations",
      excerpt: "Operational strategies for high-performance workspaces, focusing on efficiency and occupant health.",
      tags: JSON.stringify(["Sustainability", "Green Buildings", "Operations"]),
      content: `# Sustainable Office Operations

The built environment accounts for a significant portion of global carbon emissions. For tenants and owners, sustainable office operations offer a dual benefit: reduced operating expenditure and improved occupant health and productivity.

## Operational Efficiency

High-performance offices go beyond simple LED upgrades. They utilize building management systems (BMS) to optimize HVAC and lighting schedules based on occupancy. Rigorous waste audits and diversion strategies (recycling, composting) further reduce the facility's environmental footprint.

## Indoor Environmental Quality (IEQ)

Frameworks like WELL and LEED emphasize the impact of the indoor environment on human cognitive function.
*   **Air Quality**: Continuous monitoring of CO2 and VOCs ensures adequate ventilation rates.
*   **Biophilia**: Integrating natural elements reduces stress and improves focus.
*   **Thermal Comfort**: providing zonal control to occupants.

Evidence suggests that certifications like LEED O+M (Operations and Maintenance) correlate with higher asset value and retention rates, validating the business case for sustainable facility management.`,
      published: true,
      createdAt: new Date("2024-05-20"),
    },
    {
      slug: "tcfd-reporting-guide",
      title: "TCFD Reporting Framework",
      excerpt: "An overview of the Task Force on Climate-related Financial Disclosures (TCFD) pillars: Governance, Strategy, Risk Management, and Metrics.",
      tags: JSON.stringify(["Climate Change", "Risk Management", "Reporting"]),
      content: `# TCFD Reporting Framework

The Task Force on Climate-related Financial Disclosures (TCFD) provides the global standard for disclosing climate-related risks and opportunities. It shifts the focus from backward-looking sustainability reports to forward-looking financial risk assessment.

## The Four Pillars

1.  **Governance**: Disclose the organization's governance around climate-related risks and opportunities, specifically board oversight and management's role.
2.  **Strategy**: Disclose the actual and potential impacts of climate-related risks and opportunities on the organization's businesses, strategy, and financial planning. This often involves scenario analysis (e.g., a 2°C vs. 4°C warming scenario).
3.  **Risk Management**: Disclose how the organization identifies, assesses, and manages climate-related risks.
4.  **Metrics and Targets**: Disclose the metrics and targets used to assess and manage relevant climate-related risks and opportunities where such information is material.

## Strategic Relevance

Adopting the TCFD framework prepares organizations for emerging regulatory mandates and satisfies the due diligence requirements of international investors seeking to understand transition and physical climate risks within their portfolios.`,
      published: true,
      createdAt: new Date("2024-06-10"),
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

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

