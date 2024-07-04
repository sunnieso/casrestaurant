document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('recipes-display');
  
    // Fetch JSON data
    fetch('./static/recipe/recipe.json')
      .then(response => response.json())
      .then(data => {
        console.debug(data)
        // Loop through each item in the JSON array
        data.forEach(item => {

          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item-box');
          itemDiv.innerHTML = `${item.name.en} <br> ${item.name.ch}`;
          
          const itemA = document.createElement('a');
          itemA.href = `recipe.html?item=${item.name.en}`;
          itemA.rel= "noreferrer noopener"
          itemA.appendChild(itemDiv)
          contentDiv.appendChild(itemA); // Append each item to the content div
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  