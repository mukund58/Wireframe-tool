document.addEventListener("DOMContentLoaded", () => {
    const draftsContainer = document.querySelector(".drafts-container");

    // Fetch and display saved drafts
    function fetchDrafts() {
        fetch('public/wireframe/draft.html')
            .then(response => response.json())
            .then(drafts => {
                drafts.forEach(draft => {
                    const draftElement = document.createElement("div");
                    draftElement.classList.add("draft");
                    draftElement.innerHTML = `
                        <h3>${draft.title}</h3>
                        <p>${draft.content}</p>
                        <div class="actions">
                            <button class="delete" data-id="${draft.id}">Delete</button>
                            <button class="edit" data-id="${draft.id}">Re-edit</button>
                        </div>
                    `;
                    draftsContainer.appendChild(draftElement);
                });
            })
            .catch(error => console.error('Error fetching drafts:', error));
    }

    // Delete draft
    function deleteDraft(id) {
        fetch(`public/wireframe/draft.html?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                const draftElement = document.querySelector(`.draft .delete[data-id="${id}"]`).parentElement.parentElement;
                draftsContainer.removeChild(draftElement);
            })
            .catch(error => console.error('Error deleting draft:', error));
    }

    // Re-edit draft
    function reEditDraft(id) {
        fetch('public/wireframe/draft.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `reEdit=true&id=${id}`
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                window.location.href = `wireframe/editor.html?draftId=${id}`;
            })
            .catch(error => console.error('Error re-editing draft:', error));
    }

    // Autosave draft
    function autosaveDraft(title, content) {
        fetch('public/wireframe/draft.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `autosave=true&title=${title}&content=${content}`
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error('Error autosaving draft:', error));
    }

    // Event listeners for delete and re-edit buttons
    draftsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const id = e.target.getAttribute("data-id");
            deleteDraft(id);
        } else if (e.target.classList.contains("edit")) {
            const id = e.target.getAttribute("data-id");
            reEditDraft(id);
        }
    });

    // Initial fetch of drafts
    fetchDrafts();

    // Function to export the drafts as JSON and download it as a file
    function exportDraftsAsJSON() {
        fetch('public/wireframe/draft.html')
            .then(response => response.json())
            .then(drafts => {
                const json = JSON.stringify(drafts);
                const blob = new Blob([json], { type: 'application/json' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'drafts.json';
                link.click();
            })
            .catch(error => console.error('Error exporting drafts:', error));
    }

    // Function to import a JSON file and load the drafts
    function importDraftsFromJSON(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const json = e.target.result;
                const drafts = JSON.parse(json);
                draftsContainer.innerHTML = ''; // Clear existing drafts
                drafts.forEach(draft => {
                    const draftElement = document.createElement("div");
                    draftElement.classList.add("draft");
                    draftElement.innerHTML = `
                        <h3>${draft.title}</h3>
                        <p>${draft.content}</p>
                        <div class="actions">
                            <button class="delete" data-id="${draft.id}">Delete</button>
                            <button class="edit" data-id="${draft.id}">Re-edit</button>
                        </div>
                    `;
                    draftsContainer.appendChild(draftElement);
                });
            };
            reader.readAsText(file);
        }
    }

    // Add event listeners for the export and import buttons
    document.getElementById("export-drafts-btn").addEventListener("click", exportDraftsAsJSON);
    document.getElementById("import-drafts-btn").addEventListener("click", () => {
        document.getElementById("import-drafts-input").click();
    });

    // Add event listener for the import input element
    document.getElementById("import-drafts-input").addEventListener("change", importDraftsFromJSON);
});
