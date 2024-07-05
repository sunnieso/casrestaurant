document.addEventListener('DOMContentLoaded', function() {
    // Parse query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('item');
    
    const lang = document.getElementById('lang')

    // Retrieve stored user input from localStorage, if available
    lang.value = localStorage.getItem('userLanguage') || 'en';

    const recipeTitleDiv = document.getElementById('recipe-title');
    recipeTitleDiv.textContent = `${recipeName} Recipe`

    const ingredientsTitle = document.getElementById('ingredients-title')
    const stepsTitle = document.getElementById('steps-title')
    const notesTitle = document.getElementById('notes-title')

    const ingredientsBar = document.getElementById('ingredients-bar')
    const stepsTitleBar = document.getElementById('steps-bar')
    const notesTitleBar = document.getElementById('notes-bar')

    if (lang.value == "ch") {
      ingredientsTitle.innerText = "食材"
      stepsTitle.innerText = "做法"
      notesTitle.innerText = "備錄"
      ingredientsBar.innerText = "食材"
      stepsTitleBar.innerText = "做法"
      notesTitleBar.innerText = "備錄"
    } else {
      ingredientsTitle.innerText = "Ingredients"
      stepsTitle.innerText = "Steps"
      notesTitle.innerText = "Notes"
      ingredientsBar.innerText = "Ingredients"
      stepsTitleBar.innerText = "Steps"
      notesTitleBar.innerText = "Notes"
      document.title = `${recipeName} Recipe`
    }

    const ingredientsList = document.getElementById('ingredients-li')
    const stepsList = document.getElementById('steps-ul')
    const notesList = document.getElementById('notes-ul')

    // Fetch JSON data
    fetch('./static/recipe/recipe.json')
      .then(response => response.json())
      .then(data => {
        // Loop through each item in the JSON array
        data.forEach(item => {
          if (item.name.en == recipeName) {
            // title
            if (lang.value == "ch") {
              recipeTitleDiv.textContent = `${item.name.ch} 食譜`
              document.title = `${item.name.ch}食譜`
            }

            // ingredients
            item.ingredients.forEach(ingredient => {
              const li = document.createElement('li');
              li.classList.add('ingredient-row');
              
              if (lang.value == "ch") {
                measurement = ingredient.measurement > 0 ? `${ingredient.measurement} ${ingredient.unit.ch}` : "適量"
                li.innerHTML = `<div> ${ingredient.name.ch} </div> <div> ${measurement}</div>`
              } else {
                measurement = ingredient.measurement > 0 ? `${ingredient.measurement} ${ingredient.unit.en}` : "as desire"
                li.innerHTML = `<div> ${ingredient.name.en} </div> <div> ${measurement}</div>`
              }
              
              ingredientsList.appendChild(li)
            })

            // instructions
            item.steps.forEach(step => {
              const stepLi = document.createElement('li')
              if (lang.value == "ch") {
                stepLi.innerText = step.ch
              } else {
                stepLi.innerText = step.en
              }
              stepsList.appendChild(stepLi)
            })

            // notes
            if (item.notes.length == 0) {
              const notesSection = document.getElementById('notes-section')
              notesSection.hidden = true
              const notesBarDiv = document.getElementById('notes-bar-div')
              notesBarDiv.setAttribute("display", "none")

            } else {
              item.notes.forEach(note => {
                const noteLi = document.createElement('li')
                if (lang.value == "ch") {
                  noteLi.innerText = note.ch
                } else {
                  noteLi.innerText = note.en
                }
                notesList.appendChild(noteLi)
              })
            }
          }

        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  