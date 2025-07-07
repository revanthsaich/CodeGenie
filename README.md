# CodeGenie AI - AI-Powered Code Generation Platform

<div align="center">
  <img src="frontend/public/logo.png" alt="CodeGenie Logo" width="200"/>
  
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
  [![Django](https://img.shields.io/badge/Django-5.1.7-green.svg)](https://djangoproject.com)
  [![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev)
</div>

## 🚀 Overview

CodeGenie AI is a cutting-edge AI-powered code generation platform that transforms your ideas into production-ready code. Built with modern web technologies and powered by CodeLlama AI model, it provides intelligent code suggestions, explanations, and complete code generation across multiple programming languages.

## ✨ Key Features

### 🧠 AI-Powered Code Generation
- **Intelligent Code Generation**: Generate code in multiple programming languages using CodeLlama 7B model
- **Context-Aware Suggestions**: Smart code completion and suggestions based on your requirements
- **Real-time Streaming**: Live code generation with streaming responses for better user experience

### 🔒 User Authentication & Security
- **JWT-based Authentication**: Secure user authentication using JSON Web Tokens
- **User Registration & Login**: Complete user management system
- **Protected Routes**: Secure access to chat functionality for authenticated users only

### 💬 Interactive Chat Interface
- **Real-time Chat**: Seamless chat interface for code generation requests
- **Chat History**: Persistent chat history for lgoged-in users
- **Voice Input**: Speech-to-text functionality for hands-free interaction
- **Syntax Highlighting**: Beautiful code syntax highlighting in chat responses

### 🎨 Modern User Interface
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Built-in theme switching capabilities
- **Smooth Animations**: Framer Motion powered animations for enhanced UX
- **Modern UI Components**: DaisyUI and Tailwind CSS for beautiful components

### 📊 Advanced Features
- **Streaming Responses**: Real-time code generation with streaming API
- **Code Explanations**: AI can explain code concepts and provide theoretical knowledge
- **Multi-language Support**: Support for various programming languages
- **Error Handling**: Robust error handling and user feedback

## 🏗️ Technical Architecture

### Backend (Django REST API)
- **Framework**: Django 5.1.7 with Django REST Framework
- **Authentication**: JWT with django-rest-framework-simplejwt
- **Database**: SQLite (development) with PostgreSQL support
- **AI Integration**: CodeLlama 7B model via Ollama API
- **CORS**: Configured for frontend-backend communication

### Frontend (React + Vite)
- **Framework**: React 19.0.0 with Vite build tool
- **Styling**: Tailwind CSS with DaisyUI components
- **State Management**: React hooks with context API
- **HTTP Client**: Axios for API communication
- **Animations**: Framer Motion for smooth transitions
- **Icons**: React Icons for consistent iconography

### AI Model
- **Model**: CodeLlama 7B (via Ollama)
- **Capabilities**: Code generation, explanation, and debugging
- **Streaming**: Real-time response streaming
- **Temperature Control**: Optimized for code generation accuracy

## 📁 Project Structure

```
CodeGenie/
├── backend/                    # Django backend
│   ├── backend/               # Django project settings
│   │   ├── settings.py        # Main settings
│   │   ├── urls.py           # URL routing
│   │   └── wsgi.py           # WSGI configuration
│   ├── api/                   # Authentication API
│   │   ├── models.py         # User models
│   │   ├── views.py          # Auth views
│   │   ├── serializers.py    # API serializers
│   │   └── urls.py           # Auth URLs
│   ├── codegenie/            # Main application
│   │   ├── models.py         # Chat history models
│   │   ├── views.py          # Code generation views
│   │   ├── serializers.py    # Chat serializers
│   │   └── urls.py           # App URLs
│   └── manage.py             # Django management
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx    # Navigation component
│   │   │   ├── Hero.jsx      # Landing page hero
│   │   │   ├── Features.jsx  # Features showcase
│   │   │   ├── ChatContainer.jsx  # Chat interface
│   │   │   ├── InputBar.jsx  # Message input
│   │   │   ├── Sidebar.jsx   # Chat sidebar
│   │   │   └── MessageBubble.jsx  # Message display
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx     # Landing page
│   │   │   ├── ChatPage.jsx # Chat interface
│   │   │   └── Auth.jsx     # Authentication
│   │   ├── utils/           # Utility functions
│   │   │   └── api.jsx      # API configuration
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   └── package.json         # Dependencies
└── requirements.txt         # Python dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js 18+
- Ollama (for AI model)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CodeGenie.git
cd CodeGenie
```

### 2. Backend Setup (Django)

#### Create Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r ../requirements.txt
```

#### Database Setup
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

#### Run Backend Server
```bash
python manage.py runserver
```

The backend will run on `http://127.0.0.1:8000`

### 3. Frontend Setup (React)

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Run Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. AI Model Setup (Ollama)

#### Install Ollama
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

#### Pull CodeLlama Model
```bash
ollama pull codellama:7b
```

#### Start Ollama Server
```bash
ollama serve
```

The Ollama API will run on `http://localhost:11434`

## 🔧 Configuration

### Backend Configuration
- **Database**: Configure in `backend/backend/settings.py`
- **CORS**: Already configured for frontend communication
- **JWT**: Token expiration and refresh settings
- **Ollama API**: URL configured in `codegenie/views.py`

### Frontend Configuration
- **API Base URL**: Configure in `src/utils/api.jsx`
- **Theme**: Customize in `tailwind.config.js`
- **Build Settings**: Configure in `vite.config.js`

## 🚀 Usage

### 1. User Registration/Login
1. Navigate to the home page
2. Click "Start Coding Now" to access authentication
3. Register a new account or login with existing credentials
4. Upon successful authentication, you'll be redirected to the chat interface

### 2. Code Generation
1. Access the chat interface at `/chat`
2. Type your code generation request in the input field
3. Use the microphone icon for voice input (if supported)
4. Watch as the AI generates code in real-time
5. View your chat history in the sidebar

### 3. Features Usage
- **Voice Input**: Click the microphone icon to use speech-to-text
- **Chat History**: View previous conversations in the sidebar
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Design**: Use on desktop, tablet, or mobile devices

## 📋 API Endpoints

### Authentication APIs
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Chat APIs
- `POST /api/generate-code/` - Generate code (streaming)
- `GET /api/chat-history/` - Get user chat history

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Secure password storage
- **CORS Configuration**: Properly configured cross-origin requests
- **Input Validation**: Server-side input validation
- **Error Handling**: Comprehensive error handling

## 🎨 UI/UX Features

- **Modern Design**: Clean, modern interface with DaisyUI
- **Animations**: Smooth transitions with Framer Motion
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: Screen reader friendly components
- **Loading States**: Visual feedback during operations

## 📦 Dependencies

### Backend Dependencies
- Django 5.1.7 - Web framework
- Django REST Framework 3.15.2 - API framework
- django-rest-framework-simplejwt 5.5.0 - JWT authentication
- django-cors-headers 4.7.0 - CORS handling
- requests 2.32.3 - HTTP requests to Ollama
- transformers - Hugging Face transformers
- torch 2.6.0 - PyTorch for AI models

### Frontend Dependencies
- React 19.0.0 - UI library
- Vite 6.2.0 - Build tool
- Tailwind CSS 3.4.17 - Styling
- DaisyUI 5.0.0 - UI components
- Framer Motion 12.4.10 - Animations
- Axios 1.8.2 - HTTP client
- React Router DOM 7.3.0 - Routing
- React Icons 5.5.0 - Icons

## 🚀 Deployment

### Backend Deployment
1. Configure production settings in `settings.py`
2. Set up PostgreSQL database
3. Configure static files with WhiteNoise
4. Deploy to platforms like Heroku, AWS, or DigitalOcean

### Frontend Deployment
1. Build production version: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Configure environment variables for API URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CodeLlama**: Meta's code generation model
- **Ollama**: Local AI model serving
- **Django**: Web framework
- **React**: Frontend library
- **Tailwind CSS**: Styling framework
- **DaisyUI**: Component library

## 📞 Support

For support, email support@codegenie.ai or join our community Discord server.

## 🔮 Future Enhancements

- [ ] Support for more AI models (GPT-4, Claude, etc.)
- [ ] Code execution environment
- [ ] Project templates generation
- [ ] Collaborative coding features
- [ ] Advanced code analysis and optimization
- [ ] Integration with popular IDEs
- [ ] Mobile app development
- [ ] Advanced user analytics
- [ ] Team workspaces
- [ ] Code version control integration

---

<div align="center">
  <p>Built with ❤️ by the CodeGenie Team</p>
  <p>© 2025 CodeGenie AI. All rights reserved.</p>
</div>
