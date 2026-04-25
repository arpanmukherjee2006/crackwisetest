// Test Series Data for JEE and NEET
const TEST_SERIES_DATA = {
    JEE: {
        name: "JEE Test Series",
        description: "Joint Entrance Examination Mock Tests",
        duration: 180, // 3 hours in minutes
        subjects: ["physics", "chemistry", "mathematics"],
        totalQuestions: 75, // 25 per subject
        questionsPerSubject: 25, // 20 MCQ + 5 Numerical per subject
        markingScheme: {
            correct: 4,
            incorrect: -1,
            unattempted: 0
        },
        tests: [
            {
                id: "jee-test-1",
                title: "JEE Mock Test 1",
                subtitle: "Full Syllabus Test",
                difficulty: "Medium",
                questions: {
                    physics: [
                        // MCQ Questions (1-20)
                        {
                            id: 1,
                            type: "mcq",
                            subject: "physics",
                            question: "A particle moves in a straight line with constant acceleration. If it covers 10 m in the first 2 seconds and 20 m in the next 2 seconds, find its initial velocity.",
                            options: [
                                "2.5 m/s",
                                "5 m/s",
                                "7.5 m/s",
                                "10 m/s"
                            ],
                            correct: 0,
                            explanation: "Using s = ut + (1/2)at², for first 2s: 10 = 2u + 2a, for next 2s: 20 = 2(u+2a) + 2a. Solving: u = 2.5 m/s"
                        },
                        {
                            id: 2,
                            type: "mcq",
                            subject: "physics",
                            question: "The work done by a force F = (3î + 4ĵ) N in moving a particle from origin to point (2, 3) m is:",
                            options: [
                                "18 J",
                                "24 J",
                                "30 J",
                                "36 J"
                            ],
                            correct: 0,
                            explanation: "Work = F⃗ · s⃗ = (3î + 4ĵ) · (2î + 3ĵ) = 3×2 + 4×3 = 6 + 12 = 18 J"
                        },
                        {
                            id: 3,
                            type: "mcq",
                            subject: "physics",
                            question: "A simple pendulum has a time period of 2 seconds on Earth. What will be its time period on a planet where acceleration due to gravity is 4 times that of Earth?",
                            options: [
                                "1 second",
                                "2 seconds",
                                "4 seconds",
                                "8 seconds"
                            ],
                            correct: 0,
                            explanation: "T = 2π√(l/g). Since T ∝ 1/√g, when g becomes 4g, T becomes T/2 = 1 second"
                        },
                        {
                            id: 4,
                            type: "mcq",
                            subject: "physics",
                            question: "A block of mass 2 kg is placed on a rough horizontal surface. The coefficient of static friction is 0.4. The maximum force that can be applied horizontally without moving the block is:",
                            options: [
                                "4 N",
                                "6 N",
                                "8 N",
                                "10 N"
                            ],
                            correct: 2,
                            explanation: "Maximum static friction = μₛ × N = μₛ × mg = 0.4 × 2 × 10 = 8 N"
                        },
                        {
                            id: 5,
                            type: "mcq",
                            subject: "physics",
                            question: "Two resistors of 4Ω and 6Ω are connected in parallel. The equivalent resistance is:",
                            options: [
                                "2.4 Ω",
                                "5 Ω",
                                "10 Ω",
                                "24 Ω"
                            ],
                            correct: 0,
                            explanation: "For parallel: 1/R = 1/4 + 1/6 = (3+2)/12 = 5/12, so R = 12/5 = 2.4 Ω"
                        },
                        {
                            id: 6,
                            type: "mcq",
                            subject: "physics",
                            question: "A convex lens of focal length 20 cm forms a real image at a distance of 60 cm from the lens. The object distance is:",
                            options: [
                                "15 cm",
                                "30 cm",
                                "45 cm",
                                "60 cm"
                            ],
                            correct: 1,
                            explanation: "Using 1/f = 1/v - 1/u: 1/20 = 1/60 - 1/u, solving: 1/u = 1/60 - 1/20 = -2/60, u = -30 cm"
                        },
                        {
                            id: 7,
                            type: "mcq",
                            subject: "physics",
                            question: "The de Broglie wavelength of an electron accelerated through 100 V is approximately:",
                            options: [
                                "0.12 nm",
                                "1.2 nm",
                                "12 nm",
                                "120 nm"
                            ],
                            correct: 0,
                            explanation: "λ = h/p = h/√(2mK) = h/√(2meV) ≈ 0.12 nm for 100 V"
                        },
                        {
                            id: 8,
                            type: "mcq",
                            subject: "physics",
                            question: "A spring of spring constant k is compressed by x. The potential energy stored is:",
                            options: [
                                "kx",
                                "kx²",
                                "½kx²",
                                "2kx²"
                            ],
                            correct: 2,
                            explanation: "Elastic potential energy U = ½kx²"
                        },
                        {
                            id: 9,
                            type: "mcq",
                            subject: "physics",
                            question: "The magnetic field at the center of a circular coil of radius R carrying current I is:",
                            options: [
                                "μ₀I/2R",
                                "μ₀I/4R",
                                "μ₀I/R",
                                "2μ₀I/R"
                            ],
                            correct: 0,
                            explanation: "Magnetic field at center of circular coil B = μ₀I/2R"
                        },
                        {
                            id: 10,
                            type: "mcq",
                            subject: "physics",
                            question: "A particle performs SHM with amplitude A. At what displacement from mean position is the kinetic energy equal to potential energy?",
                            options: [
                                "A/√2",
                                "A/2",
                                "A/√3",
                                "A/4"
                            ],
                            correct: 0,
                            explanation: "When KE = PE, total energy E = 2KE = 2PE. Since E = ½kA² and PE = ½kx², we get x = A/√2"
                        },
                        {
                            id: 11,
                            type: "mcq",
                            subject: "physics",
                            question: "The escape velocity from Earth's surface is approximately:",
                            options: [
                                "7.9 km/s",
                                "11.2 km/s",
                                "15.0 km/s",
                                "25.0 km/s"
                            ],
                            correct: 1,
                            explanation: "Escape velocity vₑ = √(2GM/R) ≈ 11.2 km/s for Earth"
                        },
                        {
                            id: 12,
                            type: "mcq",
                            subject: "physics",
                            question: "In Young's double slit experiment, the fringe width is 0.5 mm. If the distance between slits is doubled, the new fringe width becomes:",
                            options: [
                                "0.25 mm",
                                "0.5 mm",
                                "1.0 mm",
                                "2.0 mm"
                            ],
                            correct: 0,
                            explanation: "Fringe width β = λD/d. When d is doubled, β becomes β/2 = 0.25 mm"
                        },
                        {
                            id: 13,
                            type: "mcq",
                            subject: "physics",
                            question: "A transformer has 100 turns in primary and 200 turns in secondary. If primary voltage is 220 V, the secondary voltage is:",
                            options: [
                                "110 V",
                                "220 V",
                                "440 V",
                                "880 V"
                            ],
                            correct: 2,
                            explanation: "For transformer: Vₛ/Vₚ = Nₛ/Nₚ, so Vₛ = 220 × (200/100) = 440 V"
                        },
                        {
                            id: 14,
                            type: "mcq",
                            subject: "physics",
                            question: "The binding energy per nucleon is maximum for:",
                            options: [
                                "Hydrogen",
                                "Helium",
                                "Iron",
                                "Uranium"
                            ],
                            correct: 2,
                            explanation: "Iron (Fe-56) has the maximum binding energy per nucleon, making it the most stable nucleus"
                        },
                        {
                            id: 15,
                            type: "mcq",
                            subject: "physics",
                            question: "A gas undergoes an adiabatic process. The relation between pressure and volume is:",
                            options: [
                                "PV = constant",
                                "PVᵞ = constant",
                                "P/V = constant",
                                "P + V = constant"
                            ],
                            correct: 1,
                            explanation: "For adiabatic process: PVᵞ = constant, where γ is the adiabatic index"
                        },
                        {
                            id: 16,
                            type: "mcq",
                            subject: "physics",
                            question: "The dimensional formula of Planck's constant is:",
                            options: [
                                "[ML²T⁻¹]",
                                "[ML²T⁻²]",
                                "[MLT⁻¹]",
                                "[ML⁻¹T⁻¹]"
                            ],
                            correct: 0,
                            explanation: "h = E/ν = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]"
                        },
                        {
                            id: 17,
                            type: "mcq",
                            subject: "physics",
                            question: "A charged particle moves in a uniform electric field. The trajectory is:",
                            options: [
                                "Circular",
                                "Parabolic",
                                "Straight line",
                                "Helical"
                            ],
                            correct: 1,
                            explanation: "In uniform electric field, charged particle follows parabolic path (similar to projectile motion)"
                        },
                        {
                            id: 18,
                            type: "mcq",
                            subject: "physics",
                            question: "The coefficient of restitution for a perfectly elastic collision is:",
                            options: [
                                "0",
                                "0.5",
                                "1",
                                "∞"
                            ],
                            correct: 2,
                            explanation: "For perfectly elastic collision, coefficient of restitution e = 1"
                        },
                        {
                            id: 19,
                            type: "mcq",
                            subject: "physics",
                            question: "The SI unit of magnetic flux is:",
                            options: [
                                "Tesla",
                                "Weber",
                                "Henry",
                                "Gauss"
                            ],
                            correct: 1,
                            explanation: "Magnetic flux is measured in Weber (Wb) = Tesla × m²"
                        },
                        {
                            id: 20,
                            type: "mcq",
                            subject: "physics",
                            question: "In photoelectric effect, the stopping potential depends on:",
                            options: [
                                "Intensity of light",
                                "Frequency of light",
                                "Both intensity and frequency",
                                "Neither intensity nor frequency"
                            ],
                            correct: 1,
                            explanation: "Stopping potential depends only on frequency of incident light, not on intensity"
                        },
                        // Numerical Questions (21-25)
                        {
                            id: 21,
                            type: "numerical",
                            subject: "physics",
                            question: "A ball is thrown vertically upward with initial velocity 30 m/s. Find the maximum height reached (in meters). Take g = 10 m/s².",
                            answer: 45,
                            explanation: "Using v² = u² - 2gh, at max height v = 0: 0 = 30² - 2×10×h, h = 900/20 = 45 m"
                        },
                        {
                            id: 22,
                            type: "numerical",
                            subject: "physics",
                            question: "A wire of resistance 10 Ω is stretched to double its length. Find the new resistance (in Ω).",
                            answer: 40,
                            explanation: "When length doubles, area becomes half. R = ρl/A, so new R = ρ(2l)/(A/2) = 4ρl/A = 4R = 40 Ω"
                        },
                        {
                            id: 23,
                            type: "numerical",
                            subject: "physics",
                            question: "Find the energy (in eV) of a photon of wavelength 500 nm. (Use hc = 1240 eV·nm)",
                            answer: 2.48,
                            explanation: "E = hc/λ = 1240/500 = 2.48 eV"
                        },
                        {
                            id: 24,
                            type: "numerical",
                            subject: "physics",
                            question: "A satellite orbits Earth at height 400 km above surface. If Earth's radius is 6400 km, find the orbital period (in hours). Take g = 10 m/s².",
                            answer: 1.5,
                            explanation: "r = 6400 + 400 = 6800 km, T = 2π√(r³/GM) = 2π√(r/g) ≈ 1.5 hours"
                        },
                        {
                            id: 25,
                            type: "numerical",
                            subject: "physics",
                            question: "A capacitor of 2 μF is charged to 100 V. Find the energy stored (in mJ).",
                            answer: 10,
                            explanation: "U = ½CV² = ½ × 2×10⁻⁶ × (100)² = 10×10⁻³ J = 10 mJ"
                        }
                    ],
                    chemistry: [
                        // MCQ Questions (1-20)
                        {
                            id: 1,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following has the highest bond dissociation energy?",
                            options: [
                                "F-F",
                                "Cl-Cl",
                                "Br-Br",
                                "I-I"
                            ],
                            correct: 1,
                            explanation: "Cl-Cl has the highest bond dissociation energy among halogens due to optimal orbital overlap without significant repulsion"
                        },
                        {
                            id: 2,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The hybridization of carbon in diamond is:",
                            options: [
                                "sp",
                                "sp²",
                                "sp³",
                                "sp³d"
                            ],
                            correct: 2,
                            explanation: "In diamond, each carbon atom forms 4 sigma bonds with other carbon atoms, requiring sp³ hybridization"
                        },
                        {
                            id: 3,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following is the strongest acid?",
                            options: [
                                "HF",
                                "HCl",
                                "HBr",
                                "HI"
                            ],
                            correct: 3,
                            explanation: "HI is the strongest acid among hydrogen halides due to the largest size of I⁻ ion, making it most stable"
                        },
                        {
                            id: 4,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃ is:",
                            options: [
                                "2-methylbutane",
                                "3-methylbutane",
                                "Isopentane",
                                "2-methylpropane"
                            ],
                            correct: 0,
                            explanation: "The longest chain has 4 carbons (butane) with methyl group at position 2"
                        },
                        {
                            id: 5,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which quantum number determines the shape of an orbital?",
                            options: [
                                "Principal (n)",
                                "Azimuthal (l)",
                                "Magnetic (m)",
                                "Spin (s)"
                            ],
                            correct: 1,
                            explanation: "Azimuthal quantum number (l) determines the shape of orbital (s, p, d, f)"
                        },
                        {
                            id: 6,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The oxidation state of Cr in K₂Cr₂O₇ is:",
                            options: [
                                "+3",
                                "+4",
                                "+5",
                                "+6"
                            ],
                            correct: 3,
                            explanation: "In K₂Cr₂O₇: 2(+1) + 2x + 7(-2) = 0, solving: x = +6"
                        },
                        {
                            id: 7,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following is an example of a Lewis base?",
                            options: [
                                "BF₃",
                                "AlCl₃",
                                "NH₃",
                                "H⁺"
                            ],
                            correct: 2,
                            explanation: "NH₃ is a Lewis base as it can donate electron pairs through its lone pair"
                        },
                        {
                            id: 8,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The number of σ and π bonds in C₂H₂ (acetylene) are:",
                            options: [
                                "3σ, 2π",
                                "2σ, 3π",
                                "4σ, 1π",
                                "1σ, 4π"
                            ],
                            correct: 0,
                            explanation: "C₂H₂ has C≡C (1σ + 2π) and 2 C-H bonds (2σ), total: 3σ, 2π"
                        },
                        {
                            id: 9,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which element has the highest electronegativity?",
                            options: [
                                "Oxygen",
                                "Nitrogen",
                                "Fluorine",
                                "Chlorine"
                            ],
                            correct: 2,
                            explanation: "Fluorine has the highest electronegativity (4.0 on Pauling scale)"
                        },
                        {
                            id: 10,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The pH of 0.01 M HCl solution is:",
                            options: [
                                "1",
                                "2",
                                "12",
                                "13"
                            ],
                            correct: 1,
                            explanation: "pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2"
                        },
                        {
                            id: 11,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following shows maximum covalent character?",
                            options: [
                                "LiCl",
                                "NaCl",
                                "KCl",
                                "CsCl"
                            ],
                            correct: 0,
                            explanation: "According to Fajan's rule, smaller cation shows more covalent character. Li⁺ is smallest"
                        },
                        {
                            id: 12,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The geometry of SF₆ molecule is:",
                            options: [
                                "Tetrahedral",
                                "Square planar",
                                "Octahedral",
                                "Trigonal bipyramidal"
                            ],
                            correct: 2,
                            explanation: "SF₆ has 6 bond pairs and 0 lone pairs, giving octahedral geometry"
                        },
                        {
                            id: 13,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following is not a greenhouse gas?",
                            options: [
                                "CO₂",
                                "CH₄",
                                "N₂O",
                                "O₂"
                            ],
                            correct: 3,
                            explanation: "O₂ is not a greenhouse gas. CO₂, CH₄, and N₂O are major greenhouse gases"
                        },
                        {
                            id: 14,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The rate of reaction is doubled when temperature is increased by 10°C. The activation energy is approximately:",
                            options: [
                                "25 kJ/mol",
                                "50 kJ/mol",
                                "75 kJ/mol",
                                "100 kJ/mol"
                            ],
                            correct: 1,
                            explanation: "Using Arrhenius equation, for rate doubling with 10°C rise, Ea ≈ 50 kJ/mol"
                        },
                        {
                            id: 15,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following is the most stable carbocation?",
                            options: [
                                "CH₃⁺",
                                "(CH₃)₂CH⁺",
                                "(CH₃)₃C⁺",
                                "C₆H₅CH₂⁺"
                            ],
                            correct: 3,
                            explanation: "Benzyl carbocation is most stable due to resonance stabilization"
                        },
                        {
                            id: 16,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The coordination number of Ni in [Ni(CO)₄] is:",
                            options: [
                                "2",
                                "4",
                                "6",
                                "8"
                            ],
                            correct: 1,
                            explanation: "Ni is bonded to 4 CO ligands, so coordination number is 4"
                        },
                        {
                            id: 17,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following is an aldol condensation product?",
                            options: [
                                "CH₃COCH₃",
                                "CH₃CH=CHCHO",
                                "CH₃COOH",
                                "CH₃OH"
                            ],
                            correct: 1,
                            explanation: "Aldol condensation produces α,β-unsaturated aldehydes like CH₃CH=CHCHO"
                        },
                        {
                            id: 18,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The number of moles of KMnO₄ required to oxidize 1 mole of FeSO₄ in acidic medium is:",
                            options: [
                                "1/5",
                                "1/3",
                                "1",
                                "5"
                            ],
                            correct: 0,
                            explanation: "5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O, so 1/5 mole KMnO₄ needed"
                        },
                        {
                            id: 19,
                            type: "mcq",
                            subject: "chemistry",
                            question: "Which of the following has maximum boiling point?",
                            options: [
                                "CH₃OH",
                                "C₂H₅OH",
                                "C₃H₇OH",
                                "C₄H₉OH"
                            ],
                            correct: 3,
                            explanation: "Boiling point increases with molecular weight in alcohols due to stronger van der Waals forces"
                        },
                        {
                            id: 20,
                            type: "mcq",
                            subject: "chemistry",
                            question: "The crystal system of NaCl is:",
                            options: [
                                "Cubic",
                                "Tetragonal",
                                "Hexagonal",
                                "Orthorhombic"
                            ],
                            correct: 0,
                            explanation: "NaCl has face-centered cubic (FCC) crystal structure"
                        },
                        // Numerical Questions (21-25)
                        {
                            id: 21,
                            type: "numerical",
                            subject: "chemistry",
                            question: "Calculate the molarity of a solution containing 4 g of NaOH in 250 mL of solution. (Atomic masses: Na=23, O=16, H=1)",
                            answer: 0.4,
                            explanation: "Molar mass of NaOH = 23+16+1 = 40 g/mol. Moles = 4/40 = 0.1 mol. Molarity = 0.1/(250/1000) = 0.4 M"
                        },
                        {
                            id: 22,
                            type: "numerical",
                            subject: "chemistry",
                            question: "Find the oxidation number of S in H₂SO₄.",
                            answer: 6,
                            explanation: "In H₂SO₄: 2(+1) + x + 4(-2) = 0, solving: x = +6"
                        },
                        {
                            id: 23,
                            type: "numerical",
                            subject: "chemistry",
                            question: "How many σ bonds are present in benzene (C₆H₆)?",
                            answer: 12,
                            explanation: "Benzene has 6 C-C bonds + 6 C-H bonds = 12 σ bonds"
                        },
                        {
                            id: 24,
                            type: "numerical",
                            subject: "chemistry",
                            question: "Calculate the number of moles in 11.2 L of CO₂ at STP.",
                            answer: 0.5,
                            explanation: "At STP, 22.4 L = 1 mole. So 11.2 L = 11.2/22.4 = 0.5 moles"
                        },
                        {
                            id: 25,
                            type: "numerical",
                            subject: "chemistry",
                            question: "Find the formal charge on N in NH₄⁺ ion.",
                            answer: 1,
                            explanation: "Formal charge = Valence electrons - Non-bonding electrons - ½(Bonding electrons) = 5 - 0 - ½(8) = +1"
                        }
                    ],
                    mathematics: [
                        // MCQ Questions (1-20)
                        {
                            id: 1,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If f(x) = x³ - 3x² + 2x - 1, then f'(1) equals:",
                            options: [
                                "-1",
                                "0",
                                "1",
                                "2"
                            ],
                            correct: 0,
                            explanation: "f'(x) = 3x² - 6x + 2. At x = 1: f'(1) = 3(1)² - 6(1) + 2 = 3 - 6 + 2 = -1"
                        },
                        {
                            id: 2,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The value of ∫₀^π sin²x dx is:",
                            options: [
                                "π/4",
                                "π/2",
                                "π",
                                "2π"
                            ],
                            correct: 1,
                            explanation: "Using the identity sin²x = (1 - cos2x)/2, ∫₀^π sin²x dx = ∫₀^π (1 - cos2x)/2 dx = π/2"
                        },
                        {
                            id: 3,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If the roots of the equation x² - px + q = 0 are α and β, then α³ + β³ equals:",
                            options: [
                                "p³ - 3pq",
                                "p³ + 3pq",
                                "p³ - 3q",
                                "p³ + 3q"
                            ],
                            correct: 0,
                            explanation: "Using α + β = p and αβ = q, we have α³ + β³ = (α + β)³ - 3αβ(α + β) = p³ - 3pq"
                        },
                        {
                            id: 4,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The number of ways to arrange the letters of the word 'MATHEMATICS' is:",
                            options: [
                                "11!/2!2!",
                                "11!/2!2!2!",
                                "11!/2!",
                                "11!"
                            ],
                            correct: 1,
                            explanation: "MATHEMATICS has 11 letters with M(2), A(2), T(2) repeated. So arrangements = 11!/(2!×2!×2!)"
                        },
                        {
                            id: 5,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The coefficient of x⁵ in the expansion of (1 + x)¹⁰ is:",
                            options: [
                                "120",
                                "252",
                                "210",
                                "462"
                            ],
                            correct: 1,
                            explanation: "Coefficient of x⁵ in (1 + x)¹⁰ is ¹⁰C₅ = 10!/(5!×5!) = 252"
                        },
                        {
                            id: 6,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The domain of f(x) = √(x² - 4) is:",
                            options: [
                                "(-∞, -2] ∪ [2, ∞)",
                                "[-2, 2]",
                                "(-2, 2)",
                                "(-∞, ∞)"
                            ],
                            correct: 0,
                            explanation: "For √(x² - 4) to be real, x² - 4 ≥ 0, so x² ≥ 4, hence x ≤ -2 or x ≥ 2"
                        },
                        {
                            id: 7,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If A = [1 2; 3 4], then det(A) is:",
                            options: [
                                "-2",
                                "2",
                                "10",
                                "-10"
                            ],
                            correct: 0,
                            explanation: "det(A) = (1)(4) - (2)(3) = 4 - 6 = -2"
                        },
                        {
                            id: 8,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The equation of the line passing through (1, 2) with slope 3 is:",
                            options: [
                                "y = 3x - 1",
                                "y = 3x + 1",
                                "y = x + 2",
                                "y = 2x + 1"
                            ],
                            correct: 0,
                            explanation: "Using point-slope form: y - 2 = 3(x - 1), so y = 3x - 1"
                        },
                        {
                            id: 9,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The sum of first n natural numbers is:",
                            options: [
                                "n(n-1)/2",
                                "n(n+1)/2",
                                "n²",
                                "2n"
                            ],
                            correct: 1,
                            explanation: "Sum = 1 + 2 + ... + n = n(n+1)/2"
                        },
                        {
                            id: 10,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If sin θ = 3/5, then cos θ is:",
                            options: [
                                "4/5",
                                "±4/5",
                                "3/4",
                                "5/4"
                            ],
                            correct: 1,
                            explanation: "Using sin²θ + cos²θ = 1: cos²θ = 1 - (3/5)² = 1 - 9/25 = 16/25, so cos θ = ±4/5"
                        },
                        {
                            id: 11,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The area of triangle with vertices (0,0), (3,0), (0,4) is:",
                            options: [
                                "6",
                                "12",
                                "7",
                                "5"
                            ],
                            correct: 0,
                            explanation: "Area = ½ × base × height = ½ × 3 × 4 = 6"
                        },
                        {
                            id: 12,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The value of lim(x→0) (sin x)/x is:",
                            options: [
                                "0",
                                "1",
                                "∞",
                                "Does not exist"
                            ],
                            correct: 1,
                            explanation: "This is a standard limit: lim(x→0) (sin x)/x = 1"
                        },
                        {
                            id: 13,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The general solution of dy/dx = y is:",
                            options: [
                                "y = Ce^x",
                                "y = Cx",
                                "y = C + x",
                                "y = C/x"
                            ],
                            correct: 0,
                            explanation: "Separating variables: dy/y = dx, integrating: ln|y| = x + C, so y = Ce^x"
                        },
                        {
                            id: 14,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If z = 3 + 4i, then |z| is:",
                            options: [
                                "5",
                                "7",
                                "25",
                                "√7"
                            ],
                            correct: 0,
                            explanation: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5"
                        },
                        {
                            id: 15,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The equation x² + y² = 25 represents:",
                            options: [
                                "Circle with center (0,0) and radius 5",
                                "Circle with center (5,5) and radius 5",
                                "Ellipse",
                                "Parabola"
                            ],
                            correct: 0,
                            explanation: "Standard form of circle: x² + y² = r², here r = 5"
                        },
                        {
                            id: 16,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The probability of getting a head in a single toss of a fair coin is:",
                            options: [
                                "0",
                                "1/4",
                                "1/2",
                                "1"
                            ],
                            correct: 2,
                            explanation: "For a fair coin, P(Head) = Number of favorable outcomes / Total outcomes = 1/2"
                        },
                        {
                            id: 17,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The nth term of an AP with first term a and common difference d is:",
                            options: [
                                "a + nd",
                                "a + (n-1)d",
                                "a + (n+1)d",
                                "nd"
                            ],
                            correct: 1,
                            explanation: "nth term of AP: aₙ = a + (n-1)d"
                        },
                        {
                            id: 18,
                            type: "mcq",
                            subject: "mathematics",
                            question: "If vectors a⃗ and b⃗ are perpendicular, then a⃗ · b⃗ is:",
                            options: [
                                "0",
                                "1",
                                "|a⃗||b⃗|",
                                "-1"
                            ],
                            correct: 0,
                            explanation: "For perpendicular vectors, dot product a⃗ · b⃗ = |a⃗||b⃗|cos(90°) = 0"
                        },
                        {
                            id: 19,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The distance between points (1,2) and (4,6) is:",
                            options: [
                                "3",
                                "4",
                                "5",
                                "7"
                            ],
                            correct: 2,
                            explanation: "Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5"
                        },
                        {
                            id: 20,
                            type: "mcq",
                            subject: "mathematics",
                            question: "The value of log₂ 8 is:",
                            options: [
                                "2",
                                "3",
                                "4",
                                "8"
                            ],
                            correct: 1,
                            explanation: "log₂ 8 = log₂ 2³ = 3"
                        },
                        // Numerical Questions (21-25)
                        {
                            id: 21,
                            type: "numerical",
                            subject: "mathematics",
                            question: "Find the value of ∫₀¹ x² dx.",
                            answer: 0.333,
                            explanation: "∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3 ≈ 0.333"
                        },
                        {
                            id: 22,
                            type: "numerical",
                            subject: "mathematics",
                            question: "If 2ˣ = 32, find the value of x.",
                            answer: 5,
                            explanation: "2ˣ = 32 = 2⁵, so x = 5"
                        },
                        {
                            id: 23,
                            type: "numerical",
                            subject: "mathematics",
                            question: "Find the number of diagonals in a regular hexagon.",
                            answer: 9,
                            explanation: "Number of diagonals = n(n-3)/2 = 6(6-3)/2 = 6×3/2 = 9"
                        },
                        {
                            id: 24,
                            type: "numerical",
                            subject: "mathematics",
                            question: "If the mean of 5 numbers is 20, find their sum.",
                            answer: 100,
                            explanation: "Mean = Sum/n, so 20 = Sum/5, therefore Sum = 20 × 5 = 100"
                        },
                        {
                            id: 25,
                            type: "numerical",
                            subject: "mathematics",
                            question: "Find the slope of the line 3x + 4y = 12.",
                            answer: -0.75,
                            explanation: "Rewriting as y = -3x/4 + 3, the slope is -3/4 = -0.75"
                        }
                    ]
                }
            },
            {
                id: "jee-test-2",
                title: "JEE Mock Test 2",
                subtitle: "Advanced Level Test",
                difficulty: "Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 2),
                    chemistry: generateJEEQuestions("chemistry", 2),
                    mathematics: generateJEEQuestions("mathematics", 2)
                }
            },
            {
                id: "jee-test-3",
                title: "JEE Mock Test 3",
                subtitle: "Mechanics & Algebra Focus",
                difficulty: "Medium",
                questions: {
                    physics: generateJEEQuestions("physics", 3),
                    chemistry: generateJEEQuestions("chemistry", 3),
                    mathematics: generateJEEQuestions("mathematics", 3)
                }
            },
            {
                id: "jee-test-4",
                title: "JEE Mock Test 4",
                subtitle: "Thermodynamics & Calculus",
                difficulty: "Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 4),
                    chemistry: generateJEEQuestions("chemistry", 4),
                    mathematics: generateJEEQuestions("mathematics", 4)
                }
            },
            {
                id: "jee-test-5",
                title: "JEE Mock Test 5",
                subtitle: "Electricity & Organic Chemistry",
                difficulty: "Medium",
                questions: {
                    physics: generateJEEQuestions("physics", 5),
                    chemistry: generateJEEQuestions("chemistry", 5),
                    mathematics: generateJEEQuestions("mathematics", 5)
                }
            },
            {
                id: "jee-test-6",
                title: "JEE Mock Test 6",
                subtitle: "Optics & Coordination Chemistry",
                difficulty: "Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 6),
                    chemistry: generateJEEQuestions("chemistry", 6),
                    mathematics: generateJEEQuestions("mathematics", 6)
                }
            },
            {
                id: "jee-test-7",
                title: "JEE Mock Test 7",
                subtitle: "Modern Physics & P-Block",
                difficulty: "Very Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 7),
                    chemistry: generateJEEQuestions("chemistry", 7),
                    mathematics: generateJEEQuestions("mathematics", 7)
                }
            },
            {
                id: "jee-test-8",
                title: "JEE Mock Test 8",
                subtitle: "Waves & Electrochemistry",
                difficulty: "Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 8),
                    chemistry: generateJEEQuestions("chemistry", 8),
                    mathematics: generateJEEQuestions("mathematics", 8)
                }
            },
            {
                id: "jee-test-9",
                title: "JEE Mock Test 9",
                subtitle: "Final Revision Test",
                difficulty: "Very Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 9),
                    chemistry: generateJEEQuestions("chemistry", 9),
                    mathematics: generateJEEQuestions("mathematics", 9)
                }
            },
            {
                id: "jee-test-10",
                title: "JEE Mock Test 10",
                subtitle: "Ultimate Challenge Test",
                difficulty: "Very Hard",
                questions: {
                    physics: generateJEEQuestions("physics", 10),
                    chemistry: generateJEEQuestions("chemistry", 10),
                    mathematics: generateJEEQuestions("mathematics", 10)
                }
            }
        ]
    }
};

// Function to generate JEE questions for each test
function generateJEEQuestions(subject, testNumber) {
    const questions = [];

    // Generate 20 MCQ questions
    for (let i = 1; i <= 20; i++) {
        const question = {
            id: i,
            type: "mcq",
            subject: subject,
            question: getJEEQuestion(subject, testNumber, i, "mcq"),
            options: getJEEOptions(subject, testNumber, i),
            correct: (i + testNumber) % 4, // Vary correct answers
            explanation: `Detailed solution for ${subject} MCQ ${i} in test ${testNumber}. This involves applying fundamental concepts and formulas.`
        };
        questions.push(question);
    }

    // Generate 5 Numerical questions
    for (let i = 21; i <= 25; i++) {
        const question = {
            id: i,
            type: "numerical",
            subject: subject,
            question: getJEEQuestion(subject, testNumber, i, "numerical"),
            answer: getJEENumericalAnswer(subject, testNumber, i),
            explanation: `Step-by-step solution for ${subject} numerical ${i} in test ${testNumber}. Calculate using given formulas and values.`
        };
        questions.push(question);
    }

    return questions;
}

// Function to get subject-specific questions
function getJEEQuestion(subject, testNum, questionNum, type) {
    const questionBank = {
        physics: {
            mcq: [
                "A particle of mass m moves in a circular path of radius r with constant speed v. The centripetal acceleration is:",
                "Two point charges +q and -q are separated by distance d. The electric field at the midpoint is:",
                "A conducting rod of length L moves with velocity v perpendicular to a magnetic field B. The induced EMF is:",
                "The de Broglie wavelength of a particle with momentum p is:",
                "In a photoelectric effect experiment, the stopping potential depends on:",
                "The time period of a simple pendulum of length L is:",
                "The efficiency of a Carnot engine operating between temperatures T₁ and T₂ is:",
                "The magnetic field inside a long solenoid with n turns per unit length carrying current I is:",
                "The focal length of a thin lens is related to radii of curvature by:",
                "The binding energy per nucleon is maximum for:",
                "A spring-mass system has angular frequency ω. The time period is:",
                "The escape velocity from Earth's surface is:",
                "In Young's double slit experiment, the fringe width is proportional to:",
                "The coefficient of restitution for a perfectly elastic collision is:",
                "The dimensional formula of angular momentum is:",
                "A charged particle in crossed electric and magnetic fields moves in:",
                "The work function of a metal in photoelectric effect is:",
                "The magnetic flux through a closed surface is always:",
                "The speed of electromagnetic waves in vacuum is:",
                "The half-life of a radioactive substance is independent of:"
            ],
            numerical: [
                "A ball is dropped from height 45 m. Find the time taken to reach the ground (in seconds). Take g = 10 m/s².",
                "Calculate the resistance of a wire of length 100 m and cross-sectional area 2 mm². Resistivity = 1.7 × 10⁻⁸ Ωm.",
                "Find the energy of a photon of wavelength 600 nm (in eV). Use hc = 1240 eV·nm.",
                "A satellite orbits Earth at height 800 km. Find orbital speed (in km/s). Earth radius = 6400 km, g = 10 m/s².",
                "Calculate the capacitance of a parallel plate capacitor with area 0.01 m² and separation 1 mm. ε₀ = 8.85 × 10⁻¹² F/m."
            ]
        },
        chemistry: {
            mcq: [
                "The number of unpaired electrons in Fe³⁺ ion (atomic number 26) is:",
                "Which of the following has the highest electronegativity?",
                "The hybridization of carbon in methane (CH₄) is:",
                "The pH of 0.1 M HCl solution is:",
                "Which quantum number determines the shape of an orbital?",
                "The oxidation state of chromium in K₂Cr₂O₇ is:",
                "The geometry of ammonia (NH₃) molecule is:",
                "Which of the following is a Lewis acid?",
                "The number of σ and π bonds in ethyne (C₂H₂) are:",
                "The most stable carbocation among the following is:",
                "The coordination number of central metal in [Co(NH₃)₆]³⁺ is:",
                "Which of the following shows maximum covalent character?",
                "The rate of reaction doubles when temperature increases by 10°C. The activation energy is approximately:",
                "The crystal system of sodium chloride is:",
                "Which of the following is not a greenhouse gas?",
                "The IUPAC name of CH₃CH(CH₃)CH₂CH₃ is:",
                "The number of moles of KMnO₄ required to oxidize 1 mole of FeSO₄ in acidic medium is:",
                "Which element has the largest atomic radius in period 3?",
                "The bond angle in water molecule is approximately:",
                "Which of the following has maximum boiling point?"
            ],
            numerical: [
                "Calculate molarity of solution containing 5.85 g NaCl in 500 mL solution. (Na=23, Cl=35.5)",
                "Find the oxidation number of sulfur in H₂SO₄.",
                "How many sigma bonds are present in benzene (C₆H₆)?",
                "Calculate number of moles in 22.4 L of CO₂ at STP.",
                "Find formal charge on nitrogen in NH₄⁺ ion."
            ]
        },
        mathematics: {
            mcq: [
                "If f(x) = x³ - 6x² + 9x - 4, then f'(2) equals:",
                "The value of ∫₀^(π/2) sin²x dx is:",
                "The number of ways to arrange letters of 'PERMUTATION' is:",
                "If the roots of x² - 5x + 6 = 0 are α and β, then α² + β² equals:",
                "The coefficient of x⁷ in expansion of (1 + x)¹⁰ is:",
                "The domain of f(x) = √(x² - 9) is:",
                "If matrix A = [2 3; 1 4], then det(A) is:",
                "The equation of line passing through (2, 3) with slope -1 is:",
                "The sum of first 20 natural numbers is:",
                "If cos θ = 4/5, then sin θ is:",
                "The area of triangle with vertices (0,0), (4,0), (0,3) is:",
                "The value of lim(x→0) (tan x)/x is:",
                "The general solution of dy/dx = 2y is:",
                "If z = 5 + 12i, then |z| is:",
                "The equation x² + y² - 4x - 6y + 9 = 0 represents:",
                "The probability of getting sum 7 when two dice are thrown is:",
                "In an AP, if a = 5 and d = 3, then a₁₀ is:",
                "If vectors a⃗ and b⃗ are parallel, then a⃗ × b⃗ is:",
                "The distance between points (1,2) and (4,6) is:",
                "The value of log₃ 27 is:"
            ],
            numerical: [
                "Find the value of ∫₀² x³ dx.",
                "If 3ˣ = 81, find the value of x.",
                "Find number of diagonals in a regular octagon.",
                "If mean of 6 numbers is 15, find their sum.",
                "Find the slope of line 2x + 3y = 6."
            ]
        }
    };

    const questions = questionBank[subject][type];
    const index = ((questionNum - 1) + (testNum - 1) * 5) % questions.length;
    return questions[index];
}

// Function to get MCQ options
function getJEEOptions(subject, testNum, questionNum) {
    const optionsBank = {
        physics: [
            ["v²/r", "mv²/r", "v/r", "mv/r"],
            ["0", "2kq/d²", "kq/d²", "4kq/d²"],
            ["BLv", "BL/v", "B/Lv", "BLv²"],
            ["h/p", "p/h", "hp", "h + p"],
            ["Frequency only", "Intensity only", "Both", "Neither"],
            ["2π√(L/g)", "2π√(g/L)", "π√(L/g)", "π√(g/L)"],
            ["1 - T₂/T₁", "T₁/T₂", "T₂/T₁", "1 - T₁/T₂"],
            ["μ₀nI", "μ₀nI/2", "2μ₀nI", "μ₀I/n"],
            ["1/f = (μ-1)(1/R₁ - 1/R₂)", "1/f = (μ-1)(1/R₁ + 1/R₂)", "f = (μ-1)(R₁ + R₂)", "f = μ(R₁ - R₂)"],
            ["Hydrogen", "Helium", "Iron", "Uranium"],
            ["2π/ω", "ω/2π", "2πω", "ω²"],
            ["√(2gR)", "√(gR)", "√(gR/2)", "2√(gR)"],
            ["λ", "1/λ", "λ²", "√λ"],
            ["0", "0.5", "1", "∞"],
            ["ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MT⁻¹]"],
            ["Straight line", "Circle", "Parabola", "Helix"],
            ["Minimum energy to remove electron", "Maximum energy", "Average energy", "Total energy"],
            ["Zero", "Positive", "Negative", "Depends on field"],
            ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "Variable"],
            ["Initial amount", "Temperature", "Pressure", "All factors"]
        ],
        chemistry: [
            ["3", "4", "5", "6"],
            ["F", "Cl", "Br", "I"],
            ["sp", "sp²", "sp³", "sp³d"],
            ["0", "1", "2", "13"],
            ["n", "l", "m", "s"],
            ["+3", "+4", "+5", "+6"],
            ["Linear", "Trigonal planar", "Pyramidal", "Tetrahedral"],
            ["NH₃", "BF₃", "H₂O", "OH⁻"],
            ["2σ, 3π", "3σ, 2π", "4σ, 1π", "5σ, 0π"],
            ["CH₃⁺", "(CH₃)₂CH⁺", "(CH₃)₃C⁺", "C₆H₅CH₂⁺"],
            ["4", "5", "6", "7"],
            ["LiCl", "NaCl", "KCl", "CsCl"],
            ["25 kJ/mol", "50 kJ/mol", "75 kJ/mol", "100 kJ/mol"],
            ["Cubic", "Tetragonal", "Hexagonal", "Orthorhombic"],
            ["CO₂", "CH₄", "N₂O", "O₂"],
            ["2-methylbutane", "3-methylbutane", "Isopentane", "Pentane"],
            ["1/5", "1/3", "1", "5"],
            ["Na", "Mg", "Al", "Si"],
            ["104.5°", "109.5°", "120°", "180°"],
            ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "C₄H₉OH"]
        ],
        mathematics: [
            ["-3", "0", "3", "6"],
            ["π/8", "π/4", "π/2", "π"],
            ["11!/2!2!", "11!/2!", "11!", "10!"],
            ["13", "17", "25", "37"],
            ["120", "210", "252", "462"],
            ["(-∞,-3]∪[3,∞)", "[-3,3]", "(-3,3)", "(-∞,∞)"],
            ["5", "7", "8", "11"],
            ["y = -x + 5", "y = x + 1", "y = -x + 1", "y = x - 1"],
            ["190", "200", "210", "220"],
            ["±3/5", "3/5", "-3/5", "4/3"],
            ["6", "12", "24", "36"],
            ["0", "1", "∞", "Does not exist"],
            ["y = Ce²ˣ", "y = Cx²", "y = C + 2x", "y = Ce⁻²ˣ"],
            ["13", "17", "25", "169"],
            ["Circle", "Ellipse", "Parabola", "Hyperbola"],
            ["1/6", "1/4", "1/3", "1/2"],
            ["32", "35", "38", "41"],
            ["0⃗", "1", "|a⃗||b⃗|", "Undefined"],
            ["3", "4", "5", "7"],
            ["2", "3", "9", "27"]
        ]
    };

    const options = optionsBank[subject];
    const index = ((questionNum - 1) + (testNum - 1) * 5) % options.length;
    return options[index];
}

// Function to get numerical answers
function getJEENumericalAnswer(subject, testNum, questionNum) {
    const answersBank = {
        physics: [3, 0.85, 2.07, 7.1, 8.85],
        chemistry: [0.2, 6, 12, 1, 1],
        mathematics: [4, 4, 20, 90, -0.67]
    };

    const answers = answersBank[subject];
    const index = (questionNum - 21 + (testNum - 1)) % answers.length;
    return answers[index];
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEST_SERIES_DATA;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEST_SERIES_DATA;
}