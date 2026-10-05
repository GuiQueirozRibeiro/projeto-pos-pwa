import { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getTodayDateString } from "../utils/dateHelpers.js";
import { subscribeTasksByDate, addTask, setTaskCompleted, deleteTask } from "../services/taskService.js";
import TaskCard from "../components/TaskCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Hoje() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("trabalho");
  const [startTime, setStartTime] = useState("09:00");
  const [durationMinutes, setDurationMinutes] = useState(25);

  const today = getTodayDateString();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeTasksByDate(
      user.uid,
      today,
      (data) => {
        setTasks(data);
        setLoading(false);
      },
      (err) => {
        setError("Erro ao carregar os blocos de tempo.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user, today]);

  async function handleAddTask(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await addTask(user.uid, {
        title,
        category,
        date: today,
        startTime,
        durationMinutes: Number(durationMinutes)
      });
      setShowModal(false);
      // Reset form
      setTitle("");
      setStartTime("09:00");
      setDurationMinutes(25);
      
      // Feedback visual (UX)
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar bloco. Verifique os dados.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleCompleted(taskId, completed) {
    try {
      await setTaskCompleted(taskId, completed);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o status.");
    }
  }

  async function handleDelete(taskId) {
    if (confirm("Tem certeza que deseja excluir este bloco?")) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir.");
      }
    }
  }

  function handleFocus(task) {
    // Fase 3: Navegar para o timer enviando o id da task
    navigate(`/foco?taskId=${task.id}`);
  }

  // Estatísticas do dia
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-1">Hoje</h2>
          <p className="text-muted mb-0">
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())}
          </p>
        </div>
        <Button variant="primary" className="rounded-pill px-3 shadow-sm fw-bold" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> Bloco
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {totalCount > 0 && (
            <div className="mb-4 bg-body-tertiary p-3 rounded-4 shadow-sm border-0 d-flex align-items-center">
              <div className="me-3">
                <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: `conic-gradient(var(--bs-primary) ${progress}%, var(--bs-secondary-bg) 0)` }} className="d-flex align-items-center justify-content-center">
                  <div className="bg-body-tertiary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                    <span className="small fw-bold">{progress}%</span>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="fw-bold mb-0">Progresso do dia</h6>
                <p className="text-muted small mb-0">{completedCount} de {totalCount} blocos concluídos</p>
              </div>
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-calendar-x fs-1 mb-3 d-block"></i>
              <h5>Nenhum bloco de tempo hoje.</h5>
              <p>Adicione um novo bloco para começar a se organizar.</p>
            </div>
          ) : (
            <div className="pb-4">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggleCompleted={handleToggleCompleted}
                  onDelete={handleDelete}
                  onFocus={handleFocus}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal Novo Bloco */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Novo Bloco de Tempo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTask}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">O que você vai fazer?</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: Estudar React" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                maxLength={120}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Categoria</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="trabalho">Trabalho</option>
                <option value="estudo">Estudo</option>
                <option value="saude">Saúde</option>
                <option value="pessoal">Pessoal</option>
              </Form.Select>
            </Form.Group>

            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold">Horário de Início</Form.Label>
                  <Form.Control 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold">Duração (min)</Form.Label>
                  <Form.Control 
                    type="number" 
                    min="5" 
                    max="720"
                    step="5"
                    value={durationMinutes} 
                    onChange={(e) => setDurationMinutes(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 rounded-pill fw-bold py-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Bloco"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Feedback Visual de Sucesso */}
      <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 9999, position: 'fixed', bottom: '70px' }}>
        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide bg="success">
          <Toast.Body className="text-white fw-bold">
            <i className="bi bi-check-circle me-2"></i> Bloco salvo com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
