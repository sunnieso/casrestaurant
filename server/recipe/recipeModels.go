package recipe

const (
	Dessert       string = "Dessert"
	Dumplings     string = "Dumplings"
	Entre         string = "Entre"
	ChineseDishes string = "ChineseDishes"
)

type Text struct {
	En string `json:"en"`
	Ch string `json:"ch"`
}

type Ingredient struct {
	Name        Text    `json:"name"`
	Measurement float64 `json:"measurement"`
	Unit        Text    `json:"unit"`
}

type Recipe struct {
	Name        Text         `json:"name"`
	Category    string       `json:"category"`
	Ingredients []Ingredient `json:"ingredients"`
	Steps       []Text       `json:"steps"`
	Notes       []Text       `json:"notes"`
}
