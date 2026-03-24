import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProjectForm } from "@/components/projects/create-project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-slide-up">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">פרויקט חדש</h1>
        <p className="text-sm text-muted-foreground">צור פרויקט חדש לאיסוף קבלות</p>
      </div>
      <Card className="border-0 surface rounded-2xl">
        <CardHeader>
          <CardTitle>פרטי הפרויקט</CardTitle>
          <CardDescription>
            בחר שם ואת השדות שתרצה לעקוב אחריהם עבור כל קבלה
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
