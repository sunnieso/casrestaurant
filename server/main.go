package main

import (
	"casrestaurant/menu"
	"casrestaurant/recipe"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// // Serve frontend static files
	// router.Use(static.Serve("/", static.LocalFile("./frontend", true)))
	router.Static("/static", "./static/")
	router.LoadHTMLGlob("static/*.html")
	router.GET("home", func(ctx *gin.Context) {
		recipeList, _ := recipe.ListAllRecipes()
		ctx.HTML(
			http.StatusOK,
			"index.html",
			gin.H{
				"list": recipeList,
			})
	})

	router.POST("/language/:lang", func(ctx *gin.Context) {
		lang := ctx.Param("lang")
		fmt.Printf("Posting /language/%s\n", lang)
		// Store the selected language in a cookie for future visits
		cookie := &http.Cookie{
			Name:  "lang",
			Value: lang,
			Path:  "/",
		}
		http.SetCookie(ctx.Writer, cookie)

		ctx.JSON(http.StatusAccepted, gin.H{})
	})

	router.GET("recipes/:item", func(ctx *gin.Context) {
		item := ctx.Param("item")
		// Check if the "lang" cookie exists
		langCookie, err := ctx.Request.Cookie("lang")
		var lang string
		if err == nil {
			lang = langCookie.Value
		} else {
			// Default to English if no language cookie is set
			lang = "en"
		}
		recipe, _ := recipe.GetRecipe(item)
		fmt.Printf("requested '%s', obtained '%s', lang=%s\n", item, recipe.Name.Ch, lang)
		ctx.HTML(
			http.StatusOK,
			"recipe_"+lang+".html",
			gin.H{
				"recipe": recipe,
			})
	})

	router.GET("ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "%s", "Welcome to CAS!")
	})
	// router.GET("api/menu", getMenu)

	router.GET("api/recipes/:item", getRecipeByItem)
	router.GET("api/recipes", getRecipeByItem)

	portNumber := os.Getenv("APP_PORT")
	fmt.Printf("Starting the app on port %s", portNumber)
	router.Run(fmt.Sprintf(":%s", portNumber))
}

func getMenu(ctx *gin.Context) {
	fmt.Println("Getting menu of CAS Restaurant:")
	menuList, err := menu.GetMenu()
	if err != nil {
		fmt.Println("Error while getting menu ", err)
		return
	}
	menuStr := ""
	for _, item := range menuList.List {
		menuStr += fmt.Sprintf("%s | %s -- $%v\n", item.Name, item.ChineseName, item.UnitPrice)
	}

	ctx.String(http.StatusOK, "%s", menuStr)
}

func listRecipes(ctx *gin.Context) {
	list, err := recipe.ListAllRecipes()
	if err != nil {
		fmt.Println("Error while listing recipe ", err)
		return
	}
	ctx.JSON(http.StatusOK, list)
}

func getRecipeByItem(ctx *gin.Context) {
	item := ctx.Param("item")
	recipeContent, err := recipe.GetRecipe(item)
	if err != nil {
		fmt.Println("Error while getting recipe ", err)
		return
	}

	if recipeContent == nil {
		ctx.Status(http.StatusNotFound)
	} else {
		ctx.JSON(http.StatusOK, recipeContent)
	}
}
