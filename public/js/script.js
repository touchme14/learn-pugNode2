document.addEventListener('DOMContentLoaded', () => {
    const countryFilter = document.getElementById('countryFilter');
    const tableBody = document.querySelector('.table-bordered tbody');
  
    function loadInitialData() {
      fetch('/gigs')
        .then(response => response.json())
        .then(data => updateTable(data));
    }
  
    function updateTable(data) {
      tableBody.innerHTML = '';
  
      data.forEach((list, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = list.name;
        row.insertCell().textContent = list.age;
        row.insertCell().textContent = list.country;
        row.insertCell().textContent = list.city;
        row.insertCell().innerHTML = `
          <div class="btn-group">
            <a href="/gigs/update/${list.id}" class="btn btn-sm btn-primary">
              <i class="fas fa-edit" style="color: green;"></i>
            </a>
            <form method="POST" action="/gigs/delete/${list.id}" style="display: inline;">
              <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')">
                <i class="fas fa-trash" style="color: red;"></i>
              </button>
            </form>
          </div>
        `;
      });
    }
  
    countryFilter.addEventListener('change', () => {
      const selectedCountry = countryFilter.value;
  
      fetch(`/gigs?country=${selectedCountry}`)
        .then(response => response.json())
        .then(data => updateTable(data));
    });
  
    loadInitialData();
  });