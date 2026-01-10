import OpenAI from "openai";
import type { TripRequirements, TripPlan, PlanDetails } from "../store/tripStore";

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // 从环境变量获取API密钥
  dangerouslyAllowBrowser: true, // 允许在浏览器环境中使用
});

// 生成旅行计划
export const generateTripPlan = async (requirements: TripRequirements): Promise<TripPlan> => {
  const { destination, budget, days, interests } = requirements;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "你是一位专业的旅行规划师，请根据用户的需求生成详细的旅行计划。",
        },
        {
          role: "user",
          content: `请为我生成一个${days}天的${destination}旅行计划，预算${budget}元。我的兴趣包括${interests.join(
            "、"
          )}。请包含以下内容：
1. 天气情况
2. 推荐景点
3. 详细行程安排
4. 住宿建议
5. 旅行小贴士

请使用JSON格式输出，包含以下字段：weather, attractions, itinerary, accommodation, tips`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const planDetails = JSON.parse(response.choices[0].message.content || "{}") as PlanDetails;

    return {
      destination,
      budget,
      days,
      interests,
      createdDate: new Date().toISOString(),
      planDetails,
    };
  } catch (error: any) {
    console.error("生成旅行计划失败:", error);

    // 处理不同类型的错误
    if (error.status === 429) {
      throw new Error(
        "API请求频率过高，请稍后再试。如果问题持续，请检查OpenAI账户的配额和账单状态。"
      );
    } else if (error.status === 401) {
      throw new Error("API密钥无效或已过期，请检查环境变量中的密钥配置。");
    } else if (error.status === 403) {
      throw new Error("没有API访问权限，请检查账户状态和权限设置。");
    } else if (error.status === 404) {
      throw new Error("请求的API资源不存在，请检查模型名称是否正确。");
    } else if (error.status >= 500) {
      throw new Error("OpenAI服务器错误，请稍后再试。");
    } else {
      throw new Error(
        "生成旅行计划失败，请稍后再试。" +
          (error.message ? `错误详情：${error.message}` : "")
      );
    }
  }
};

// 获取AI对用户问题的回复
export const getAIResponse = async (message: string, tripPlan: TripPlan): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "你是一位专业的旅行规划师，根据提供的旅行计划回答用户的问题。",
        },
        {
          role: "user",
          content: `这是我的旅行计划：${JSON.stringify(
            tripPlan
          )}\n\n用户的问题：${message}\n\n请提供友好、专业的回答。`,
        },
      ],
    });

    return response.choices[0].message.content || "抱歉，我无法生成回复。";
  } catch (error: any) {
    console.error("获取AI回复失败:", error);

    // 处理不同类型的错误
    if (error.status === 429) {
      throw new Error(
        "API请求频率过高，请稍后再试。如果问题持续，请检查OpenAI账户的配额和账单状态。"
      );
    } else if (error.status === 401) {
      throw new Error("API密钥无效或已过期，请检查环境变量中的密钥配置。");
    } else if (error.status === 403) {
      throw new Error("没有API访问权限，请检查账户状态和权限设置。");
    } else if (error.status === 404) {
      throw new Error("请求的API资源不存在，请检查模型名称是否正确。");
    } else if (error.status >= 500) {
      throw new Error("OpenAI服务器错误，请稍后再试。");
    } else {
      throw new Error(
        "获取AI回复失败，请稍后再试。" +
          (error.message ? `错误详情：${error.message}` : "")
      );
    }
  }
};
