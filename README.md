# Virus Genome: 3D RNA Simulation Lab

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An immersive, professional-grade 3D virus genome visualization and analysis platform. Built with **React 19** and **Three.js**, this application allows researchers and students to explore viral structures, simulate genomic mutations in real-time, and analyze complex proteomic data in a high-fidelity laboratory environment.

![Virus Genome Simulation](https://img.shields.io/badge/Status-Research_Ready-00e5ff?style=flat-square)

---

## 🔬 Core Features

### 1. Interactive 3D Simulation
Explore biologically accurate 3D models of major viruses (SARS-CoV-2, Ebola, HIV-1, Influenza, etc.).
- **Dynamic Morphology**: High-fidelity shells, capsids, and spikes that respond to real-time simulation parameters.
- **Internal RNA Helix**: Toggle visibility of the genomic core with interactive, color-coded RNA sequencing.
- **Cinematic Environment**: A dark, premium laboratory aesthetic with glassmorphism UI elements.

### 2. Advanced Genomic Analysis
A dedicated research dashboard for deep-dive bioinformatics.
- **Risk Profile Analysis**: Radar charts mapping Transmissibility, Mortality, Immune Escape, and Environmental Stability.
- **Real-time Base Profiler**: Live monitoring of A, U, G, C distribution as the genome evolves.
- **Phylogenetic Lineages**: Visual representation of viral clades and ancestry.
- **Proteomic Structural Breakdown**: Comprehensive details and functional descriptions of key viral proteins.

### 3. Real-time Mutation Engine
- **Controlled Evolution**: Adjust mutation rates and rotation speeds to observe structural drift.
- **Live Sequence Stream**: High-performance RNA base stream with interactive highlighting and mutation counts.
- **Sequence ID Tracking**: Unique identifiers generated for every viral variant.

---

## 🛠 Technical Stack

- **Frontend**: [React 19](https://reactjs.org/)
- **3D Rendering**: [React Three Fiber](https://github.com/pmndrs/react-three-fiber) / [Three.js](https://threejs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Icons & UI**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Prajwallnaik/Viral-Genome.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Building for Production
To generate a highly optimized production bundle:
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── 3D/          # Three.js virus models and scenes
│   └── UI/          # React components for Dashboard, InfoPanel, etc.
├── data/            # Viral database (lineages, proteins, metrics)
├── utils/           # Mutation logic and sequence generators
└── App.jsx          # Main application orchestrator
```

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🧪 Scientific Context

The genomic sequences and protein descriptions utilized in this application are modeled after open-source data from [NCBI GenBank](https://www.ncbi.nlm.nih.gov/genbank/) and [GISAID](https://www.gisaid.org/). This tool is designed for educational and visualization purposes.
