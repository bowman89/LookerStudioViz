function drawViz(data) {
  const div = document.getElementById("top-item");
  if (!data || !data.tables || !data.tables.DEFAULT) {
    div.innerText = "Ingen data";
    return;
  }

  const rows = data.tables.DEFAULT;

  if (rows.length === 0) {
    div.innerText = "Ingen data";
    return;
  }

  // Find rækken med flest køb
  const topItem = rows.reduce((prev, curr) => {
    return (curr[1] > prev[1]) ? curr : prev;
  });

  const itemName = topItem[0];
  const purchased = topItem[1];

  div.innerText = `🏆 ${itemName} (${purchased})`;
}

looker.plugins.visualizations.add({
  id: "top_item_viz",
  label: "Top Item",
  options: {},
  create: function(element, config) {
    element.innerHTML = `<div id="top-item"></div>`;
  },
  updateAsync: function(data, element, config, queryResponse, details, done) {
    drawViz(data);
    done();
  }
});

