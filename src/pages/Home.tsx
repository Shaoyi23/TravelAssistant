import React, { useState } from "react";
import TripForm from "../components/TripForm";
import TaskProgress from "../components/TaskProgress";
import ConversationHistory from "../components/ConversationHistory";
import TripPlanDocument from "../components/TripPlanDocument";
import useTripStore from "../store/tripStore";
import {
  generateTripPlan as generateTripPlanAI,
  getAIResponse,
} from "../utils/aiService";
import { Card, CardContent } from "./../components/ui/card";
import { Input } from "./../components/ui/input";
import { Button } from "./../components/ui/button";
import { Send, Sparkles } from "lucide-react";
import type { TripRequirements } from "../store/tripStore";

function Home() {
  const [isPlanning, setIsPlanning] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const {
    conversationHistory,
    agentTasks,
    setAgentTasks,
    addConversation,
    setTripPlan,
    tripPlan,
  } = useTripStore();

  // 模拟AI Agent任务分解
  const handleTripSubmit = (requirements: TripRequirements) => {
    setIsPlanning(true);

    // 添加用户对话记录
    addConversation({
      message: `我想去${requirements.destination}旅行，预算${requirements.budget}元，${
        requirements.days
      }天，兴趣包括${requirements.interests.join("、")}`,
      isUser: true,
    });

    // AI Agent分解任务
    const tasks = [
      {
        id: 1,
        name: "查询目的地天气",
        status: "pending" as const,
        description: `查询${requirements.destination}未来${requirements.days}天的天气情况`,
      },
      {
        id: 2,
        name: "搜索景点",
        status: "pending" as const,
        description: `根据兴趣${requirements.interests.join("、")}搜索${
          requirements.destination
        }的热门景点`,
      },
      {
        id: 3,
        name: "规划路线",
        status: "pending" as const,
        description: `根据天数${requirements.days}和景点分布规划合理的旅行路线`,
      },
      {
        id: 4,
        name: "推荐酒店",
        status: "pending" as const,
        description: `根据预算${requirements.budget}推荐${requirements.destination}的合适酒店`,
      },
      {
        id: 5,
        name: "生成旅行计划",
        status: "pending" as const,
        description: `整合所有信息生成完整的旅行计划文档`,
      },
    ];

    setAgentTasks(tasks);

    // 模拟任务执行过程
    simulateTaskExecution(tasks, requirements);
  };

  // 模拟任务执行
  const simulateTaskExecution = (tasks: typeof agentTasks, requirements: TripRequirements) => {
    let taskIndex = 0;

    const executeNextTask = async () => {
      if (taskIndex < tasks.length) {
        const currentTask = tasks[taskIndex];

        // 更新任务状态为进行中
        setAgentTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === currentTask.id
              ? { ...task, status: "in_progress" }
              : task
          )
        );

        // 添加AI处理中消息
        addConversation(`正在${currentTask.description}...`);

        // 模拟任务执行时间
        setTimeout(() => {
          // 更新任务状态为完成
          setAgentTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === currentTask.id
                ? { ...task, status: "completed" }
                : task
            )
          );

          // 添加任务完成消息
          addConversation(`${currentTask.name}已完成！`);

          taskIndex++;
          executeNextTask();
        }, 1500);
      } else {
        // 所有任务完成，生成旅行计划
        await generateTripPlan(requirements);
        setIsPlanning(false);
      }
    };

    executeNextTask();
  };

  // 生成旅行计划
  const generateTripPlan = async (requirements: TripRequirements) => {
    try {
      // 添加AI处理中消息
      addConversation("正在为您生成详细的旅行计划...");

      // 使用真实AI生成旅行计划
      const plan = await generateTripPlanAI(requirements);

      setTripPlan(plan);

      // 添加计划完成消息
      addConversation(
        `旅行计划已生成完成！我们为您准备了详细的行程安排。`
      );
    } catch (error: any) {
      console.error("生成旅行计划失败:", error);
      addConversation(`生成旅行计划时发生错误: ${error.message}`);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !tripPlan) return;

    const userMessage = newMessage;
    setNewMessage("");

    // 添加用户消息
    addConversation({
      message: userMessage,
      isUser: true,
    });

    // 使用真实AI获取回复
    try {
      const aiResponse = await getAIResponse(userMessage, tripPlan);
      addConversation({
        message: aiResponse,
        isUser: false,
      });
    } catch (error: any) {
      console.error("获取AI回复失败:", error);
      addConversation({
        message: `获取AI回复时发生错误: ${error.message}`,
        isUser: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              AI旅行规划助手
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            输入您的旅行需求，让AI为您规划完美的旅程
          </p>
        </div>

        {/* 旅行表单 */}
        <TripForm onSubmit={handleTripSubmit} />

        {/* 任务进度 */}
        {isPlanning && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xl font-semibold">AI正在为您规划旅程...</h3>
              </div>
              <TaskProgress tasks={agentTasks} />
            </CardContent>
          </Card>
        )}

        {/* 旅行计划和对话 */}
        {tripPlan && (
          <div className="space-y-6">
            {/* 对话历史 */}
            <div className="space-y-4">
              <ConversationHistory conversationHistory={conversationHistory} />

              {/* 消息输入框 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="输入您的问题或建议..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 旅行计划文档 */}
            <TripPlanDocument tripPlan={tripPlan} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
