import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

function getIngredients(drink) {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const ingredient = drink[ingredientKey];
        const measure = drink[measureKey];

        if (ingredient && measure) {
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }

    const combined = ingredients.map((ing, index) => {
        return { ingredient: ing, measure: measures[index] };
    });

    return combined;
}

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const drink = result.data.drinks[0];
        const ingredients = getIngredients(drink);

        res.render("index.ejs", {
            name: drink.strDrink,
            picture: drink.strDrinkThumb,
            glass: drink.strGlass,
            instructions: drink.strInstructions,
            ingredients: ingredients,
        })
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});