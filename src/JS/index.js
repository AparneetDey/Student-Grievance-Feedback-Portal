const displayModal = (modalId) => {
    const modal = document.querySelector(modalId);
    if(modal.classList.contains("active")) {
        modal.classList.remove("active");
    } else {
        modal.classList.add("active");
    }
}