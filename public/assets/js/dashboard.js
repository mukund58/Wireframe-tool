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
});
