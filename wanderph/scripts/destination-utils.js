export const formatBudget = (budget) => {
  const labels = {
    budget: "₱1,000–₱5,000",
    moderate: "₱5,000–₱10,000",
    comfortable: "₱10,000–₱20,000",
    premium: "₱20,000+"
  };

  return labels[budget] || budget;
};

export const styleLabel = (style) => {
  const labels = {
    beach: "Beach & Island",
    adventure: "Adventure",
    culture: "Culture & History",
    food: "Food & City",
    nature: "Nature & Mountains"
  };

  return labels[style] || style;
};
