import OpenAI from "openai";
import type {
  TripRequirements,
  TripPlan,
  PlanDetails,
} from "../store/tripStore";

// AI提供商类型
type AIProvider = "groq" | "deepseek" | "openai";

// 获取AI提供商配置
const getAIConfig = () => {
  const provider = (
    import.meta.env.VITE_AI_PROVIDER || "groq"
  ).toLowerCase() as AIProvider;

  const configs: Record<
    AIProvider,
    { baseURL?: string; apiKey: string; model: string }
  > = {
    groq: {
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
      model: "llama-3.1-8b-instant",
    },
    deepseek: {
      baseURL: "https://api.deepseek.com/v1",
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "",
      model: "deepseek-chat",
    },
    openai: {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
      model: "gpt-4o-mini",
    },
  };

  const config = configs[provider];

  if (!config.apiKey) {
    throw new Error(
      `未配置 ${provider.toUpperCase()} API密钥。请在 .env 文件中设置相应的环境变量。\n` +
        `Groq: VITE_GROQ_API_KEY (免费获取: https://console.groq.com)\n` +
        `DeepSeek: VITE_DEEPSEEK_API_KEY (获取: https://platform.deepseek.com)\n` +
        `OpenAI: VITE_OPENAI_API_KEY`
    );
  }

  return { provider, config };
};

// 创建AI客户端实例
const createAIClient = () => {
  const { config } = getAIConfig();

  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    dangerouslyAllowBrowser: true,
  });
};

// 获取当前使用的模型
const getModel = () => {
  const { config } = getAIConfig();
  return config.model;
};

// 生成旅行计划
export const generateTripPlan = async (
  requirements: TripRequirements
): Promise<TripPlan> => {
  const { destination, budget, days, interests } = requirements;

  try {
    const client = createAIClient();
    const model = getModel();

    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "你是一位专业的旅行规划师，请根据用户的需求生成详细的旅行计划。请用中文回复。",
        },
        {
          role: "user",
          content: `请为我生成一个${days}天的${destination}旅行计划，预算${budget}元。我的兴趣包括${interests.join(
            "、"
          )}。请包含以下内容：
1. 天气情况
2. 推荐景点（至少3个）
3. 详细行程安排（每天的具体安排）
4. 住宿建议
5. 旅行小贴士（至少3条）

请使用JSON格式输出，确保返回有效的JSON，包含以下字段：
{
  "weather": "天气情况的详细描述",
  "attractions": ["景点1", "景点2", "景点3"],
  "itinerary": ["第1天的详细安排", "第2天的详细安排", ...],
  "accommodation": "住宿建议的详细描述",
  "tips": ["小贴士1", "小贴士2", "小贴士3"]
}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "{}";
    let planDetails: PlanDetails;

    try {
      const parsed = JSON.parse(content);

      // 处理attractions，确保格式统一
      let attractions = parsed.attractions || [];
      if (Array.isArray(attractions)) {
        // 如果attractions是对象数组，保持原样；如果是字符串数组，也保持原样
        attractions = attractions.map((attr: any) => {
          if (typeof attr === "string") {
            return attr;
          }
          // 如果是对象，确保有name字段
          if (typeof attr === "object" && attr !== null) {
            return {
              name: attr.name || attr.名称 || "",
              address: attr.address || attr.地址 || attr.说明 || "",
              description: attr.description || attr.说明 || attr.描述 || "",
            };
          }
          return String(attr);
        });
      }

      planDetails = {
        weather: parsed.weather || "建议查询当地天气预报获取最新天气信息",
        attractions: attractions,
        itinerary: Array.isArray(parsed.itinerary)
          ? parsed.itinerary.map((item: any) => String(item))
          : Array.from({ length: days }, (_, i) => `第${i + 1}天的行程安排`),
        accommodation:
          parsed.accommodation || "建议根据预算选择合适档次的酒店或民宿",
        tips: Array.isArray(parsed.tips)
          ? parsed.tips.map((tip: any) => String(tip))
          : ["提前预订酒店和景点门票", "准备常用药品", "注意当地风俗习惯"],
      } as PlanDetails;

      // 验证必需字段
      if (
        !planDetails.weather ||
        !planDetails.attractions ||
        planDetails.attractions.length === 0 ||
        !planDetails.itinerary ||
        planDetails.itinerary.length === 0 ||
        !planDetails.accommodation ||
        !planDetails.tips ||
        planDetails.tips.length === 0
      ) {
        throw new Error("返回的JSON缺少必需字段");
      }
    } catch (parseError) {
      console.error("JSON解析失败:", parseError, "原始内容:", content);
      // 如果JSON解析失败，尝试从文本中提取或使用默认值
      planDetails = {
        weather: "建议查询当地天气预报获取最新天气信息",
        attractions: ["推荐查询当地热门景点"],
        itinerary: Array.from(
          { length: days },
          (_, i) => `第${i + 1}天的行程安排`
        ),
        accommodation: "建议根据预算选择合适档次的酒店或民宿",
        tips: ["提前预订酒店和景点门票", "准备常用药品", "注意当地风俗习惯"],
      };
    }

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
        "API请求频率过高，请稍后再试。如果问题持续，请检查API账户的配额和限制。"
      );
    } else if (error.status === 401) {
      throw new Error("API密钥无效或已过期，请检查环境变量中的密钥配置。");
    } else if (error.status === 403) {
      throw new Error("没有API访问权限，请检查账户状态和权限设置。");
    } else if (error.status === 404) {
      throw new Error("请求的API资源不存在，请检查模型名称是否正确。");
    } else if (error.status >= 500) {
      throw new Error("AI服务服务器错误，请稍后再试。");
    } else {
      throw new Error(
        "生成旅行计划失败，请稍后再试。" +
          (error.message ? `错误详情：${error.message}` : "")
      );
    }
  }
};

// 获取AI对用户问题的回复
export const getAIResponse = async (
  message: string,
  tripPlan: TripPlan
): Promise<string> => {
  try {
    const client = createAIClient();
    const model = getModel();

    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "你是一位专业的旅行规划师，根据提供的旅行计划回答用户的问题。请用中文回复，回答要友好、专业、详细。",
        },
        {
          role: "user",
          content: `这是我的旅行计划：${JSON.stringify(
            tripPlan,
            null,
            2
          )}\n\n用户的问题：${message}\n\n请提供友好、专业的回答。`,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "抱歉，我无法生成回复。";
  } catch (error: any) {
    console.error("获取AI回复失败:", error);

    // 处理不同类型的错误
    if (error.status === 429) {
      throw new Error(
        "API请求频率过高，请稍后再试。如果问题持续，请检查API账户的配额和限制。"
      );
    } else if (error.status === 401) {
      throw new Error("API密钥无效或已过期，请检查环境变量中的密钥配置。");
    } else if (error.status === 403) {
      throw new Error("没有API访问权限，请检查账户状态和权限设置。");
    } else if (error.status === 404) {
      throw new Error("请求的API资源不存在，请检查模型名称是否正确。");
    } else if (error.status >= 500) {
      throw new Error("AI服务服务器错误，请稍后再试。");
    } else {
      throw new Error(
        "获取AI回复失败，请稍后再试。" +
          (error.message ? `错误详情：${error.message}` : "")
      );
    }
  }
};
