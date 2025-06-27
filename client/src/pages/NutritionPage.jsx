import React from "react";
import "./NutritionPage.css";

function NutritionPage() {
  // Dummy data for nutrition info
  const nutritionData = [
    { name: "Breakfast", calories: 400, protein: 20, carbs: 45, fats: 10 },
    { name: "Lunch", calories: 600, protein: 30, carbs: 80, fats: 15 },
    { name: "Dinner", calories: 500, protein: 25, carbs: 50, fats: 20 },
    { name: "Snacks", calories: 200, protein: 10, carbs: 25, fats: 5 },
  ];

  const totalCalories = nutritionData.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = nutritionData.reduce((acc, meal) => acc + meal.protein, 0);
  const totalCarbs = nutritionData.reduce((acc, meal) => acc + meal.carbs, 0);
  const totalFats = nutritionData.reduce((acc, meal) => acc + meal.fats, 0);

  return (
    <div className="nutrition-container">
      <div className="nutrition-header">
        <h1>🍏 Your Daily Nutrition</h1>
        <p>Track your meals and get insights on your daily intake</p>
      </div>

      {/* Nutrition Summary */}
      <div className="nutrition-summary row">
        <div className="col-md-6 col-lg-3">
          <div className="summary-card">
            <h3>Total Calories</h3>
            <p className="value">{totalCalories} kcal</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="summary-card">
            <h3>Total Protein</h3>
            <p className="value">{totalProtein} g</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="summary-card">
            <h3>Total Carbs</h3>
            <p className="value">{totalCarbs} g</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="summary-card">
            <h3>Total Fats</h3>
            <p className="value">{totalFats} g</p>
          </div>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="container mt-4">
        <div className="row">
          {nutritionData.map((meal, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="meal-card card">
                <div className="card-body">
                  <h5 className="card-title">{meal.name}</h5>
                  <p className="card-text">Calories: {meal.calories} kcal</p>
                  <p className="card-text">Protein: {meal.protein} g</p>
                  <p className="card-text">Carbs: {meal.carbs} g</p>
                  <p className="card-text">Fats: {meal.fats} g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NutritionPage;
