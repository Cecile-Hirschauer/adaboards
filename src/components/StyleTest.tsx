import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const StyleTest = () => {
  return (
    <div className="container-page">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Test Typography */}
        <section>
          <h1 className="page-title mb-4">
            Test <span className="text-primary">Typography</span>
          </h1>
          <h2 className="section-title">Section Title</h2>
          <p className="greeting">
            Hello, <span className="greeting-name">Ada Lovelace</span>!
          </p>
        </section>

        {/* Test Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Couleurs Kanban</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 rounded flex items-center justify-center bg-todo">
              <span className="text-sm font-bold text-gray-800">Todo (Jaune)</span>
            </div>
            <div className="h-20 rounded flex items-center justify-center bg-doing">
              <span className="text-sm font-bold text-gray-800">Doing (Cyan)</span>
            </div>
            <div className="h-20 rounded flex items-center justify-center bg-done">
              <span className="text-sm font-bold text-gray-800">Done (Vert)</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Badges</h3>
          <div className="flex gap-3 flex-wrap">
            <span className="badge badge-todo">Todo</span>
            <span className="badge badge-doing">Doing</span>
            <span className="badge badge-done">Done</span>
            <span className="badge badge-error">Error</span>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3">Couleurs Sémantiques</h3>
          <div className="grid grid-cols-3 gap-4">
            <div
              className="h-20 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--clr-primary)" }}
            >
              <span className="text-sm font-bold text-gray-800">Primary</span>
            </div>
            <div
              className="h-20 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--clr-error)" }}
            >
              <span className="text-sm font-bold text-white">Error</span>
            </div>
            <div
              className="h-20 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--clr-success)" }}
            >
              <span className="text-sm font-bold text-gray-800">Success</span>
            </div>
          </div>
        </section>

        {/* Test Buttons (shadcn) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Buttons (shadcn/ui)</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        {/* Test Input */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Input</h2>
          <Input placeholder="Test input..." className="max-w-md" />
        </section>

        {/* Test Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Cards</h2>

          {/* Card shadcn/ui */}
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Card Title (shadcn)</CardTitle>
              <CardDescription>This is a card description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
          </Card>

          {/* Custom board card */}
          <div className="board-card max-w-md">
            <h3 className="text-xl font-bold mb-2">Board Card (Custom)</h3>
            <p className="text-gray-300">
              Custom styled board card with hover effect
            </p>
          </div>

          {/* Custom task cards with colors */}
          <h3 className="text-xl font-bold mt-6 mb-3">Task Cards (Kanban)</h3>
          <div className="task-card task-card-todo max-w-md">
            <h4 className="font-semibold mb-1">Task Todo</h4>
            <p className="text-sm text-muted">Avec bordure jaune à gauche</p>
          </div>
          <div className="task-card task-card-doing max-w-md">
            <h4 className="font-semibold mb-1">Task Doing</h4>
            <p className="text-sm text-muted">Avec bordure cyan à gauche</p>
          </div>
          <div className="task-card task-card-done max-w-md">
            <h4 className="font-semibold mb-1">Task Done</h4>
            <p className="text-sm text-muted">Avec bordure verte à gauche</p>
          </div>
        </section>

        {/* Test Feature Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Feature Title</h3>
              <p className="feature-description">
                This is a feature card description with some text.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
