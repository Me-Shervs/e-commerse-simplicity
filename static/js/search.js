document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault(); // prevent page reload
  const query = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".product").forEach(product => {
    const name = product.dataset.name.toLowerCase();
    if (name.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
