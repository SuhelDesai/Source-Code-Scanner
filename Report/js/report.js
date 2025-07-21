window.addEventListener("DOMContentLoaded", function () {
  const rows = Array.from(document.querySelectorAll("#reportTable tbody tr"));
  const severityFilter = document.getElementById("severityFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const fileFilter = document.getElementById("fileFilter");
  const searchInput = document.getElementById("searchInput");
  const recordsPerPage = document.getElementById("recordsPerPage");
  const pageInfo = document.getElementById("pageInfo");
  const nextBtn = document.getElementById("nextPage");
  const prevBtn = document.getElementById("prevPage");

  let currentPage = 0;
  let pageSize = parseInt(recordsPerPage.value);
  let filteredRows = [...rows];

  const severityColors = {
    "Critical": "#e53935",
    "High": "#fb8c00",
    "Medium": "#fdd835",
    "Low": "#43a047"
  };

  const extractUnique = key => [...new Set(rows.map(r => r.dataset[key]))];
  const populate = (select, values) => {
    values.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  };

  populate(severityFilter, extractUnique("severity"));
  populate(categoryFilter, extractUnique("category"));
  populate(fileFilter, extractUnique("file"));

  function applyFilters() {
    const sev = severityFilter.value.toLowerCase();
    const cat = categoryFilter.value.toLowerCase();
    const file = fileFilter.value.toLowerCase();
    const query = searchInput.value.toLowerCase();

    filteredRows = rows.filter(row =>
      (!sev || row.dataset.severity.toLowerCase() === sev) &&
      (!cat || row.dataset.category.toLowerCase() === cat) &&
      (!file || row.dataset.file.toLowerCase() === file) &&
      row.innerText.toLowerCase().includes(query)
    );

    currentPage = 0;
    updatePagination();
  }

  function updatePagination() {
    rows.forEach(r => r.style.display = "none");
    pageSize = parseInt(recordsPerPage.value);
    const start = currentPage * pageSize;
    const pageRows = filteredRows.slice(start, start + pageSize);
    pageRows.forEach(r => r.style.display = "");

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
    pageInfo.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;
  }

  

  searchInput.addEventListener("input", applyFilters);
  severityFilter.addEventListener("change", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  fileFilter.addEventListener("change", applyFilters);
  recordsPerPage.addEventListener("change", applyFilters);
  nextBtn.onclick = () => {
    if ((currentPage + 1) * pageSize < filteredRows.length) {
      currentPage++;
      updatePagination();
    }
  };
  prevBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      updatePagination();
    }
  };

  applyFilters();
  function buildChart(chartId, key, title, colorMap) {
    const ctx = document.getElementById(chartId).getContext("2d");
    const counts = {};

    filteredRows.forEach(row => {
      const val = row.dataset[key];
      counts[val] = (counts[val] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);
    const colors = labels.map(label => colorMap[label] || "#999");

    // Destroy existing chart if needed
    if (Chart.getChart(chartId)) {
      Chart.getChart(chartId).destroy();
    }

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: { size: 16 }
          },
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 8
            }
          }
        }
      }
    });
  }

  buildChart("severityChart", "severity", "Severity Distribution", severityColors);
  buildChart("categoryChart", "category", "Category Breakdown", {
    "CSRF": "#007bff",
    "CORS": "#ffc107",
    "XSSI": "#28a745",
    "UXSS": "#17a2b8",
    "Other": "#6f42c1"
  });

  document.getElementById("resetFilters").addEventListener("click", function () {
    searchInput.value = "";
    severityFilter.selectedIndex = 0;
    categoryFilter.selectedIndex = 0;
    fileFilter.selectedIndex = 0;
    applyFilters(); // trigger re-render
  });

});
