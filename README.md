# 🔧 Simulador de Controle de Válvulas - Usina de Açúcar

Simulador web interativo para controle de válvulas em plantas industriais, desenvolvido com foco em **instrumentação e automação industrial**. Esse projeto simula o funcionamento básico de um painel SCADA para controle remoto de válvulas e leitura de sensores em uma usina de açúcar.

> 💻 **Projeto pessoal de Kaneki** | Estágio em Instrumentação e Automação Industrial na **Usina Coruripe**

---

## 🚀 Tecnologias Utilizadas

- **Python 3**
- **Flask** (Backend)
- **HTML5 + CSS3 + JavaScript** (Frontend)
- Responsivo para desktop e mobile

---

## ⚙️ Funcionalidades

✅ Controle individual de válvulas (abrir/fechar)  
✅ Leitura simulada de sensores:
- Temperatura da caldeira
- Pressão da linha

✅ Atualização automática a cada 3 segundos  
✅ Interface limpa e moderna (estilo painel SCADA)

---

## 📂 Estrutura do Projeto
simulador_usina/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│ └── index.html
├── static/
│ ├── style.css
│ └── script.js


## ▶️ Como executar localmente

```bash
git clone https://github.com/kaneki77/Usina-Pixelada.git
cd Usina-Pixelada
pip install -r requirements.txt
python app.py

🔗 Acesse no navegador: http://127.0.0.1:5000

