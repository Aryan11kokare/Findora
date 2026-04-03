const normalize = (text) => {
  return text
    ?.toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim();
};

const getWords = (text) => {
  return normalize(text).split(/\s+/);
};

const getMatchScore = (item, newItem) => {
  let score = 0;

  const newWords = [
    ...getWords(newItem.title),
    ...getWords(newItem.description || ""),
  ];

  const itemWords = [
    ...getWords(item.title),
    ...getWords(item.description || ""),
  ];

  // 🔹 Keyword match score
  newWords.forEach((word) => {
    if (itemWords.includes(word)) {
      score += 2; // exact word match
    }
  });

  // 🔹 Partial match (substring)
  newWords.forEach((word) => {
    itemWords.forEach((iWord) => {
      if (iWord.includes(word) || word.includes(iWord)) {
        score += 1;
      }
    });
  });

  // 🔹 Location boost
  if (item.location && item.location === newItem.location) {
    score += 3;
  }

  return score;
};

export const findMatches = (items, newItem) => {
  if (!newItem) return [];

  const results = items
    .map((item) => {
      const score = getMatchScore(item, newItem);
      return { ...item.toObject(), matchScore: score };
    })
    .filter((item) => item.matchScore > 3) // threshold
    .sort((a, b) => b.matchScore - a.matchScore);

  return results;
};
