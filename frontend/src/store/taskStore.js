"use client";

import { create } from "zustand";
import { unwrapList } from "@/lib/utils";
import { taskService } from "@/services/taskService";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  activeTask: null,
  labels: [],
  loading: false,
  filters: { search: "", ordering: "-created_at" },
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  fetchTasks: async (params = {}) => {
    set({ loading: true });
    const { data } = await taskService.list({ ...get().filters, ...params });
    const tasks = unwrapList(data);
    set({ tasks, loading: false });
    return tasks;
  },
  fetchTask: async (id) => {
    const { data } = await taskService.retrieve(id);
    set({ activeTask: data });
    return data;
  },
  createTask: async (payload) => {
    const { data } = await taskService.create(payload);
    set({ tasks: [data, ...get().tasks] });
    return data;
  },
  updateTask: async (id, payload) => {
    const { data } = await taskService.update(id, payload);
    set({ tasks: get().tasks.map((task) => (task.id === id ? data : task)), activeTask: data });
    return data;
  },
  archiveTask: async (id) => {
    const { data } = await taskService.archive(id);
    set({ tasks: get().tasks.map((task) => (task.id === id ? data : task)) });
    return data;
  },
  fetchLabels: async () => {
    const { data } = await taskService.labels();
    const labels = unwrapList(data);
    set({ labels });
    return labels;
  },
}));
