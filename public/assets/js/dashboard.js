document.addEventListener("DOMContentLoaded", () => {
    const draftsContainer = document.querySelector(".drafts-container");

    // Fetch and display saved drafts
    function fetchDrafts() {
        fetch('../../backend/php/get_drafts.php')
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
        fetch('../../backend/php/delete_draft.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${id}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const draftElement = document.querySelector(`.draft .delete[data-id="${id}"]`).parentElement.parentElement;
                    draftsContainer.removeChild(draftElement);
                } else {
                    console.error('Error deleting draft:', data.message);
                }
            })
            .catch(error => console.error('Error deleting draft:', error));
    }

    // Re-edit draft
    function reEditDraft(id) {
        fetch('../../backend/php/update_draft.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${id}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = `wireframe/editor.html?draftId=${id}`;
                } else {
                    console.error('Error re-editing draft:', data.message);
                }
            })
            .catch(error => console.error('Error re-editing draft:', error));
    }

    // Create draft
    function createDraft(title, content) {
        fetch('../../backend/php/create_draft.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `title=${title}&content=${content}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const draftElement = document.createElement("div");
                    draftElement.classList.add("draft");
                    draftElement.innerHTML = `
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <div class="actions">
                            <button class="delete" data-id="${data.id}">Delete</button>
                            <button class="edit" data-id="${data.id}">Re-edit</button>
                        </div>
                    `;
                    draftsContainer.appendChild(draftElement);
                } else {
                    console.error('Error creating draft:', data.message);
                }
            })
            .catch(error => console.error('Error creating draft:', error));
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
