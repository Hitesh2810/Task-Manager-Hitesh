"use client";

import { create } from "zustand";
import { unwrapList } from "@/lib/utils";
import { workspaceService } from "@/services/workspaceService";

export const useWorkspaceStore = create((set, get) => ({
  workspaces: [],
  activeWorkspace: null,
  loading: false,
  fetchWorkspaces: async (params = {}) => {
    set({ loading: true });
    const { data } = await workspaceService.list(params);
    const workspaces = unwrapList(data);
    set({ workspaces, loading: false });
    return workspaces;
  },
  fetchWorkspace: async (id) => {
    const { data } = await workspaceService.retrieve(id);
    set({ activeWorkspace: data });
    return data;
  },
  createWorkspace: async (payload) => {
    const { data } = await workspaceService.create(payload);
    set({ workspaces: [data, ...get().workspaces] });
    return data;
  },
  updateWorkspace: async (id, payload) => {
    const { data } = await workspaceService.update(id, payload);
    set({ workspaces: get().workspaces.map((item) => (item.id === id ? data : item)), activeWorkspace: data });
    return data;
  },
  archiveWorkspace: async (id) => {
    const { data } = await workspaceService.archive(id);
    set({ workspaces: get().workspaces.map((item) => (item.id === id ? data : item)) });
    return data;
  },
}));
