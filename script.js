function analyzeTraffic() {

    const start = document.getElementById("startLocation").value.trim();
    const destination = document.getElementById("destination").value.trim();

    const date = document.getElementById("travelDate").value;
    const time = document.getElementById("departureTime").value;
    const vehicle = document.getElementById("vehicleType").value;
    const fuel = document.getElementById("fuelType").value;

    // Check locations
    if (start === "" || destination === "") {
        alert("Please enter Starting Location and Destination.");
        return;
    }

    // Save trip details
    localStorage.setItem("startLocation", start);
    localStorage.setItem("destination", destination);
    localStorage.setItem("travelDate", date);
    localStorage.setItem("departureTime", time);
    localStorage.setItem("vehicleType", vehicle);
    localStorage.setItem("fuelType", fuel);

    // Open traffic analysis page
    window.location.href = "traffic.html";
}