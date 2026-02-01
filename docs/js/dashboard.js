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
    console.log('clearStats викликана');
    console.log('Дані до очищення:', localStorage.getItem('testLogs'));
    
    if (confirm('Ви впевнені, що хочете очистити всю статистику? Цю дію неможливо скасувати.')) {
        console.log('Користувач підтвердив очищення');
        localStorage.removeItem('testLogs');
        console.log('Дані після очищення:', localStorage.getItem('testLogs'));
        
        const statsDiv = document.getElementById('user-stats');
        if (statsDiv) {
            statsDiv.innerHTML = '<p style="color: #28a745; font-weight: bold; font-size: 18px;">✓ Статистику успішно очищено!</p>';
            setTimeout(() => {
                console.log('Оновлення статистики...');
                loadUserStats();
            }, 1500);
        } else {
            console.error('Елемент user-stats не знайдено!');
        }
    } else {
        console.log('Користувач скасував очищення');
    }
}
