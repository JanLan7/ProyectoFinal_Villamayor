document.addEventListener("DOMContentLoaded", function() {
    // Controles de audio
    const toggleAudio = document.getElementById('toggleAudio');
    const volumeControl = document.getElementById('volumeControl');
    const audioPlayer = document.getElementById('audioPlayer');
    let isMuted = false;

    toggleAudio.addEventListener('click', function() {
        if (isMuted) {
            audioPlayer.muted = false;
            toggleAudio.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        } else {
            audioPlayer.muted = true;
            toggleAudio.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        }
    });

    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value;
        if (this.value == 0) {
            toggleAudio.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        } else {
            toggleAudio.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        }
    });

    // ... resto del código existente ...
});
