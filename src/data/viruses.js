export const viruses = [
  {
    id: "sars-cov-2",
    name: "SARS-CoV-2",
    family: "Coronaviridae",
    rnaType: "+ssRNA",
    description: "Causes COVID-19. Known for its spike glycoproteins giving it a crown-like appearance.",
    sequencePrefix: "AUGUACUCAUCUGCU...",
    shape: "spherical_spikes",
    color: "#ff3366",
    bsl: 3, year: 2019, host: "Humans / Bats", mortality: "1–4%", diameter: "100 nm",
    symptoms: "Fever, dry cough, fatigue, loss of taste/smell, shortness of breath.",
    causes: "Inhalation of airborne respiratory droplets and aerosols; direct contact.",
    proteins: [
      { name: "Spike (S)", function: "Host cell entry via ACE2 receptor binding" },
      { name: "Membrane (M)", function: "Drives virus assembly and shape definition" },
      { name: "Envelope (E)", function: "Virus assembly, budding, and pathogenesis" },
      { name: "Nucleocapsid (N)", function: "Packages the positive-strand virus RNA genome" }
    ],
    lineages: ["B.1.1.7 (Alpha)", "B.1.351 (Beta)", "P.1 (Gamma)", "B.1.617.2 (Delta)", "B.1.1.529 (Omicron)"],
    riskMetrics: { transmissibility: 0.9, mortality: 0.15, immuneEscape: 0.85, stability: 0.7 }
  },
  {
    id: "influenza-a",
    name: "Influenza A",
    family: "Orthomyxoviridae",
    rnaType: "-ssRNA",
    description: "Causes the flu. Its genome is segmented into eight distinct RNA strands.",
    sequencePrefix: "GAAUAUGAAUACAAU...",
    shape: "spherical_bumped",
    color: "#33ccff",
    bsl: 2, year: 1933, host: "Humans / Birds", mortality: "<0.1%", diameter: "120 nm",
    symptoms: "Sudden high fever, severe muscle aches, chills, dry cough, sore throat.",
    causes: "Airborne respiratory droplets from coughs or sneezes of infected individuals.",
    proteins: [
      { name: "Hemagglutinin (HA)", function: "Binding to sialic acid on host cells" },
      { name: "Neuraminidase (NA)", function: "Release of progeny viruses from cells" },
      { name: "M1 Protein", function: "Forms shell beneath the envelope" },
      { name: "NS1 Protein", function: "Antagonizes host interferon response" }
    ],
    lineages: ["H1N1 (Pd09)", "H3N2 (Victoria)", "H5N1 (Avian)", "H7N9"],
    riskMetrics: { transmissibility: 0.75, mortality: 0.05, immuneEscape: 0.6, stability: 0.5 }
  },
  {
    id: "hiv-1",
    name: "HIV-1",
    family: "Retroviridae",
    rnaType: "+ssRNA (Retrovirus)",
    description: "A lentivirus that causes AIDS. Has a characteristic conical capsid core.",
    sequencePrefix: "GGCGAGCCCGCUCCG...",
    shape: "spherical_conical",
    color: "#cc33ff",
    bsl: 3, year: 1983, host: "Humans / Primates", mortality: "~90% untreated", diameter: "120 nm",
    symptoms: "Swollen lymph nodes, rapid weight loss, recurrent fever, opportunistic infections.",
    causes: "Direct transfer of specific bodily fluids (blood, semen, breast milk).",
    proteins: [
      { name: "gp120 / gp41", function: "Envelope glycoproteins for cell entry" },
      { name: "Reverse Transcriptase", function: "Converts viral RNA into DNA" },
      { name: "Integrase", function: "Inserts viral DNA into host genome" },
      { name: "Protease", function: "Cleaves polyproteins for maturation" }
    ],
    lineages: ["Group M (Major)", "Group O (Outlier)", "Group N", "Group P"],
    riskMetrics: { transmissibility: 0.4, mortality: 0.95, immuneEscape: 0.98, stability: 0.3 }
  },
  {
    id: "ebola",
    name: "Ebola Virus",
    family: "Filoviridae",
    rnaType: "-ssRNA",
    description: "Causes Ebola virus disease. Distinctive long, filamentous or U-shape structure.",
    sequencePrefix: "CGGACACUAAAAAUA...",
    shape: "filamentous",
    color: "#ff9900",
    bsl: 4, year: 1976, host: "Humans / Bats", mortality: "25–90%", diameter: "80 nm (width)",
    symptoms: "Unexplained hemorrhaging, organ failure, severe fever, profound weakness.",
    causes: "Direct physical contact with infected blood, fluids, or tissue.",
    proteins: [
      { name: "Glycoprotein (GP)", function: "Attachment and membrane fusion" },
      { name: "VP40", function: "Main matrix protein for viral budding" },
      { name: "VP35", function: "Inhibits host immune signaling" },
      { name: "VP24", function: "Blocks interferon-mediated responses" }
    ],
    lineages: ["Zaire (EBOV)", "Sudan (SUDV)", "Bundibugyo (BDBV)", "Tai Forest (TAFV)"],
    riskMetrics: { transmissibility: 0.35, mortality: 0.85, immuneEscape: 0.7, stability: 0.65 }
  },
  {
    id: "hcv",
    name: "Hepatitis C Virus",
    family: "Flaviviridae",
    rnaType: "+ssRNA",
    description: "A small, enveloped virus that primarily infects the liver.",
    sequencePrefix: "GCCAGCCCCUGAUGG...",
    shape: "spherical_smooth",
    color: "#00ffcc",
    bsl: 2, year: 1989, host: "Humans", mortality: "~2% chronic", diameter: "50 nm",
    symptoms: "Often asymptomatic initially; later jaundice, chronic fatigue, abdominal pain.",
    causes: "Blood-to-blood contact, primarily through unsterile needles or equipment.",
    proteins: [
      { name: "E1 / E2", function: "Envelope glycoproteins for entry" },
      { name: "NS3/4A", function: "Protease for processing polyprotein" },
      { name: "NS5A", function: "RNA replication and assembly" },
      { name: "NS5B", function: "RNA-dependent RNA polymerase" }
    ],
    lineages: ["Genotype 1a/1b", "Genotype 2", "Genotype 3", "Genotype 4/5/6"],
    riskMetrics: { transmissibility: 0.25, mortality: 0.1, immuneEscape: 0.8, stability: 0.45 }
  },
  {
    id: "rhinovirus",
    name: "Rhinovirus",
    family: "Picornaviridae",
    rnaType: "+ssRNA",
    description: "The primary cause of the common cold. Non-enveloped with an icosahedral capsid.",
    sequencePrefix: "UUAAAACAGCGAUGG...",
    shape: "icosahedral",
    color: "#ffff00",
    bsl: 1, year: 1956, host: "Humans", mortality: "<0.01%", diameter: "30 nm",
    symptoms: "Nasal congestion, runny nose, sneezing, mild sore throat, low-grade fever.",
    causes: "Inhalation of aerosols, contact with contaminated surfaces and subsequent mucosal membrane transfer.",
    proteins: [
      { name: "VP1", function: "Major capsid protein for receptor binding" },
      { name: "VP2 / VP3", function: "Capsid structure and stability" },
      { name: "VP4", function: "RNA release during infection" },
      { name: "3C Protease", function: "Cleaves viral and host proteins" }
    ],
    lineages: ["RV-A", "RV-B", "RV-C"],
    riskMetrics: { transmissibility: 0.95, mortality: 0.01, immuneEscape: 0.3, stability: 0.9 }
  },
  {
    id: "rabies",
    name: "Rabies Virus",
    family: "Rhabdoviridae",
    rnaType: "-ssRNA",
    description: "A neurotropic virus that causes rabies. Characterized by a bullet-like shape.",
    sequencePrefix: "AACAAUCUACCAUGA...",
    shape: "bullet",
    color: "#ff3333",
    bsl: 2, year: 1903, host: "Mammals", mortality: "~100% untreated", diameter: "75 nm (width)",
    symptoms: "Fever, headache, excess salivation, muscle spasms, mental confusion, hydrophobia.",
    causes: "Introduction of viral saliva through the bite or deep scratch of an infected animal.",
    proteins: [
      { name: "Glycoprotein (G)", function: "Binding to acetylcholine receptors" },
      { name: "Nucleoprotein (N)", function: "Encapsidation of viral RNA" },
      { name: "Phosphoprotein (P)", function: "Polymerase cofactor" },
      { name: "Large Protein (L)", function: "RNA polymerase activity" }
    ],
    lineages: ["Cosmopolitan", "Arctic-like", "Asian", "African"],
    riskMetrics: { transmissibility: 0.15, mortality: 0.99, immuneEscape: 0.4, stability: 0.75 }
  },
  {
    id: "measles",
    name: "Measles Virus",
    family: "Paramyxoviridae",
    rnaType: "-ssRNA",
    description: "Highly contagious virus causing measles. Pleomorphic, usually spherical.",
    sequencePrefix: "ACCAGACAAAGCUGU...",
    shape: "pleomorphic",
    color: "#ff99cc",
    bsl: 2, year: 1954, host: "Humans", mortality: "0.1–5%", diameter: "150 nm",
    symptoms: "High fever, full-body maculopapular rash, cough, coryza, Koplik spots inside the mouth.",
    causes: "Highly contagious airborne respiratory droplets remaining suspended in the air.",
    proteins: [
      { name: "Hemagglutinin (H)", function: "Host cell attachment (CD150)" },
      { name: "Fusion (F)", function: "Mediate membrane fusion" },
      { name: "Matrix (M)", function: "Internal scaffolding" },
      { name: "Nucleoprotein (N)", function: "Protects RNA genome" }
    ],
    lineages: ["Genotype D8", "Genotype B3", "Genotype H1", "Genotype D4"],
    riskMetrics: { transmissibility: 0.98, mortality: 0.08, immuneEscape: 0.2, stability: 0.8 }
  },
  {
    id: "zika",
    name: "Zika Virus",
    family: "Flaviviridae",
    rnaType: "+ssRNA",
    description: "Transmitted primarily by Aedes mosquitoes. Structurally similar to Dengue.",
    sequencePrefix: "AGUUUGUUACUUGUU...",
    shape: "icosahedral_detailed",
    color: "#99ff33",
    bsl: 2, year: 1947, host: "Humans / Mosquitoes", mortality: "<1%", diameter: "50 nm",
    symptoms: "Transient mild fever, rash, conjunctivitis, muscle/joint pain. Associated with microcephaly in fetuses.",
    causes: "Primarily vector-borne through Aedes mosquito bites; possible sexual transmission.",
    proteins: [
      { name: "Envelope (E)", function: "Major antigen and entry protein" },
      { name: "Membrane (M)", function: "Helps in viral maturation" },
      { name: "NS1 Protein", function: "Immune evasion and replication" },
      { name: "NS5 Protein", function: "Methyltransferase and Polymerase" }
    ],
    lineages: ["African Lineage", "Asian Lineage", "American Clade"],
    riskMetrics: { transmissibility: 0.65, mortality: 0.02, immuneEscape: 0.5, stability: 0.55 }
  },
  {
    id: "dengue",
    name: "Dengue Virus",
    family: "Flaviviridae",
    rnaType: "+ssRNA",
    description: "Mosquito-borne virus causing Dengue fever. Features smooth surface in mature form.",
    sequencePrefix: "AGUUGUUAGUCUACG...",
    shape: "icosahedral_detailed",
    color: "#3399ff",
    bsl: 2, year: 1943, host: "Humans / Mosquitoes", mortality: "1–5% severe", diameter: "50 nm",
    symptoms: "Sudden high fever, severe joint and muscle pain ('breakbone fever'), retro-orbital pain, bleeding.",
    causes: "Transmitted exclusively through the bite of infected Aedes species mosquitoes.",
    proteins: [
      { name: "Envelope (E)", function: "Host receptor binding" },
      { name: "PrM / M", function: "Protection of E protein" },
      { name: "NS3 Protease", function: "RNA helicase activity" },
      { name: "NS5 Polymerase", function: "Replication of virus genome" }
    ],
    lineages: ["Serotype 1 (DENV-1)", "Serotype 2 (DENV-2)", "Serotype 3 (DENV-3)", "Serotype 4 (DENV-4)"],
    riskMetrics: { transmissibility: 0.7, mortality: 0.04, immuneEscape: 0.45, stability: 0.6 }
  }
];

export const generateSequence = (length) => {
  const bases = ["A", "U", "G", "C"];
  let seq = "";
  for (let i = 0; i < length; i++) {
    seq += bases[Math.floor(Math.random() * 4)];
  }
  return seq;
};
