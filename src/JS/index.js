const displayModal = (modalId) => {
    const modal = document.querySelector(modalId);
    if(modal.classList.contains("active")) {
        modal.classList.remove("active");
    } else {
        modal.classList.add("active");
    }
}

const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = "./src/components/studentDashboard.html";
    console.log(window.location.href);
}