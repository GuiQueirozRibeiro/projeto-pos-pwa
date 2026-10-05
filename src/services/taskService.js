import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const tasksCollection = collection(db, "tasks");

/**
 * Assina as tasks de um usuário para um dia específico.
 * @param {string} uid ID do usuário
 * @param {string} date Data no formato "YYYY-MM-DD"
 * @param {function} onChange Callback executado com a lista de tasks
 * @param {function} onError Callback de erro
 */
export function subscribeTasksByDate(uid, date, onChange, onError) {
  const q = query(
    tasksCollection,
    where("uid", "==", uid),
    where("date", "==", date),
    orderBy("startTime", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(tasks);
    },
    (err) => {
      console.error("[taskService] erro ao assinar tasks:", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Assina todas as tasks de um usuário (para gráficos e histórico).
 */
export function subscribeAllTasks(uid, onChange, onError) {
  const q = query(
    tasksCollection,
    where("uid", "==", uid)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(tasks);
    },
    (err) => {
      console.error("[taskService] erro ao assinar todas as tasks:", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Adiciona um novo bloco de tempo (task).
 */
export async function addTask(uid, { title, category, date, startTime, durationMinutes }) {
  await addDoc(tasksCollection, {
    uid,
    title,
    category,
    date,
    startTime,
    durationMinutes: Number(durationMinutes),
    completed: false,
    completedAt: null,
    focusSeconds: 0,
    pomodoros: 0,
    createdAt: serverTimestamp(),
  });
}

/**
 * Marca como concluída ou desfeita.
 */
export async function setTaskCompleted(taskId, completed) {
  await updateDoc(doc(db, "tasks", taskId), {
    completed,
    completedAt: completed ? serverTimestamp() : null,
  });
}

/**
 * Deleta a task.
 */
export async function deleteTask(taskId) {
  await deleteDoc(doc(db, "tasks", taskId));
}

/**
 * Atualiza campos de foco (incremento após pomodoro).
 */
export async function updateTaskFocus(taskId, focusSeconds, pomodoros) {
  await updateDoc(doc(db, "tasks", taskId), {
    focusSeconds,
    pomodoros,
  });
}
