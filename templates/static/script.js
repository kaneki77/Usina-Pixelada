/**
 * Simulador de Usina Pixelada - Frontend JavaScript
 */

class UsinaController {
    constructor() {
        this.updateInterval = 3000; // 3 segundos
        this.isOnline = true;
        this.historico = [];
        this.chart = null;
        
        this.init();
    }
    
    init() {
        console.log('🎮 Inicializando Usina Pixelada...');
        
        // Inicia atualizações automáticas
        this.startAutoUpdate();
        
        // Configura event listeners
        this.setupEventListeners();
        
        // Primeira atualização
        this.fetchSensores();
        
        // Inicializa gráfico
        this.initChart();
        
        // Carrega histórico
        this.loadHistorico();
    }
    
    setupEventListeners() {
        // Botões de válvulas
        document.querySelectorAll('[data-valvula]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const valvula = e.target.dataset.valvula;
                this.toggleValvula(valvula);
            });
        });
        
        // Botão de atualização manual
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.fetchSensores();
                this.showNotification('Dados atualizados!', 'success');
            });
        }
        
        // Controle de intervalo
        const intervalSelect = document.getElementById('interval-select');
        if (intervalSelect) {
            intervalSelect.addEventListener('change', (e) => {
                this.updateInterval = parseInt(e.target.value) * 1000;
                this.restartAutoUpdate();
            });
        }
    }
    
    async fetchSensores() {
        try {
            this.showLoading(true);
            
            const response = await fetch('/sensores');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            this.updateUI(data);
            this.updateStatus(true);
            
            // Adiciona ao histórico local
            this.historico.push({
                timestamp: new Date(),
                ...data
            });
            
            // Mantém apenas últimos 50 pontos
            if (this.historico.length > 50) {
                this.historico = this.historico.slice(-50);
            }
            
            this.updateChart();
            
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            this.updateStatus(false);
            this.showNotification('Erro ao conectar com o servidor', 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    updateUI(data) {
        // Atualiza temperatura
        const tempElement = document.getElementById('temperatura');
        if (tempElement) {
            tempElement.textContent = `${data.temperatura}°C`;
            tempElement.className = data.temperatura > 110 ? 'critical' : '';
        }
        
        // Atualiza pressão
        const pressaoElement = document.getElementById('pressao');
        if (pressaoElement) {
            pressaoElement.textContent = `${data.pressao} bar`;
            pressaoElement.className = data.pressao > 4.0 ? 'critical' : '';
        }
        
        // Atualiza válvulas
        Object.entries(data.valvulas).forEach(([nome, estado]) => {
            const btn = document.querySelector(`[data-valvula=\"${nome}\"]`);
            if (btn) {
                btn.textContent = `${this.formatValvulaName(nome)}: ${estado ? 'Aberta' : 'Fechada'}`;
                btn.className = `valvula-btn ${estado ? 'aberta' : 'fechada'}`;
            }
        });
        
        // Atualiza timestamp
        const timestampElement = document.getElementById('last-update');
        if (timestampElement) {
            timestampElement.textContent = `Última atualização: ${new Date().toLocaleTimeString()}`;
        }
        
        // Processa alertas
        if (data.alertas && data.alertas.length > 0) {
            data.alertas.forEach(alerta => {
                this.showNotification(alerta.mensagem, alerta.nivel);
            });
        }
    }
    
    async toggleValvula(nome) {
        try {
            const btn = document.querySelector(`[data-valvula=\"${nome}\"]`);
            if (btn) {
                btn.disabled = true;
                btn.classList.add('loading');
            }
            
            const response = await fetch(`/valvula/${nome}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // Atualiza imediatamente
            this.fetchSensores();
            
            // Feedback visual
            this.showNotification(
                `${this.formatValvulaName(nome)} ${data[nome] ? 'aberta' : 'fechada'}!`,
                'success'
            );
            
        } catch (error) {
            console.error('Erro ao controlar válvula:', error);
            this.showNotification('Erro ao controlar válvula', 'error');
        } finally {
            const btn = document.querySelector(`[data-valvula=\"${nome}\"]`);
            if (btn) {
                btn.disabled = false;
                btn.classList.remove('loading');
            }
        }
    }
    
    formatValvulaName(nome) {
        const numero = nome.replace('valvula', '');
        return `Válvula ${numero}`;
    }
    
    startAutoUpdate() {
        this.stopAutoUpdate();
        this.intervalId = setInterval(() => {
            this.fetchSensores();
        }, this.updateInterval);
    }
    
    stopAutoUpdate() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    
    restartAutoUpdate() {
        this.stopAutoUpdate();
        this.startAutoUpdate();
        this.showNotification(`Intervalo alterado para ${this.updateInterval/1000}s`, 'info');
    }
    
    updateStatus(online) {
        this.isOnline = online;
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            statusElement.textContent = online ? 'Online' : 'Offline';
            statusElement.className = `status ${online ? 'online' : 'offline'}`;
        }
    }
    
    showLoading(show) {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.style.display = show ? 'block' : 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove notificações antigas
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    initChart() {
        const canvas = document.getElementById('chart-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Configuração do gráfico (usando Chart.js se disponível)
        if (typeof Chart !== 'undefined') {
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperatura (°C)',
                        data: [],
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Pressão (bar)',
                        data: [],
                        borderColor: '#4ecdc4',
                        backgroundColor: 'rgba(78, 205, 196, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                            },
                        }
                    }
                }
            });
        }
    }
    
    updateChart() {
        if (!this.chart || this.historico.length === 0) return;
        
        const labels = this.historico.map(p => 
            p.timestamp.toLocaleTimeString()
        );
        
        const tempData = this.historico.map(p => p.temperatura);
        const pressaoData = this.historico.map(p => p.pressao);
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = tempData;
        this.chart.data.datasets[1].data = pressaoData;
        
        this.chart.update('none');
    }
    
    async loadHistorico() {
        try {
            const response = await fetch('/historico?horas=1');
            if (response.ok) {
                const data = await response.json();
                this.historico = data.map(p => ({
                    ...p,
                    timestamp: new Date(p.timestamp)
                }));
                this.updateChart();
            }
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        }
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.usinaController = new UsinaController();
});

// Cleanup ao sair da página
window.addEventListener('beforeunload', () => {
    if (window.usinaController) {
        window.usinaController.stopAutoUpdate();
    }
});

