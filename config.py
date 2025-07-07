"""
Configurações do Simulador de Usina Pixelada
"""
import os

class Config:
    """Configurações base"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'usina-pixelada-secret-key'
    
    # Configurações de simulação
    TEMP_MIN = 70.0
    TEMP_MAX = 120.0
    TEMP_CRITICAL = 110.0
    
    PRESSURE_MIN = 1.5
    PRESSURE_MAX = 4.5
    PRESSURE_CRITICAL = 4.0
    
    # Intervalos de atualização (segundos)
    SENSOR_UPDATE_INTERVAL = 3
    HISTORY_SAVE_INTERVAL = 10
    
    # Configurações de histórico
    MAX_HISTORY_POINTS = 100
    
    # Configurações de rede
    HOST = '0.0.0.0'
    PORT = 5000
    DEBUG = True

class ProductionConfig(Config):
    """Configurações de produção"""
    DEBUG = False
    
class DevelopmentConfig(Config):
    """Configurações de desenvolvimento"""
    DEBUG = True

class TestingConfig(Config):
    """Configurações de teste"""
    TESTING = True
    DEBUG = True

# Configuração padrão
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

