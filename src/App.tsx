import TaskForm from './features/tasks/components/TaskForm';
import TaskList from './features/tasks/components/TaskList';
import { Layout } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <header className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Layout className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Task Manager</h1>
            <p className="text-slate-500 text-sm">Efficiently manage your daily workflow</p>
          </div>
        </header>

        <main className="space-y-6">
          {/* مكون إضافة مهمة جديدة */}
          <section>
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Add New Task</h2>
            <TaskForm />
          </section>

          {/* مكون عرض وقائمة المهام */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Your Tasks</h2>
              {/* هنا ممكن نضيف الفلتر لاحقاً */}
            </div>
            <TaskList />
          </section>
        </main>

        <footer className="mt-12 text-center text-slate-400 text-xs">
          React Task Manager • Built with React 19 & Redux Toolkit
        </footer>
      </div>
    </div>
  );
}

export default App;