
// Scrolls down 90px from the top of
// the document, to resize the navlist
// padding and the title font-size
window.onscroll = function() {
    scrollFunction()
};
      
function scrollFunction() {
  if (document.body.scrollTop > 90 ||
      document.documentElement.scrollTop > 90)
  {
    // title size
    document.getElementById("header")
            .style.minHeight = "50px";    
    document.getElementById("header-name")
            .style.fontSize = "20px";
    document.getElementById("sub-header")
            .style.fontSize = "10px";
    document.getElementById("header-name")
            .style.fontWeight = "500";
  }
  else {
    // original layout
    document.getElementById("header")
            .style.display = "flex";
    document.getElementById("header")
            .style.flexDirection = "column";
    document.getElementById("header")
            .style.justifyContent = "space-between";
    
    // original size
    document.getElementById("header")
            .style.minHeight = "100px";
    document.getElementById("header-name")
            .style.fontSize = "40px";
    document.getElementById("sub-header")
            .style.fontSize = "20px";
    document.getElementById("header-name")
            .style.fontWeight = "800";
  }
}