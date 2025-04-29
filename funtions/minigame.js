const ventanaFlotante = document.getElementById('ventanaFlotante');
const cerrarVentanaBtn = document.getElementById('cerrarVentana');
const tituloVentana = document.getElementById('tituloVentana');

let isMinigameActive = false;
let isNavOpen = true; // Simula que la navegación está abierta inicialmente

// Inicializar el minijuego
function initMinigame() {
    tituloVentana.textContent = "¡Esquiva los Obstáculos!";
    ventanaFlotante.innerHTML = `
        <div class="cabecera">
            <span id="tituloVentana">¡Esquiva los Obstáculos!</span>
            <button id="cerrarVentana">×</button>
        </div>
        <canvas id="gameCanvas"></canvas>
        <div id="gameMessage" class="game-message" style="display:none;"></div>
    `;

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameMessage = document.getElementById('gameMessage');
    const closeButton = document.getElementById('cerrarVentana');

    canvas.width = 280;
    canvas.height = 150;

    const player = {
        x: 50,
        y: canvas.height / 2 - 10,
        width: 20,
        height: 20,
        color: 'blue',
        velocityY: 0,
        gravity: 0.5,
        jumping: false
    };

    const obstacles = [];
    let obstacleInterval = 150;
    let obstacleSpeed = 3;
    let gameFrame = 0;
    let score = 0;
    let lives = 3;

    function createObstacle() {
        const obstacleHeight = Math.random() * 30 + 20;
        const obstacleY = canvas.height - obstacleHeight;
        obstacles.push({
            x: canvas.width,
            y: obstacleY,
            width: 15,
            height: obstacleHeight,
            color: 'green'
        });
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mover y dibujar el jugador
        player.velocityY += player.gravity;
        player.y += player.velocityY;
        if (player.y > canvas.height - player.height) {
            player.y = canvas.height - player.height;
            player.jumping = false;
            player.velocityY = 0;
        }
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Mover y dibujar los obstáculos
        obstacles.forEach(obstacle => {
            obstacle.x -= obstacleSpeed;
            ctx.fillStyle = obstacle.color;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            // Detección de colisión
            if (player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y) {
                lives--;
                obstacles.length = 0; // Reiniciar obstáculos
                player.y = canvas.height / 2 - 10;
                player.velocityY = 0;
                player.jumping = false;
                gameFrame = 0;
                obstacleSpeed = 3;
                if (lives <= 0) {
                    gameOver();
                } else {
                    gameMessage.textContent = `¡Auch! Intentos restantes: ${lives}`;
                    gameMessage.style.display = 'block';
                    setTimeout(() => {
                        gameMessage.style.display = 'none';
                    }, 1500);
                }
            }
        });

        // Eliminar obstáculos fuera de la pantalla
        obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

        // automatizar nuevos obstáculos periódicamente
        if (gameFrame % obstacleInterval === 0) {
            createObstacle();
            if (obstacleInterval > 50) {
                obstacleInterval -= 5;
            }
            if (obstacleSpeed < 8) {
                obstacleSpeed += 0.1;
            }
        }

        // insertar puntuación
        ctx.fillStyle = '#000';
        ctx.font = '14px sans-serif';
        ctx.fillText(`Puntuación: ${Math.floor(gameFrame / 30)}`, 10, 20);
        ctx.fillText(`Intentos: ${lives}`, 10, 40);

        gameFrame++;
        if (isMinigameActive && isNavOpen) {
            requestAnimationFrame(updateGame);
        } else if (!isNavOpen) {
            closeMinigameView();
        }
    }

    function jump() {
        if (!player.jumping) {
            player.velocityY = -10;
            player.jumping = true;
        }
    }

    function gameOver() {
        gameMessage.textContent = `¡Juego Terminado! Puntuación final: ${Math.floor(gameFrame / 30)}`;
        gameMessage.style.display = 'block';
        isMinigameActive = false;
        setTimeout(() => {
            closeMinigameView();
        }, 3000);
    }

    function handleKeyDown(event) {
        if (event.code === 'Space') {
            jump();
        }
    }

    canvas.addEventListener('click', jump);
    document.addEventListener('keydown', handleKeyDown);
    closeButton.addEventListener('click', closeMinigameView);

    updateGame();
}

function openMinigameView() {
    ventanaFlotante.classList.add('expandir');
    setTimeout(initMinigame, 300); // Esperar la animación de expansión
    isMinigameActive = true;
}

function closeMinigameView() {
    ventanaFlotante.classList.remove('expandir');
    ventanaFlotante.innerHTML = `
        <div class="cabecera">
            <span id="tituloVentana">¡Mini Juego!</span>
            <button id="cerrarVentana">×</button>
        </div>
    `;
    isMinigameActive = false;
    const newCloseButton = ventanaFlotante.querySelector('#cerrarVentana');
    if (newCloseButton) {
        newCloseButton.addEventListener('click', closeMinigameView);
    }
}

ventanaFlotante.addEventListener('mouseenter', openMinigameView);

// Simulación del estado de la navegación (puedes integrarlo con tu lógica real)
// setInterval(() => {
//     isNavOpen = !isNavOpen;
//     console.log('Navegación abierta:', isNavOpen);
// }, 5000);

// Inicializar el botón de cierre en el estado inicial
const initialCloseButton = ventanaFlotante.querySelector('#cerrarVentana');
if (initialCloseButton) {
    initialCloseButton.addEventListener('click', closeMinigameView);
}