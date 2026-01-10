import React from 'react';
import type { TripPlan, Attraction } from '../store/tripStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, MapPin, Calendar, DollarSign, Heart, Cloud, Building2, Lightbulb } from 'lucide-react';
import { Separator } from './ui/separator';

interface TripPlanDocumentProps {
  tripPlan: TripPlan;
}

function TripPlanDocument({ tripPlan }: TripPlanDocumentProps) {
  if (!tripPlan) return null;

  // 格式化旅行计划为文本
  const formatPlanAsText = () => {
    const { destination, budget, days, interests, planDetails } = tripPlan;
    let text = `旅行计划\n`;
    text += `目的地: ${destination}\n`;
    text += `预算: ${budget}元\n`;
    text += `天数: ${days}天\n`;
    text += `兴趣: ${interests.join('、')}\n\n`;
    
    text += `天气情况：\n${planDetails.weather}\n\n`;
    
    text += `推荐景点：\n`;
    planDetails.attractions.forEach((attraction, index) => {
      if (typeof attraction === 'string') {
        text += `${index + 1}. ${attraction}\n`;
      } else {
        const name = attraction.name || '';
        const address = attraction.address || attraction.说明 || '';
        const desc = attraction.description || attraction.说明 || '';
        text += `${index + 1}. ${name}${address ? ` (${address})` : ''}${desc ? ` - ${desc}` : ''}\n`;
      }
    });
    text += `\n`;
    
    text += `行程安排：\n`;
    planDetails.itinerary.forEach((day, index) => {
      text += `第${index + 1}天：${day}\n`;
    });
    text += `\n`;
    
    text += `住宿推荐：\n${planDetails.accommodation}\n\n`;
    
    text += `旅行小贴士：\n`;
    planDetails.tips.forEach((tip, index) => {
      text += `${index + 1}. ${tip}\n`;
    });
    
    return text;
  };

  // 下载旅行计划
  const downloadPlan = () => {
    const text = formatPlanAsText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `旅行计划_${tripPlan.destination}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">旅行计划</CardTitle>
          <Button onClick={downloadPlan} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            下载计划
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">目的地</p>
              <p className="font-semibold">{tripPlan.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">预算</p>
              <p className="font-semibold">{tripPlan.budget}元</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">天数</p>
              <p className="font-semibold">{tripPlan.days}天</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">兴趣</p>
              <p className="font-semibold">{tripPlan.interests.join('、')}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 天气情况 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold">天气情况</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">{tripPlan.planDetails.weather}</p>
        </div>

        <Separator />

        {/* 推荐景点 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold">推荐景点</h4>
          </div>
          <ul className="space-y-3">
            {tripPlan.planDetails.attractions.map((attraction, index) => {
              const isObject = typeof attraction === 'object';
              const name = isObject ? attraction.name : attraction;
              const address = isObject ? (attraction.address || attraction.说明) : null;
              const description = isObject ? (attraction.description || attraction.说明) : null;
              
              return (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{name}</p>
                    {address && (
                      <p className="text-sm text-muted-foreground mt-1">
                        📍 {address}
                      </p>
                    )}
                    {description && address !== description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Separator />

        {/* 行程安排 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold">行程安排</h4>
          </div>
          <div className="space-y-4">
            {tripPlan.planDetails.itinerary.map((day, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  第{index + 1}天
                </div>
                <p className="flex-1 text-muted-foreground leading-relaxed pt-2">{day}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 住宿推荐 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold">住宿推荐</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed">{tripPlan.planDetails.accommodation}</p>
        </div>

        <Separator />

        {/* 旅行小贴士 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold">旅行小贴士</h4>
          </div>
          <ul className="space-y-2">
            {tripPlan.planDetails.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default TripPlanDocument;
