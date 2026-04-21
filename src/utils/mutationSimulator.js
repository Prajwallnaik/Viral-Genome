export const BASES = ['A', 'U', 'G', 'C'];

export const BASE_COLORS = {
  'A': '#ff3333', // Red
  'U': '#3333ff', // Blue
  'G': '#33cc33', // Green
  'C': '#ffff33', // Yellow
};

/**
 * Mutates a given RNA sequence string based on a rate.
 * @param {string} sequence - Current RNA sequence
 * @param {number} rate - Mutation probability per base
 * @returns {object} { mutatedSequence, mutationCount }
 */
export const mutateSequence = (sequence, rate) => {
  let mutations = 0;
  const newSequence = sequence.split('').map(base => {
    // Math.random() is [0, 1). If rate is e.g. 0.05, 5% chance to mutate.
    if (Math.random() < rate) {
      mutations++;
      // Pick a random DIFFERENT base
      const availableBases = BASES.filter(b => b !== base);
      return availableBases[Math.floor(Math.random() * availableBases.length)];
    }
    return base;
  }).join('');

  return { newSequence, mutations };
};
