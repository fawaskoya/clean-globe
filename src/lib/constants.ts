export const COMPANY_INFO = {
    name: "Clean Globe Consultancy",
    shortName: "CGC",
    tagline: "Sustainability and ESG Advisory",
    address: "Office 219, Business & Innovation Park, Building 1, Street 504, Zone 49, Ras Bufontas Free Zone, Doha, Qatar",
    phone: ["+974 66006495", "+974 55225960"],
    email: "operations@thecleanglobe.com",
    website: "www.thecleanglobe.com",
};

// Navigation moved to navigation.ts for dropdown support
// Import NAV_LINKS from '@/lib/navigation' instead

export const SERVICES = [
    {
        name: "ESG Advisory",
        slug: "esg-advisory",
        description: "Assess and design your ESG strategy with comprehensive governance and reporting tools.",
        deliverables: [
            "ESG strategy & governance frameworks",
            "Policy development & reporting",
        ],
    },
    {
        name: "Sustainability Advisory",
        slug: "sustainability-advisory",
        description: "Consulting for CSR, green offices, and sustainable supply chain implementation.",
        deliverables: [
            "CSR & green office programs",
            "Supply chain sustainability",
        ],
    },
    {
        name: "Energy Advisory",
        slug: "energy-advisory",
        description: "Energy management, audits, and saving investment advisory.",
        deliverables: [
            "Energy audits & efficiency planning",
            "ROI monitoring & investment advisory",
        ],
    },
    {
        name: "Climate Change Advisory",
        slug: "climate-change-advisory",
        description: "Risk assessment, low carbon strategy, and carbon finance services.",
        deliverables: [
            "Climate risk assessment (TCFD)",
            "Carbon footprint & green finance",
        ],
    },
    {
        name: "Net Zero Advisory",
        slug: "net-zero-advisory",
        description: "Green building consultancy, operations training, and net zero strategies.",
        deliverables: [
            "Green building certification (LEED, GSAS)",
            "Net Zero roadmaps & training",
        ],
    },
];
