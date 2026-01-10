import { create } from 'zustand';

export interface TripRequirements {
  destination: string;
  budget: number;
  days: number;
  interests: string[];
}

export interface AgentTask {
  id: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  description: string;
}

export interface ConversationMessage {
  id?: string;
  message: string;
  isUser: boolean;
}

// 景点信息（支持字符串或对象格式）
export type Attraction = string | {
  name: string;
  address?: string;
  说明?: string;
  description?: string;
};

export interface PlanDetails {
  weather: string;
  attractions: Attraction[];
  itinerary: string[];
  accommodation: string;
  tips: string[];
}

export interface TripPlan {
  destination: string;
  budget: number;
  days: number;
  interests: string[];
  createdDate: string;
  planDetails: PlanDetails;
}

interface TripStore {
  tripRequirements: TripRequirements;
  updateTripRequirements: (requirements: Partial<TripRequirements>) => void;
  setInterests: (interests: string[]) => void;
  agentTasks: AgentTask[];
  setAgentTasks: (tasks: AgentTask[] | ((prev: AgentTask[]) => AgentTask[])) => void;
  updateTaskStatus: (taskId: number, status: AgentTask['status']) => void;
  conversationHistory: ConversationMessage[];
  addConversation: (message: ConversationMessage | string) => void;
  tripPlan: TripPlan | null;
  setTripPlan: (plan: TripPlan | null) => void;
  resetTrip: () => void;
}

const useTripStore = create<TripStore>((set) => ({
  tripRequirements: {
    destination: '',
    budget: 0,
    days: 0,
    interests: []
  },

  updateTripRequirements: (requirements) => set((state) => ({
    tripRequirements: { ...state.tripRequirements, ...requirements }
  })),

  setInterests: (interests) => set((state) => ({
    tripRequirements: { ...state.tripRequirements, interests }
  })),

  agentTasks: [],
  
  setAgentTasks: (tasks) => set((state) => ({
    agentTasks: typeof tasks === 'function' ? tasks(state.agentTasks) : tasks
  })),

  updateTaskStatus: (taskId, status) => set((state) => ({
    agentTasks: state.agentTasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    )
  })),

  conversationHistory: [],

  addConversation: (message) => set((state) => {
    // 生成唯一ID：时间戳 + 随机数 + 索引
    const generateUniqueId = () => {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${state.conversationHistory.length}`;
    };
    
    const newMessage: ConversationMessage = typeof message === 'string' 
      ? { id: generateUniqueId(), message, isUser: false }
      : { ...message, id: message.id || generateUniqueId() };
    return {
      conversationHistory: [...state.conversationHistory, newMessage]
    };
  }),

  tripPlan: null,

  setTripPlan: (plan) => set({ tripPlan: plan }),

  resetTrip: () => set({
    tripRequirements: {
      destination: '',
      budget: 0,
      days: 0,
      interests: []
    },
    agentTasks: [],
    conversationHistory: [],
    tripPlan: null
  })
}));

export default useTripStore;
