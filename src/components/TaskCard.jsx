import { Card, Form, Button } from "react-bootstrap";
import { formatMinutes } from "../utils/dateHelpers.js";

const categoryIcons = {
  trabalho: "bi-briefcase",
  estudo: "bi-book",
  saude: "bi-heart-pulse",
  pessoal: "bi-person",
};

export default function TaskCard({ task, onToggleCompleted, onDelete, onFocus }) {
  const icon = categoryIcons[task.category] || "bi-circle";

  return (
    <Card className="shadow-sm border-0 mb-3 rounded-4">
      <Card.Body className="d-flex align-items-center p-3">
        {/* Checkbox */}
        <div className="me-3">
          <Form.Check 
            type="checkbox"
            className="fs-4 m-0"
            checked={task.completed}
            aria-label={`Marcar ${task.title} como ${task.completed ? "pendente" : "concluída"}`}
            onChange={(e) => onToggleCompleted(task.id, e.target.checked)}
          />
        </div>

        {/* Informações da Tarefa */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h4 className={`h5 mb-0 fw-bold ${task.completed ? "text-decoration-line-through text-body-secondary" : ""}`}>
              {task.title}
            </h4>
            <span className="badge bg-body-secondary text-body border ms-2">
              <i className="bi bi-clock me-1"></i> {task.startTime}
            </span>
          </div>
          
          <div className="d-flex align-items-center text-body-secondary small mt-2">
            <span className={`cat-${task.category} fw-semibold me-3 d-flex align-items-center`}>
              <i className={`bi ${icon} me-1`}></i>
              <span className="text-capitalize">{task.category}</span>
            </span>
            <span className="me-3">
              <i className="bi bi-hourglass-split me-1"></i>
              {formatMinutes(task.durationMinutes)}
            </span>
            {task.pomodoros > 0 && (
              <span>
                <i className="bi bi-play-circle-fill text-danger me-1"></i>
                {task.pomodoros} pomo(s)
              </span>
            )}
          </div>
        </div>

        {/* Ações (Apenas se não estiver concluída) */}
        {!task.completed && (
          <div className="ms-3 d-flex flex-column gap-2">
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: "38px", height: "38px" }}
              title="Focar (Pomodoro)"
              onClick={() => onFocus(task)}
            >
              <i className="bi bi-play-fill fs-5"></i>
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              className="rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
              style={{ width: "38px", height: "38px" }}
              title="Excluir"
              onClick={() => onDelete(task.id)}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
