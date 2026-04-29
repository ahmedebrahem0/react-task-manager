import TaskList from './features/tasks/components/TaskList';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50" role="main">
      <header className="w-full bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <h1 className="text-xl font-bold text-slate-800">
            Task Manager
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage your tasks efficiently
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  );
};

export default App;