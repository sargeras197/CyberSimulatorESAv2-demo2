// Dashboard логіка

// Завантаження статистики при завантаженні
window.addEventListener('DOMContentLoaded', function() {
    loadUserStats();
});

function loadUserStats() {
    const statsDiv = document.getElementById('user-stats');
    if (!statsDiv) return;
    
    const testLogs = JSON.parse(localStorage.getItem('testLogs') || '[]');
    
    if (testLogs.length === 0) {
        statsDiv.innerHTML = '<p>Ви ще не проходили жодних тестів.</p>';
        return;
    }
    
    // Підрахунок статистики
    const quizLogs = testLogs.filter(log => log.testName === 'quiz');
    const totalAttempts = quizLogs.length;
    const totalSuccesses = quizLogs.reduce((sum, log) => sum + log.successes, 0);
    const totalQuestions = quizLogs.reduce((sum, log) => sum + log.successes + log.fails, 0);
    const avgScore = totalQuestions > 0 ? ((totalSuccesses / totalQuestions) * 100).toFixed(1) : 0;
    
    statsDiv.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Всього спроб</h3>
                <p class="stat-value">${totalAttempts}</p>
            </div>
            <div class="stat-card">
                <h3>Правильних відповідей</h3>
                <p class="stat-value">${totalSuccesses} / ${totalQuestions}</p>
            </div>
            <div class="stat-card">
                <h3>Середній результат</h3>
                <p class="stat-value">${avgScore}%</p>
            </div>
        </div>
    `;
}

window.clearStats = function() {
    if (confirm('Ви впевнені, що хочете очистити всю статистику та дані сайту? Це видалить cookies, історію сесій та всі збережені дані. Цю дію неможливо скасувати.')) {
        // Очищення localStorage
        localStorage.clear();
        
        // Очищення sessionStorage
        sessionStorage.clear();
        
        // Очищення всіх cookies
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        
        // Показати повідомлення про успіх
        const statsDiv = document.getElementById('user-stats');
        if (statsDiv) {
            statsDiv.innerHTML = '<p style="color: #28a745; font-weight: bold; font-size: 18px;">✓ Всі дані успішно очищено! Сторінка оновлюється...</p>';
        }
        
        // Оновити сторінку через 2 секунди
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}
