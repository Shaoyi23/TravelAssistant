import type { AgentTask } from "../store/tripStore";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";

interface TaskProgressProps {
  tasks: AgentTask[];
}

function TaskProgress({ tasks }: TaskProgressProps) {
  // 根据任务状态返回不同的样式类
  const getStatusVariant = (status: AgentTask["status"]) => {
    switch (status) {
      case "pending":
        return "secondary" as const;
      case "in_progress":
        return "default" as const;
      case "completed":
        return "default" as const;
      case "failed":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  // 根据任务状态返回不同的图标
  const getStatusIcon = (status: AgentTask["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      case "in_progress":
        return <Loader2 className="w-5 h-5 animate-spin text-primary" />;
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: AgentTask["status"]) => {
    switch (status) {
      case "pending":
        return "待执行";
      case "in_progress":
        return "执行中";
      case "completed":
        return "已完成";
      case "failed":
        return "执行失败";
      default:
        return "";
    }
  };

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-4">暂无任务数据</div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className="transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{getStatusIcon(task.status)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {task.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              </div>
              <Badge variant={getStatusVariant(task.status)}>
                {getStatusText(task.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TaskProgress;
