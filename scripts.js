$(document).ready(function() {
    // Função para formatar a data
    function formatarData(data) {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Definir a data atual
    const dataAtual = new Date();
    $('#currentDate').text(formatarData(dataAtual));

    function getQueryParams() {
        const name = window.location.search.substring(1);
        return name ? decodeURIComponent(name) : '';
    }

    const paramName = getQueryParams();
    if (paramName) $('#yourName').val(paramName);

    $('#signatureInput').on('input', function() {
        $('#signaturePreview').text($(this).val());
    });

    // Configuração do player de música
    const sound = new Howl({
        src: ['nois-vai-desce-bc.mp3'],
        volume: 0.7,
        html5: true,
        loop: true
    });

    function runConfetti() {
        const duration = 15000; // Aumentado para 15 segundos
        const end = Date.now() + duration;

        (function frame() {
            // Chuva de confetes da esquerda
            confetti({
                particleCount: 25,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
                gravity: 0.7,
                scalar: 1.5,
                drift: 2,
                ticks: 300
            });
            // Chuva de confetes da direita
            confetti({
                particleCount: 25,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
                gravity: 0.7,
                scalar: 1.5,
                drift: -2,
                ticks: 300
            });
            // Explosão central
            confetti({
                particleCount: 15,
                angle: 90,
                spread: 360,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff'],
                scalar: 2,
                shapes: ['star', 'circle'],
                ticks: 300
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    $('#renewButton').click(function() {
        var yourName = $('#yourName').val();
        var signature = $('#signatureInput').val();

        if (yourName && signature) {
            sound.play(); // Inicia a música
            runConfetti();
            
            Swal.fire({
                title: '🎉 AMIZADE RENOVADA! 🎉',
                html: `
                    <div class="animate__animated animate__bounce">
                        <h2>UHULLL! ${yourName}!</h2>
                    </div>
                    <div class="animate__animated animate__fadeIn">
                        <h3>🎮 BORA PRO PLAY! 🎮</h3>
                    </div>
                    <div class="animate__animated animate__fadeIn animate__delay-1s">
                        <h4>MAIS UM ANO DE MUITA ZOEIRA!</h4>
                    </div>
                `,
                imageUrl: 'https://data.textstudio.com/output/sample/animated/9/4/3/2/2026-2-12349.gif',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Gif de Amizade',
                showClass: {
                    popup: 'animate__animated animate__jackInTheBox animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__hinge animate__slower'
                },
                background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
                backdrop: `
                    rgba(0,0,123,0.6)
                    url("https://sweetalert2.github.io/images/nyan-cat.gif")
                    left top
                    no-repeat
                `,
                confirmButtonText: '🎮 BORA JOGAR! 🎮',
                showConfirmButton: true,
                timer: 15000,
                timerProgressBar: true,
                allowOutsideClick: false,
                width: 600,
                padding: '3em',
                didOpen: (modal) => {
                    modal.querySelector('.swal2-confirm').classList.add('animate__animated', 'animate__bounce');
                    confetti({
                        particleCount: 200,
                        spread: 180,
                        origin: { y: 0.6 }
                    });
                }
            }).then(() => {
                sound.stop(); // Para a música quando fechar o modal
                const newUrl = window.location.pathname + '?' + encodeURIComponent(yourName);
                window.history.pushState({}, '', newUrl);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, preencha seu nome e assinatura!',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
        }
    });
});
