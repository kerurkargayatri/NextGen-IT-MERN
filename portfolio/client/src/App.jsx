
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('Connecting...');
  const [backendOnline, setBackendOnline] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');

        if (!response.ok) {
          throw new Error('Backend error');
        }

        const data = await response.json();
        setBackendMessage(data.message);
        setBackendOnline(true);
      } catch {
        setBackendMessage('Backend connection failed');
        setBackendOnline(false);
      }
    };

    checkBackend();
  }, []);

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React.js',
    'Node.js', 'Express.js', 'MongoDB', 'GitHub'
  ];

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio built using React.js.',
      tech: 'React • CSS'
    },
    {
      title: 'JobSkills App',
      description: 'A platform to explore skills and career opportunities.',
      tech: 'Web Development'
    },
    {
      title: 'NextGen IT',
      description: 'A digital solutions and web development project.',
      tech: 'React • Supabase'
    }
  ];

  const handleContact = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      setSending(true);

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message');
      }

      alert('Message sent successfully!');
      form.reset();

    } catch (error) {
      alert(error.message || 'Backend connection failed!');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="portfolio">

      {/* Navbar */}
      <nav className="navbar">
        <h2>Gayatri<span>.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tag">WELCOME TO MY PORTFOLIO</p>

          <h1>
            Hi, I'm <span>Gayatri</span>
          </h1>

          <h2>MERN Stack Developer</h2>

          <p className="description">
            I build modern websites and digital experiences.
            I am passionate about learning new technologies
            and creating useful web applications.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-btn">
              View Projects
            </a>

            <a href="#contact" className="secondary-btn">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="avatar">G</div>
          <h2>Gayatri</h2>
          <p>Future Full Stack Developer</p>

          <div className="status">
            <span></span> Learning & Building
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <p className="tag">GET TO KNOW ME</p>
        <h2>About <span>Me</span></h2>

        <p>
          I am a BCA graduate interested in web development.
          Currently learning the MERN Stack and building
          practical projects to grow as a developer.
        </p>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <p className="tag">MY EXPERTISE</p>
        <h2>Technical <span>Skills</span></h2>

        <div className="skill-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <p className="tag">MY WORK</p>
        <h2>Featured <span>Projects</span></h2>

        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>{project.tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact">
        <p className="tag">LET'S CONNECT</p>
        <h2>Contact <span>Me</span></h2>
        <p>Have a project or opportunity? Let's connect.</p>

        <form onSubmit={handleContact}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          />

          <button
            type="submit"
            className="primary-btn"
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      {/* Backend Status */}
      <div className="backend-status">
        <span className={backendOnline ? 'online-dot' : 'offline-dot'}></span>
        <strong>Backend Status:</strong> {backendMessage}
      </div>

      {/* Footer */}
      <footer>
        © 2026 Gayatri. Built with React & MERN Stack.
      </footer>

    </div>
  );
}

export default App;
