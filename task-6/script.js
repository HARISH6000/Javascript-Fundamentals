const list = document.getElementById('draggableList');
let draggedItem = null;


const items = document.querySelectorAll('.list-item');
items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
});

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => {
        this.classList.add('dragging');
    }, 0);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
    // Remove 'over' class from all items
    items.forEach(item => item.classList.remove('over'));
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
}

function handleDragEnter(e) {
    e.preventDefault();
    if (this !== draggedItem) {
        this.classList.add('over');
    }
}

function handleDragLeave() {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.preventDefault();
    if (this !== draggedItem) {
        // Get the positions
        const allItems = [...document.querySelectorAll('.list-item')];
        const draggedIndex = allItems.indexOf(draggedItem);
        const dropIndex = allItems.indexOf(this);

        // Reorder the DOM
        if (draggedIndex < dropIndex) {
            this.parentNode.insertBefore(draggedItem, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedItem, this);
        }
    }
    this.classList.remove('over');
}