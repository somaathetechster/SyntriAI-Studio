export type ActiveTab = "arch" | "tasks" | "api" | "files";

export type Architecture = {
  project: string;
  features: string[];
  files: { path: string; role: string }[];
  fallback?: boolean;
};

export type TasksResult = {
  intent: string;
  features: string[];
  tasks: string[];
};

export type ApiResult = {
  features: string[];
  endpoints: { method: string; path: string; description: string }[];
};

export type FileStub = {
  path: string;
  role: string;
  content: string;
};

export type FilesResult = {
  project: string;
  generated_files: FileStub[];
};
