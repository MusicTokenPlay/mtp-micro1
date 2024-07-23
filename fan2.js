document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', function() {
        const content = this.getAttribute('data-content');
        loadContent(content);
    });
});

function loadContent(content) {
    if (window.modalContents && window.modalContents[content]) {
        document.getElementById('modal-text').innerHTML = window.modalContents[content];
        if (content === 'piano') {
            initPianoGame();
        } else if (content === 'disk') {
            initDiskGame();
        } else if (content === 'flip') {
            initFlipGame();
        }
        document.getElementById('modal').style.display = 'flex';
    } else {
        document.getElementById('modal-text').textContent = 'No content found';
        document.getElementById('modal').style.display = 'flex';
    }
}

document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal.style.display === 'flex' && !modalContent.contains(event.target) && !event.target.closest('.section')) {
        closeModal();
    }
});

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}