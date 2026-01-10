import React from "react";
import { useForm } from "react-hook-form";
import useTripStore from "../store/tripStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const availableInterests = [
  "自然景观",
  "历史文化",
  "美食",
  "购物",
  "冒险活动",
  "艺术",
  "音乐",
  "体育",
  "温泉",
  "摄影",
  "当地体验",
];

interface TripFormData {
  destination: string;
  budget: number;
  days: number;
  interests: string[];
}

interface TripFormProps {
  onSubmit: (requirements: TripFormData) => void;
}

function TripForm({ onSubmit }: TripFormProps) {
  const { tripRequirements, updateTripRequirements, setInterests } =
    useTripStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TripFormData>({
    defaultValues: tripRequirements,
  });

  // 监听兴趣变化
  const selectedInterests = watch("interests", []);

  // 处理兴趣选择
  const handleInterestToggle = (interest: string) => {
    let newInterests: string[];
    if (selectedInterests.includes(interest)) {
      newInterests = selectedInterests.filter((item) => item !== interest);
    } else {
      newInterests = [...selectedInterests, interest];
    }
    setValue("interests", newInterests);
    setInterests(newInterests);
  };

  // 提交表单
  const onFormSubmit = (data: TripFormData) => {
    updateTripRequirements(data);
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">请输入您的旅行需求</CardTitle>
        <CardDescription>
          填写以下信息，AI将为您生成个性化的旅行计划
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* 目的地 */}
          <div className="space-y-2">
            <Label htmlFor="destination">
              目的地 <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("destination", { required: "请输入目的地" })}
              type="text"
              id="destination"
              placeholder="请输入您想去的目的地"
              className={errors.destination ? "border-destructive" : ""}
            />
            {errors.destination && (
              <p className="text-sm text-destructive">{errors.destination.message}</p>
            )}
          </div>

          {/* 预算 */}
          <div className="space-y-2">
            <Label htmlFor="budget">
              预算 (元) <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("budget", {
                required: "请输入预算",
                min: { value: 1000, message: "预算不能低于1000元" },
                valueAsNumber: true,
              })}
              type="number"
              id="budget"
              placeholder="请输入您的预算"
              className={errors.budget ? "border-destructive" : ""}
            />
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget.message}</p>
            )}
          </div>

          {/* 天数 */}
          <div className="space-y-2">
            <Label htmlFor="days">
              旅行天数 <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("days", {
                required: "请输入旅行天数",
                min: { value: 1, message: "天数不能少于1天" },
                max: { value: 30, message: "天数不能超过30天" },
                valueAsNumber: true,
              })}
              type="number"
              id="days"
              placeholder="请输入旅行天数"
              className={errors.days ? "border-destructive" : ""}
            />
            {errors.days && (
              <p className="text-sm text-destructive">{errors.days.message}</p>
            )}
          </div>

          {/* 兴趣爱好 */}
          <div className="space-y-3">
            <Label>
              兴趣爱好 (可多选) <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-3">
              {availableInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/80 transition-colors"
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            {errors.interests && (
              <p className="text-sm text-destructive">请至少选择一个兴趣爱好</p>
            )}
          </div>

          {/* 提交按钮 */}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              生成旅行计划
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TripForm;
