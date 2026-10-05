import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { subscribeTasksByDate, updateTaskFocus, setTaskCompleted } from "../services/taskService.js";
import { getTodayDateString } from "../utils/dateHelpers.js";

// Tempo padrão do Pomodoro (em segundos)
const POMODORO_SECONDS = 25 * 60;

export default function Foco() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const taskId = searchParams.get("taskId");
  const [task, setTask] = useState(null);
  
  // Estados do Timer
  const [timeLeft, setTimeLeft] = useState(POMODORO_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  // Solicitar permissão para notificação ao montar
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Carregar a task se tiver taskId
  useEffect(() => {
    if (!user || !taskId) return;
    const unsubscribe = subscribeTasksByDate(
      user.uid,
      getTodayDateString(),
      (tasks) => {
        const found = tasks.find(t => t.id === taskId);
        setTask(found || null);
      }
    );
    return () => unsubscribe();
  }, [user, taskId]);

  // Efeito do Timer
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      handlePomodoroEnd();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  async function handlePomodoroEnd() {
    // 1. Notificação Local
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro concluído!", {
        body: task ? `Você terminou um bloco para: ${task.title}` : "Hora de descansar!",
        icon: "/icons/icon-192x192.png",
      });
    } else {
      alert("Pomodoro concluído! Hora de descansar.");
    }

    // 2. Atualizar Firebase se houver uma task
    if (task) {
      try {
        await updateTaskFocus(
          task.id, 
          task.focusSeconds + POMODORO_SECONDS,
          task.pomodoros + 1
        );
      } catch (err) {
        console.error("Erro ao salvar progresso:", err);
      }
    }

    // 3. Resetar timer para descanso de 5 min (ou 25 de novo)
    // Para simplificar, reseta para 25min.
    setTimeLeft(POMODORO_SECONDS);
  }

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(POMODORO_SECONDS);
  }

  async function finishTask() {
    if (!task) return;
    await setTaskCompleted(task.id, true);
    navigate("/"); // Volta pra home
  }

  // Formatação do tempo: MM:SS
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const progress = ((POMODORO_SECONDS - timeLeft) / POMODORO_SECONDS) * 100;

  return (
    <div className="d-flex flex-column h-100 justify-content-center pb-5">
      
      {task ? (
        <div className="text-center mb-4">
          <p className="text-muted fw-bold mb-1">Focando em:</p>
          <h4 className="fw-bold">{task.title}</h4>
          <span className="badge bg-primary rounded-pill mt-1 px-3 py-2">
            {task.pomodoros} pomodoros hoje
          </span>
        </div>
      ) : (
        <div className="text-center mb-4">
          <h4 className="fw-bold">Foco Livre</h4>
          <p className="text-muted">Inicie o timer para começar.</p>
        </div>
      )}

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4 text-center">
          
          {/* Círculo do Timer ou Texto Gigante */}
          <div className="display-1 fw-bold font-monospace py-4" style={{ letterSpacing: "-2px" }}>
            {minutes}:{seconds}
          </div>

          <ProgressBar now={progress} aria-label="Progresso da sessão de foco" className="mb-4" style={{ height: "6px" }} />

          <div className="d-flex justify-content-center gap-3">
            <Button 
              variant={isRunning ? "warning" : "primary"} 
              size="lg" 
              className="rounded-pill px-4 fw-bold"
              onClick={toggleTimer}
            >
              <i className={`bi ${isRunning ? "bi-pause-fill" : "bi-play-fill"} me-2`}></i>
              {isRunning ? "Pausar" : "Começar"}
            </Button>
            
            <Button 
              variant="outline-secondary" 
              size="lg" 
              className="rounded-pill px-4"
              aria-label="Reiniciar cronômetro"
              onClick={resetTimer}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </Button>
          </div>

        </Card.Body>
      </Card>

      {task && !task.completed && (
        <div className="mt-4 text-center">
          <Button variant="success" className="rounded-pill fw-bold" onClick={finishTask}>
            <i className="bi bi-check-circle me-2"></i> Concluir Bloco de Tempo
          </Button>
        </div>
      )}

    </div>
  );
}
