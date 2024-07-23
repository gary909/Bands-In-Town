document.getElementById("searchButton").addEventListener("click", function () {
  const bandName = document.getElementById("bandInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!bandName) {
    resultsDiv.innerHTML = "<p>Please enter a band name.</p>";
    return;
  }

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(
    bandName
  )}/events?app_id=test`;

  fetch(proxyUrl + targetUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No events found for this band.</p>";
      } else {
        data.forEach((event) => {
          const eventDiv = document.createElement("div");
          eventDiv.className = "event";
          eventDiv.innerHTML = `
                        <h2>${event.lineup.join(", ")}</h2>
                        <p>${event.venue.name}, ${event.venue.city}</p>
                        <p>${new Date(event.datetime).toLocaleString()}</p>
                        <a href="${
                          event.offers && event.offers[0]
                            ? event.offers[0].url
                            : "#"
                        }" target="_blank">More Info</a>
                    `;
          resultsDiv.appendChild(eventDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      resultsDiv.innerHTML =
        "<p>There was an error fetching the events. Please try again later.</p>";
    });
});
