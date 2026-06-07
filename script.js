const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 1
});

function compactNumber(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${formatter.format(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${formatter.format(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${formatter.format(value / 1_000)}K`;
  return formatter.format(value);
}

function updateCalculator() {
  const before = Number(document.querySelector("#beforeTokens").value) || 0;
  const after = Number(document.querySelector("#afterTokens").value) || 0;
  const saved = Math.max(before - after, 0);
  const percent = before > 0 ? (saved / before) * 100 : 0;

  document.querySelector("#tokensSaved").textContent = compactNumber(saved);
  document.querySelector("#percentSaved").textContent = `${formatter.format(percent)}%`;
  document.querySelector("#monthlySaved").textContent = compactNumber(saved * 30);
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", updateCalculator);
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;

    await navigator.clipboard.writeText(target.textContent.trim());
    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1200);
  });
});

updateCalculator();
