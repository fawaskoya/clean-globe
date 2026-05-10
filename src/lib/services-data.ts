export interface ServiceData {
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    deliverables: string[];
    timeline: string;
    faqs: { question: string; answer: string }[];
}

export const ALL_SERVICES: ServiceData[] = [
    {
        slug: "esg-advisory",
        name: "ESG Advisory",
        shortDescription: "Establish robust governance, manage material risks, and align with global reporting standards.",
        fullDescription: "We assist organizations in structuring their Environmental, Social, and Governance (ESG) approach. Our work focuses on identifying material risks, establishing governance structures, and preparing data for disclosure against recognized standards.",
        deliverables: [
            "Assess and design your ESG strategy",
            "Strategy and governance frameworks",
            "Policy development and management tools",
            "Benchmarking and measurement",
            "Carbon disclosure reporting (GRI, SASB)",
        ],
        timeline: "Typical engagement: 6 to 10 weeks, depending on data readiness.",
        faqs: [
            { question: "Why is an ESG strategy necessary?", answer: "Investors and regulators increasingly require evidence of non-financial risk management. A structured strategy ensures compliance and access to capital." },
            { question: "Which reporting standards do you support?", answer: "We align with GRI, SASB, TCFD, and local QSE requirements where applicable." },
            { question: "Do you support implementation?", answer: "Yes. We move beyond strategy to assist with policy writing, data collection processes, and management reporting." },
        ],
    },
    {
        slug: "sustainability-advisory",
        name: "Sustainability Advisory",
        shortDescription: "Integrate sustainability into daily operations, from supply chains to green offices.",
        fullDescription: "Our team supports the integration of sustainability into daily operations. This includes corporate social responsibility (CSR) programs, supply chain auditing, and facility management practices that reduce environmental impact.",
        deliverables: [
            "Corporate Social Responsibility (CSR) impact",
            "Green office and facility sustainability",
            "Sustainable supply chain auditing",
            "UN SDG alignment and compliance",
            "Resiliency planning and risk management",
        ],
        timeline: "Timeline varies by scope. Specific projects typically run 3-6 months.",
        faqs: [
            { question: "How do you assess supply chains?", answer: "We review supplier policies and performance data to identify environmental and social risks." },
            { question: "What does UN SDG alignment involve?", answer: "We map your current activities to specific Sustainable Development Goals to identify gaps and reporting opportunities." },
            { question: "Is training included?", answer: "We provide workshops and capacity building for internal teams as part of the implementation phase." },
        ],
    },
    {
        slug: "energy-advisory",
        name: "Energy Advisory",
        shortDescription: "Reduce operational costs through technical audits, energy modeling, and efficiency planning.",
        fullDescription: "We identify opportunities to reduce energy consumption and operating costs. Our services range from technical audits of existing facilities to energy modeling for new projects and advisory on energy performance contracting.",
        deliverables: [
            "Energy management and ROI monitoring",
            "Technical energy audits",
            "Energy saving investment advisory",
            "Performance contracting (ESCO) support",
            "Advanced building energy modeling",
        ],
        timeline: "Audits typically require 2-4 weeks; implementation support is ongoing.",
        faqs: [
            { question: "What is the output of an energy audit?", answer: "A technical report detailing consumption patterns, specific efficiency measures, estimated costs, and ROI calculations." },
            { question: "How do ESCO services work?", answer: "We advise on Energy Service Company (ESCO) contracts, where savings are often used to finance the necessary upgrades." },
            { question: "Can you model complex buildings?", answer: "Yes. We use industry-standard software to simulate energy performance for new designs or major renovations." },
        ],
    },
    {
        slug: "climate-change-advisory",
        name: "Climate Change Advisory",
        shortDescription: "Quantify climate risks, manage carbon footprints, and access green financing.",
        fullDescription: "We help organizations quantify and manage climate-related risks. This includes TCFD-aligned reporting, carbon footprint calculation, and advisory on carbon markets and green financing mechanisms.",
        deliverables: [
            "Climate risk assessment (TCFD aligned)",
            "Low carbon strategy and abatement models",
            "Carbon footprint calculation and assurance",
            "Green bond and carbon finance advisory",
            "Climate adaptation strategy",
        ],
        timeline: "Standard risk assessment: 8-12 weeks.",
        faqs: [
            { question: "What is TCFD reporting?", answer: "It is a framework for disclosing climate-related financial risks (physical and transitional) to investors and stakeholders." },
            { question: "How do carbon offsets work?", answer: "We help you identify verified high-quality offset projects to compensate for residual emissions." },
            { question: "Do you support green bond issuance?", answer: "We provide the technical frameworks and second-party opinions required for green bond validation." },
        ],
    },
    {
        slug: "net-zero-advisory",
        name: "Net Zero Advisory",
        shortDescription: "Achieve net-zero status through certified green building frameworks and decarbonization.",
        fullDescription: "We guide projects and portfolios toward net-zero status. Our expertise covers green building certifications (LEED, GSAS, WELL) and holistic strategies for waste, water, and energy reduction.",
        deliverables: [
            "Green building certification (LEED, WELL, GSAS)",
            "Net Zero Energy, Water, and Waste roadmaps",
            "Decarbonization strategy and analytics",
            "Sustainable operations training",
            "Custom monitoring dashboards",
        ],
        timeline: "Project-dependent. Certification processes often span 6-12+ months.",
        faqs: [
            { question: "Which certification should we pursue?", answer: "We evaluate your location, asset type, and goals to recommend LEED, GSAS, or WELL." },
            { question: "What is defined as Net Zero?", answer: "It typically refers to achieving a balance between greenhouse gases emitted and removed, or energy consumed and generated." },
            { question: "Do you provide monitoring tools?", answer: "We specify and can help implement dashboard systems to track utility performance against targets." },
        ],
    },
];
