$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function submitQuiz() {
    // Aqui você pode adicionar a lógica para enviar as respostas do quiz
    alert("Quiz enviado!");
}