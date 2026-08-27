// Adicione esta função para criar o efeito visual de clique
function createStarRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("star-ripple");

    const ripple = button.getElementsByClassName("star-ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Atualize a função loadPhase para incluir as animações nos botões
function loadPhase() {
    if (currentIndex >= missionData.length) {
        showSummary();
        return;
    }

    const currentPhase = missionData[currentIndex];
    
    // Efeito de transição na caixa da missão
    cardMission.classList.remove("fade-in");
    void cardMission.offsetWidth; // Força o reflow para reiniciar a animação
    cardMission.classList.add("fade-in");

    titleEl.textContent = currentPhase.title;
    descEl.textContent = currentPhase.description;
    
    const progressPercent = (currentIndex / missionData.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    optionsGridEl.innerHTML = "";
    currentPhase.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `<span>${option.text}</span> <span class="option-symbol">✦</span>`;
        
        btn.onclick = (e) => {
            createStarRipple(e, btn);
            // Pequeno atraso para o usuário ver o efeito antes de avançar
            setTimeout(() => {
                selectOption(option);
            }, 250);
        };
        
        optionsGridEl.appendChild(btn);
    });
}