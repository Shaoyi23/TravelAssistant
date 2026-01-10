import { useState } from "react";
import {
  Bell,
  Globe,
  Lock,
  User,
  CreditCard,
  Shield,
  Moon,
  Smartphone,
  Mail,
} from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    travelUpdates: true,
    newsletter: true,
    darkMode: false,
    language: "zh-CN",
    currency: "CNY",
    twoFactor: false,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const settingsSections = [
    {
      title: "账户设置",
      icon: User,
      items: [
        {
          id: "profile",
          label: "个人信息",
          description: "修改用户名、邮箱和个人简介",
          type: "link",
        },
        {
          id: "password",
          label: "修改密码",
          description: "定期更新密码以保护账户安全",
          type: "link",
          icon: Lock,
        },
        {
          id: "twoFactor",
          label: "双因素认证",
          description: "启用后需要验证码才能登录",
          type: "toggle",
          value: settings.twoFactor,
          icon: Shield,
        },
      ],
    },
    {
      title: "通知设置",
      icon: Bell,
      items: [
        {
          id: "emailNotifications",
          label: "邮件通知",
          description: "接收重要更新和提醒邮件",
          type: "toggle",
          value: settings.emailNotifications,
          icon: Mail,
        },
        {
          id: "pushNotifications",
          label: "推送通知",
          description: "接收实时推送消息",
          type: "toggle",
          value: settings.pushNotifications,
          icon: Smartphone,
        },
        {
          id: "travelUpdates",
          label: "旅行动态",
          description: "关注的目的地价格变动提醒",
          type: "toggle",
          value: settings.travelUpdates,
        },
        {
          id: "newsletter",
          label: "订阅资讯",
          description: "每周旅行灵感和优惠信息",
          type: "toggle",
          value: settings.newsletter,
        },
      ],
    },
    {
      title: "偏好设置",
      icon: Globe,
      items: [
        {
          id: "language",
          label: "语言",
          description: "选择界面显示语言",
          type: "select",
          value: settings.language,
          options: [
            { value: "zh-CN", label: "简体中文" },
            { value: "zh-TW", label: "繁體中文" },
            { value: "en", label: "English" },
            { value: "ja", label: "日本語" },
          ],
        },
        {
          id: "currency",
          label: "货币",
          description: "价格显示的默认货币",
          type: "select",
          value: settings.currency,
          options: [
            { value: "CNY", label: "人民币 (¥)" },
            { value: "USD", label: "美元 ($)" },
            { value: "EUR", label: "欧元 (€)" },
            { value: "JPY", label: "日元 (¥)" },
          ],
        },
        {
          id: "darkMode",
          label: "深色模式",
          description: "启用深色主题以保护视力",
          type: "toggle",
          value: settings.darkMode,
          icon: Moon,
        },
      ],
    },
    {
      title: "支付设置",
      icon: CreditCard,
      items: [
        {
          id: "paymentMethods",
          label: "支付方式",
          description: "管理已保存的支付方式",
          type: "link",
        },
        {
          id: "billingHistory",
          label: "账单历史",
          description: "查看历史订单和发票",
          type: "link",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl text-gray-900 mb-4">设置</h1>
        <p className="text-lg text-gray-600">管理您的账户设置和偏好</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingsSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={sectionIndex}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <SectionIcon className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg text-gray-900">{section.title}</h2>
                </div>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={itemIndex}
                      className="px-6 py-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {ItemIcon && (
                            <div className="mt-1">
                              <ItemIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-gray-900 mb-1">{item.label}</h3>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        {item.type === "toggle" && (
                          <button
                            onClick={() => handleToggle(item.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}

                        {/* Select Dropdown */}
                        {item.type === "select" && item.options && (
                          <select
                            value={item.value}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {item.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Link */}
                        {item.type === "link" && (
                          <button className="text-blue-600 hover:text-blue-700 transition-colors">
                            编辑 →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border-2 border-red-200 overflow-hidden">
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <h2 className="text-lg text-red-900">危险操作</h2>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-1">删除账户</h3>
              <p className="text-sm text-gray-500">
                永久删除您的账户和所有数据，此操作不可恢复
              </p>
            </div>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              删除账户
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end gap-4">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          取消
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
          保存更改
        </button>
      </div>
    </div>
  );
}
