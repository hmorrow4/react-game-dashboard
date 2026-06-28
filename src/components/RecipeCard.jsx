function getMealTags(recipe) {
  if (!recipe) {
    return ["Dinner", "Comfort food"];
  }

  const mealText = `${recipe.strMeal || ""} ${recipe.strCategory || ""} ${recipe.strArea || ""}`.toLowerCase();
  const hasBreakfast = /(egg|omelette|pancake|waffle|toast|porridge|crepe|bagel|breakfast)/i.test(mealText);
  const hasLunch = /(salad|sandwich|wrap|taco|burger|soup|pasta|rice|noodle|bowl|quesadilla|pizza|steak|seafood)/i.test(mealText);
  const hasDinner = /(stew|curry|roast|pie|casserole|lasagne|risotto|bake|chili|grill|schnitzel|fried|ramen|paella|tagine|pot pie|shepherd|meatball)/i.test(mealText);
  const hasSnack = /(snack|dip|roll|bite|toast|samosa)/i.test(mealText);

  const cuisineMap = {
    mexican: "Mexican",
    spanish: "Spanish",
    italian: "Italian",
    japanese: "Japanese",
    chinese: "Chinese",
    french: "French",
    indian: "Indian",
    thai: "Thai",
    jamaican: "Jamaican",
    american: "American",
    british: "British",
    greek: "Greek",
    korean: "Korean",
    vietnamese: "Vietnamese",
    moroccan: "Moroccan",
    turkish: "Turkish",
    canadian: "Canadian",
    filipino: "Filipino",
    egyptian: "Egyptian",
    portuguese: "Portuguese",
    russian: "Russian",
  };

  const cuisine = Object.entries(cuisineMap).find(([key]) => mealText.includes(key));
  const cuisineTag = cuisine ? cuisine[1] : recipe.strArea || "Global";

  let mealTime = "Dinner";
  if (hasBreakfast) {
    mealTime = "Breakfast";
  } else if (hasLunch && !hasDinner) {
    mealTime = "Lunch";
  } else if (hasSnack) {
    mealTime = "Snack";
  }

  return [mealTime, cuisineTag];
}

function getDescription(recipe) {
  const descriptions = [
    "Solid choice.",
    "Fills you up.",
    "Works every time.",
    "Keep it simple.",
    "No stress cooking.",
    "Real comfort food.",
    "Gets the job done.",
    "Worth making.",
    "Tried and true.",
    "Can't go wrong.",
  ];

  // Use a pseudo-random but consistent index based on meal name
  const index = recipe.strMeal.charCodeAt(0) % descriptions.length;
  return descriptions[index];
}

export default function RecipeCard({ recipe, onSelect }) {
  const tags = getMealTags(recipe);
  const description = getDescription(recipe);

  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        <img src={recipe.strMealThumb} alt={`${recipe.strMeal} dish`} loading="lazy" />
      </div>
      <div className="recipe-card__content">
        <div className="recipe-card__meta">
          {tags.map((tag) => (
            <span className="recipe-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h4>{recipe.strMeal}</h4>
        <p>{description}</p>
        <button type="button" onClick={() => onSelect(recipe)}>
          See recipe
        </button>
      </div>
    </article>
  );
}
