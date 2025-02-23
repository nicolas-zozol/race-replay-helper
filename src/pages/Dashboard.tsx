import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const activities = [
  { name: "Walk for 15mins", count: 3, color: "#FFB84C" },
  { name: "Read 20 pages", count: 1, color: "#F97316" },
  { name: "Take a deep breath", count: 1, color: "#D946EF" },
  { name: "Write one sentence", count: 2, color: "#38BDF8" },
  { name: "Take a deep breath", count: 2, color: "#4ADE80" },
];

const totalCount = activities.reduce((sum, activity) => sum + activity.count, 0);

const Dashboard = () => {
  const [rating, setRating] = useState(5);
  const [lowerThreshold, setLowerThreshold] = useState(5);
  const [upperThreshold, setUpperThreshold] = useState(7);
  const [badMessage, setBadMessage] = useState("the race sucks");
  const [okMessage, setOkMessage] = useState("the race is good enough");
  const [greatMessage, setGreatMessage] = useState("it's great");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    let message = "";
    let variant: "default" | "destructive" = "default";

    if (newRating < lowerThreshold) {
      message = badMessage;
      variant = "destructive";
    } else if (newRating <= upperThreshold) {
      message = okMessage;
    } else {
      message = greatMessage;
    }

    toast({
      title: "Race Rating",
      description: message,
      variant: variant,
    });
  };

  const getRatingColor = (value: number) => {
    if (value < lowerThreshold) return "#ea384c";
    if (value <= upperThreshold) return "#F97316";
    return "#4ADE80";
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Rating Configuration</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label>Lower Threshold</Label>
              <Input 
                type="number" 
                min="1" 
                max="10"
                value={lowerThreshold}
                onChange={(e) => setLowerThreshold(Number(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <Label>Upper Threshold</Label>
              <Input 
                type="number" 
                min="1" 
                max="10"
                value={upperThreshold}
                onChange={(e) => setUpperThreshold(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Message for rating below {lowerThreshold}</Label>
              <Input 
                value={badMessage}
                onChange={(e) => setBadMessage(e.target.value)}
              />
            </div>
            <div>
              <Label>Message for rating between {lowerThreshold} and {upperThreshold}</Label>
              <Input 
                value={okMessage}
                onChange={(e) => setOkMessage(e.target.value)}
              />
            </div>
            <div>
              <Label>Message for rating above {upperThreshold}</Label>
              <Input 
                value={greatMessage}
                onChange={(e) => setGreatMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Current Rating: <span style={{ color: getRatingColor(rating) }} className="text-2xl font-bold">{rating}</span></Label>
            <div className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const newRating = Math.round((x / rect.width) * 9) + 1;
                   handleRatingChange(Math.min(Math.max(newRating, 1), 10));
                 }}>
              <div
                className="absolute inset-0 rounded-full transition-all duration-200"
                style={{
                  width: `${(rating / 10) * 100}%`,
                  backgroundColor: getRatingColor(rating),
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{totalCount}</h1>
              <p className="text-xl leading-relaxed text-gray-800">
                I've cast <span className="border-b border-gray-400">{totalCount} votes</span> towards<br />
                becoming a better me.
              </p>
            </div>
            <Button variant="secondary" className="rounded-full px-4 py-2 bg-gray-100">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="flex w-full h-12 rounded-lg overflow-hidden mb-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: activity.color,
                  width: `${(activity.count / totalCount) * 100}%`,
                }}
                className="flex items-center justify-center text-white font-medium"
              >
                {activity.count}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span className="text-gray-800">{activity.name}</span>
                </div>
                <span className="font-medium">{activity.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around px-12">
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"/>
          </svg>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-900">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2h4v3c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-3h4c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM6 13V9h12v4H6z"/>
          </svg>
          <span className="text-xs">Progress</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H5V4h14v16z"/>
            <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
          </svg>
          <span className="text-xs">Mindset</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">1</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
