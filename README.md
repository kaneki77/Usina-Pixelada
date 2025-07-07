# 🔧 Simulador de Controle de Válvulas - Usina de Açúcar

Simulador web interativo para controle de válvulas em plantas industriais, desenvolvido com foco em **instrumentação e automação industrial**. Esse projeto simula o funcionamento básico de um painel SCADA para controle remoto de válvulas e leitura de sensores em uma usina de açúcar.

> 💻 **Projeto pessoal de Kaneki** | Estagiário em Instrumentação e Automação Industrial na **Usina Coruripe**

---

## 🚀 Tecnologias Utilizadas

- **Python 3**
- **Flask** (Backend)
- **HTML5 + CSS3 + JavaScript** (Frontend)
- **Chart.js** (Gráficos interativos)
- Responsivo para desktop e mobile

---

## ⚙️ Funcionalidades

✅ Controle individual de válvulas (abrir/fechar) - **Agora com 3 válvulas!**
✅ Leitura simulada de sensores:
- Temperatura da caldeira
- Pressão da linha

✅ Atualização automática a cada 3 segundos (intervalo configurável)
✅ Interface limpa e moderna (estilo painel SCADA) - **Com tema 8-bit e efeitos visuais!**
✅ **Gráficos em tempo real** para visualização de histórico de dados
✅ **Sistema de alertas** para valores críticos de temperatura e pressão
✅ Indicadores de status de conexão e última atualização


---
UsinaPixelada/
├── simulador_usina/
│   ├── app.py
│   ├── config.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── style.css
│       └── script.js
├── requirements.txt
├── README.md
├── MELHORIAS_IMPLEMENTADAS.md
└── analise_melhorias.md


## ▶️ Como executar localmente


1. Clone o repositório:
```bash
git clone https://github.com/kaneki77/Usina-Pixelada.git
cd Usina-Pixelada

🔗 Acesse no navegador: http://127.0.0.1:5000

2. Instale as dependências:
pip install -r requirements.txt

3.Execute a aplicação:
cd simulador_usina
python app.py

4. Acesse no navegador
🔗 http://127.0.0.1:5000


