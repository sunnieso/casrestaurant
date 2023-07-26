package recipe

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

var recipes map[string]Recipe
var recipeList []Text

func ListAllRecipes() ([]Text, error) {
	fmt.Printf("Listing recipes by name...\n")
	if recipes == nil {
		loadRecipeData()
	}

	return recipeList, nil
}

func GetRecipe(name string) (*Recipe, error) {
	fmt.Printf("Getting Recipe for %s\n", name)
	if recipes == nil {
		loadRecipeData()
	}

	content, _ := recipes[name]
	if content.Name.En != name {
		fmt.Printf("Something is off... recipe is not found.")
	}
	return &content, nil
}

func loadRecipeData() {
	fmt.Printf("Loading recipe data...\n")
	// TODO read lock
	var recipesArray []Recipe
	recipesRaw, err := ioutil.ReadFile("recipe/recipe.json")
	if err != nil {
		fmt.Printf("Error while getting recipe %v\n", err)
	}
	err = json.Unmarshal([]byte(recipesRaw), &recipesArray)
	if err != nil {
		panic(err)
	}

	recipes = make(map[string]Recipe)
	recipeList = make([]Text, len(recipesArray))

	for i, item := range recipesArray {
		recipes[item.Name.En] = item
		recipeList[i] = item.Name
		fmt.Printf("Loaded recipe '%s'\n.", item.Name.En)
	}
}
