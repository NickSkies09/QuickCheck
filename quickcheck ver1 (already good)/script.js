let checklistContainer = document.getElementById("checklist");

function addItem() {
  const itemDiv = document.createElement("div");
  itemDiv.className = "checklist-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Checklist item...";

  itemDiv.appendChild(checkbox);
  itemDiv.appendChild(textInput);

  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.className = "delete-btn";
  deleteButton.onclick = deleteItem;

  itemDiv.appendChild(deleteButton);
  checklistContainer.appendChild(itemDiv);
  
}

// Base64-encoded logo (converted from logo.png)
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAYAAACqaXHeAAABr0lEQVR4nO3QsQ0AIBAEQY39Zx/abKAEYzNIm5mTzrK+BAAAAAAAAJCz37P2Z5+e1+cAAAAAAAAAAPDKwIMAAAAAAAAAwMwBDwAAAAAAAMCMAw8AAAAAAAAAjAMPAADAzAMLAAAAAAAAzG0BDwAAAAAAAMDMwQMAAAAAAAAAwMwBDwAAAAAAAMCMAw8AAAAAAAAAjAMPAADAzAMLAAAAAAAAzG0BDwAAAAAAAMDMwQMAAAAAAAAAwMwBDwAAAAAAAMCMAw8AAAAAAAAAjAMPAADAzAMLAAAAAAAAzG0BDwAAAAAAAMDMwQMAAAAAAAAAwMwBDwAAAAAAAMCMAw8AAAAAAAAAjAMPAADAzAMLAAAAAAAAzK2fBfiWKN1bQkgMAAAAAElFTkSuQmCC";

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const title = document.getElementById('checklistTitle').value || "My Checklist";
  const category = document.getElementById('categorySelect').value || "Uncategorized";

  // Add logo to top-right
  if (logoBase64 && logoBase64.startsWith("data:image")) {
    doc.addImage(logoBase64, "PNG", 150, 10, 40, 20); // x, y, width, height
  }

  // Title and category
  doc.setFontSize(18);
  doc.text(title, 10, 25);

  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text(`Category: ${category}`, 10, 35);

  doc.setFontSize(12);
  doc.setTextColor(0);

  // Checklist items
  const items = document.querySelectorAll('.checklist-item');
  let y = 45;

  items.forEach(item => {
    const text = item.querySelector('input[type="text"]').value.trim();
    const checked = item.querySelector('input[type="checkbox"]').checked;
    if (text !== "") {
      doc.text(`${checked ? "[x]" : "[ ]"} ${text}`, 10, y);
      y += 10;
    }
  });

  doc.save("checklist.pdf");
}


