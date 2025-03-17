document.addEventListener("DOMContentLoaded", () => {
    const draftsContainer = document.querySelector(".drafts-container");

    // Fetch and display saved drafts
    function fetchDrafts() {
        // Placeholder for fetching drafts from server or local storage
        const drafts = [
            { id: 1, title: "Draft 1", content: "Content of draft 1" },
            { id: 2, title: "Draft 2", content: "Content of draft 2" },
            { id: 3, title: "Draft 3", content: "Content of draft 3" },
            { id: 4, title: "Draft 4", content: "Content of draft 4" }
        ];

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
    }

    // Delete draft
    function deleteDraft(id) {
        // Placeholder for deleting draft from server or local storage
        console.log(`Draft with id ${id} deleted`);
        const draftElement = document.querySelector(`.draft .delete[data-id="${id}"]`).parentElement.parentElement;
        draftsContainer.removeChild(draftElement);
    }

    // Re-edit draft
    function reEditDraft(id) {
        // Placeholder for re-editing draft functionality
        console.log(`Re-edit draft with id ${id}`);
        // Redirect to editor with draft content
        window.location.href = `wireframe/editor.html?draftId=${id}`;
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
        const drafts = [
            { id: 1, title: "Draft 1", content: "Content of draft 1" },
            { id: 2, title: "Draft 2", content: "Content of draft 2" },
            { id: 3, title: "Draft 3", content: "Content of draft 3" },
            { id: 4, title: "Draft 4", content: "Content of draft 4" }
        ];
        const json = JSON.stringify(drafts);
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'drafts.json';
        link.click();
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
