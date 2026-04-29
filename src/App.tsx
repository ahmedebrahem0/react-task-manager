import { Suspense, lazy } from 'react';

const TaskList = lazy(() => import('./features/tasks/components/TaskList'));

const TaskListFallback = () => (
  <div
    className="flex flex-col gap-6"
    aria-label="Loading task manager"
    aria-busy="true"
  >
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-20 rounded-2xl border border-slate-200 bg-white shadow-sm"
        />
      ))}
    </div>
    <div className="h-40 rounded-2xl border border-slate-200 bg-white shadow-sm" />
    <div className="flex gap-2">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="h-9 w-20 rounded-full border border-slate-200 bg-white"
        />
      ))}
    </div>
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-20 rounded-2xl border border-slate-200 bg-white shadow-sm"
        />
      ))}
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50" role="main">
      <header className="w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <h1 className="text-xl font-bold text-slate-800">
            Task Manager
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your tasks efficiently
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Suspense fallback={<TaskListFallback />}>
          <TaskList />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
