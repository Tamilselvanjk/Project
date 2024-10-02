var search =document.getElementById("search")
var productContainer = document.getElementById("product")
var productBox = productContainer.querySelectorAll("div")

search.addEventListener("keyup",function()
{ 
     var enteredValue =event.target.value.toUpperCase()

    for(var i=0 ; i < productBox.length; i++)
    {
        var productname = productBox[i].querySelector("p").textContent //div is in para textContent//

        if(productname.toUpperCase().indexOf(enteredValue) < 0)
        {

            productBox[i].style.display="none"
        }
        else{
            productBox[i].style.display="block"
        }
    }
}) 