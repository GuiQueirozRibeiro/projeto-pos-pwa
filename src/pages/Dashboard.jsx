import { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { subscribeAllTasks } from "../services/taskService.js";
import { formatMinutes } from "../utils/dateHelpers.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const categoryColors = {
  trabalho: "var(--bs-primary)",
  estudo: "var(--bs-info)",
  saude: "var(--bs-success)",
  pessoal: "var(--bs-warning)",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeAllTasks(
      user.uid,
      (data) => {
        setTasks(data);
        setLoading(false);
      },
      (err) => {
        console.error("Erro dashboard:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // 1. Cálculos Gerais
  const totalPomodoros = tasks.reduce((acc, t) => acc + (t.pomodoros || 0), 0);
  const totalFocusSeconds = tasks.reduce((acc, t) => acc + (t.focusSeconds || 0), 0);
  const totalFocusMinutes = Math.floor(totalFocusSeconds / 60);

  // 2. Gráfico por Categoria
  const categoryCount = {
    trabalho: 0,
    estudo: 0,
    saude: 0,
    pessoal: 0,
  };

  tasks.forEach((t) => {
    if (t.pomodoros > 0 && categoryCount[t.category] !== undefined) {
      categoryCount[t.category] += t.pomodoros;
    }
  });

  const categoryData = Object.keys(categoryCount).map((cat) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    key: cat,
    pomodoros: categoryCount[cat],
  }));

  // 3. Gráfico de Produtividade (Últimos 7 dias)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const label = d.toLocaleDateString("pt-BR", { weekday: 'short' });
    return { dateStr, label, pomodoros: 0 };
  });

  tasks.forEach((t) => {
    const dayObj = last7Days.find(d => d.dateStr === t.date);
    if (dayObj && t.pomodoros > 0) {
      dayObj.pomodoros += t.pomodoros;
    }
  });

  return (
    <div>
      <h2 className="fw-bold mb-4">Dashboard</h2>

      <Row className="g-3 mb-4">
        <Col xs={6}>
          <Card className="border-0 shadow-sm rounded-4 bg-primary text-white h-100">
            <Card.Body className="p-3">
              <i className="bi bi-play-circle-fill fs-4 mb-2 d-block opacity-75"></i>
              <h3 className="fw-bold mb-0">{totalPomodoros}</h3>
              <p className="mb-0 small opacity-75">Pomodoros concluídos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card className="border-0 shadow-sm rounded-4 bg-info text-white h-100">
            <Card.Body className="p-3">
              <i className="bi bi-clock-fill fs-4 mb-2 d-block opacity-75"></i>
              <h3 className="fw-bold mb-0">{formatMinutes(totalFocusMinutes)}</h3>
              <p className="mb-0 small opacity-75">Tempo total de foco</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-4">Foco por Categoria</h5>
          <div style={{ height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="var(--bs-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="pomodoros" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.key]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-4">Últimos 7 dias</h5>
          <div style={{ height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <XAxis dataKey="label" stroke="var(--bs-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="pomodoros" fill="var(--bs-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
