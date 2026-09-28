document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyzeBtn");

  const routes = [
    { name: "Route A", time: 29, vehicles: 842, load: 39, status: "Moderate", color: "orange" },
    { name: "Route B", time: 25, vehicles: 436, load: 18, status: "Low", color: "green" },
    { name: "Route C", time: 34, vehicles: 1298, load: 67, status: "Heavy", color: "red" },
    { name: "Route D", time: 27, vehicles: 638, load: 31, status: "Low", color: "yellow" }
  ];

  analyzeBtn.addEventListener("click", analyzeTraffic);

  function analyzeTraffic() {
    const start = document.getElementById("start").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const travelTime = document.getElementById("travelTime").value;
    const vehicle = document.getElementById("vehicle").value;
    const fuel = document.getElementById("fuel").value;
    const message = document.getElementById("message");

    message.textContent = "";

    if (!start || !destination || !travelTime || !vehicle || !fuel) {
      message.textContent = "Please enter/select all journey details.";
      message.className = "message error";
      return;
    }

    document.getElementById("emptyState").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    document.getElementById("fromText").textContent = start;
    document.getElementById("toText").textContent = destination;
    document.getElementById("timeText").textContent = travelTime;
    document.getElementById("vehicleText").textContent = vehicle;
    document.getElementById("fuelText").textContent = fuel;

    renderRoutes();
    message.textContent = "Traffic analysis completed.";
    message.className = "message success";
  }

  function renderRoutes() {
    const container = document.getElementById("routeCards");
    container.innerHTML = "";

    const recommended = routes.reduce((best, route) =>
      route.load < best.load ? route : best
    );

    routes.forEach(function (route) {
      const card = document.createElement("div");
      card.className = "route-card" + (route.name === recommended.name ? " recommended" : "");

      card.innerHTML = `
        <div class="route-name">
          ${route.name}
          <span class="status ${route.color}">${route.status}</span>
        </div>
        <div class="route-time">${route.time} <span>min</span></div>
        <div class="route-details">
          <span>${route.vehicles.toLocaleString()} vehicles</span>
          <span>${route.load}% load</span>
        </div>
        <div class="load">
          <span style="width:${route.load}%;background:${getColor(route.color)}"></span>
        </div>
        ${route.name === recommended.name ? '<div class="recommended-label">✓ Recommended Route</div>' : ""}
      `;

      container.appendChild(card);
    });

    document.getElementById("recommendation").innerHTML = `
      <h3>Recommended Route: ${recommended.name}</h3>
      <p>${recommended.name} has the lowest estimated traffic load (${recommended.load}%) among the available routes.</p>
      <p>Estimated travel time: <b>${recommended.time} minutes</b>.</p>
    `;
  }

  function getColor(color) {
    const colors = {
      red: "#ef4444",
      orange: "#f59e0b",
      yellow: "#facc15",
      green: "#22c55e"
    };
    return colors[color] || "#123f5d";
  }
});
