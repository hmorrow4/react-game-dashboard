import { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";

const MEAL_API = "https://www.themealdb.com/api/json/v1/1";

export default function Dashboard() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedIngredient = ingredient.trim();

    if (!trimmedIngredient) {
      setError("Enter an ingredient to get started.");
      return;
    }

    setLoading(true);
    setError("");
    setSelectedRecipe(null);
    setShowFullRecipe(false);

    try {
      const response = await fetch(
        `${MEAL_API}/filter.php?i=${encodeURIComponent(trimmedIngredient)}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch recipes right now.");
      }

      const data = await response.json();

      if (!data.meals) {
        setRecipes([]);
        setError(`No recipes found for “${trimmedIngredient}”. Try another ingredient.`);
        return;
      }

      setRecipes(data.meals);
    } catch (err) {
      setRecipes([]);
      setError(err.message || "Something went wrong while searching for recipes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRecipeSelection(recipe) {
    setLoading(true);
    setError("");
    setShowFullRecipe(false);

    try {
      const response = await fetch(`${MEAL_API}/lookup.php?i=${recipe.idMeal}`);

      if (!response.ok) {
        throw new Error("Unable to load the recipe details.");
      }

      const data = await response.json();
      setSelectedRecipe(data.meals?.[0] ?? null);
    } catch (err) {
      setError(err.message || "Could not load the recipe details.");
    } finally {
      setLoading(false);
    }
  }

  function handleBackToResults() {
    setSelectedRecipe(null);
    setShowFullRecipe(false);
  }

  function buildIngredients(recipe) {
    if (!recipe) {
      return [];
    }

    const ingredients = [];

    for (let index = 1; index <= 20; index += 1) {
      const name = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];

      if (name && name.trim()) {
        ingredients.push({
          name: name.trim(),
          measure: measure ? measure.trim() : "to taste",
        });
      }
    }

    return ingredients;
  }

  const ingredients = buildIngredients(selectedRecipe);

  return (
    <section className="recipe-app" aria-labelledby="recipe-finder-heading">
      <div className="hero-panel">
        <h2 id="recipe-finder-heading">Search by ingredient</h2>

        <form className="search-form" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="ingredient-search">
            Ingredient to search for
          </label>
          <input
            id="ingredient-search"
            name="ingredient"
            type="text"
            placeholder="Try chicken, rice, or eggs"
            value={ingredient}
            onChange={(event) => setIngredient(event.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {error ? (
        <p className="status error" role="alert">
          {error}
        </p>
      ) : null}

      {loading && !selectedRecipe ? (
        <p className="status">Searching for recipes...</p>
      ) : null}

      {!loading && !selectedRecipe && recipes.length > 0 ? (
        <section className="results-section" aria-labelledby="results-heading">
          <div className="section-header">
            <h3 id="results-heading">Recipes you can make</h3>
            <p className="results-count">{recipes.length} dishes</p>
          </div>

          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} onSelect={handleRecipeSelection} />
            ))}
          </div>
        </section>
      ) : null}

      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          ingredients={ingredients}
          showFullRecipe={showFullRecipe}
          onToggle={() => setShowFullRecipe((currentValue) => !currentValue)}
          onBack={handleBackToResults}
        />
      ) : null}

      {!loading && !error && recipes.length === 0 && !selectedRecipe ? (
        <p className="status">Search with an ingredient to see recipes.</p>
      ) : null}
    </section>
  );
}