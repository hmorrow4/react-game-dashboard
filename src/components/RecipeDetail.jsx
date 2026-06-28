export default function RecipeDetail({ recipe, ingredients, showFullRecipe, onToggle, onBack }) {
  return (
    <section className="recipe-detail" aria-labelledby="recipe-detail-heading">
      <button className="back-button" type="button" onClick={onBack}>
        ← Back to results
      </button>

      <div className="detail-grid">
        <div className="detail-image-wrap">
          <img src={recipe.strMealThumb} alt={`${recipe.strMeal} dish`} />
        </div>

        <div className="detail-content">
          <div className="detail-heading">
            <p className="eyebrow">Recipe spotlight</p>
            <h3 id="recipe-detail-heading">{recipe.strMeal}</h3>
            <p className="detail-copy">
              {recipe.strCategory} • {recipe.strArea}
            </p>
          </div>

          <div className="ingredient-panel">
            <h4>Ingredients</h4>
            <ul className="ingredient-list">
              {ingredients.map((ingredient) => (
                <li key={`${ingredient.name}-${ingredient.measure}`}>
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-amount">{ingredient.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="secondary-button" type="button" onClick={onToggle}>
            {showFullRecipe ? "Hide full recipe" : "View full recipe"}
          </button>

          {showFullRecipe ? (
            <div className="instructions">
              <h4>How to make it</h4>
              <p>{recipe.strInstructions}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
