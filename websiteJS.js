function showAlert(message) {
    alert(message);
}

function addToCart() {
    console.log("Item added to cart!");
    // Add your add-to-cart logic here
}

function showConfirmation() {
    if (confirm("Are you sure?")) {
        console.log("Action confirmed!");
        // Add your confirmation logic here
    } else {
        console.log("Action cancelled!");
    }
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}