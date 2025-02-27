
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const pilots2025 = [
  "Alexander Albon",
  "Carlos Sainz",
  "Charles Leclerc",
  "Esteban Ocon",
  "Fernando Alonso",
  "George Russell",
  "Lance Stroll",
  "Lando Norris",
  "Lewis Hamilton",
  "Max Verstappen",
  "Oscar Piastri",
  "Pierre Gasly",
  "Sergio Perez",
  "Valtteri Bottas",
  "Yuki Tsunoda",
  "Zhou Guanyu"
];

const Dashboard = () => {
  const [rating, setRating] = useState(5);
  const [lowerThreshold, setLowerThreshold] = useState(5);
  const [upperThreshold, setUpperThreshold] = useState(7);
  const [badMessage, setBadMessage] = useState("the race sucks");
  const [okMessage, setOkMessage] = useState("the race is good enough");
  const [greatMessage, setGreatMessage] = useState("it's great");
  const [useDualSliders, setUseDualSliders] = useState(false);
  
  // New feature states
  const [safeForKids, setSafeForKids] = useState(false);
  const [dontWait, setDontWait] = useState(false);
  const [boringMomentsToSkip, setBoringMomentsToSkip] = useState(false);
  const [skipLevel, setSkipLevel] = useState("boring");
  const [selectedPilots, setSelectedPilots] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<string[]>([]);

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

  const handleLowerChange = (value: number) => {
    if (value < upperThreshold) {
      setLowerThreshold(value);
    }
  };

  const handleUpperChange = (value: number) => {
    if (value > lowerThreshold) {
      setUpperThreshold(value);
    }
  };

  const handlePilotToggle = (pilot: string) => {
    setSelectedPilots(prev => 
      prev.includes(pilot) 
        ? prev.filter(p => p !== pilot) 
        : [...prev, pilot]
    );
  };

  const handleCompetitionToggle = (competition: string) => {
    setCompetitions(prev => 
      prev.includes(competition) 
        ? prev.filter(c => c !== competition) 
        : [...prev, competition]
    );
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 mb-20">
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Rating Configuration</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dual-sliders"
                checked={useDualSliders}
                onCheckedChange={(checked) => setUseDualSliders(checked as boolean)}
              />
              <label
                htmlFor="dual-sliders"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use two sliders for fine-tuned control
              </label>
            </div>

            <div className="space-y-4">
              <Label>Rating Thresholds</Label>
              <div className="relative h-2 rounded-full"
                   style={{
                     background: `linear-gradient(to right, 
                       #ea384c 0%, 
                       #ea384c ${(lowerThreshold / 10) * 100}%, 
                       #F97316 ${(lowerThreshold / 10) * 100}%, 
                       #F97316 ${(upperThreshold / 10) * 100}%, 
                       #4ADE80 ${(upperThreshold / 10) * 100}%, 
                       #4ADE80 100%)`
                   }}>
                {useDualSliders ? (
                  <>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={lowerThreshold}
                      onChange={(e) => handleLowerChange(Number(e.target.value))}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:cursor-pointer"
                      style={{ zIndex: 2 }}
                    />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={upperThreshold}
                      onChange={(e) => handleUpperChange(Number(e.target.value))}
                      className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:cursor-pointer"
                      style={{ zIndex: 1 }}
                    />
                  </>
                ) : (
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={lowerThreshold}
                    onChange={(e) => handleLowerChange(Number(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:cursor-pointer"
                  />
                )}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <div>Lower: {lowerThreshold}</div>
                <div>Upper: {upperThreshold}</div>
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
        </div>

        <div className="border-t pt-6 space-y-6">
          <h2 className="text-xl font-semibold">Premium Features</h2>
          
          {/* Safe for Kids Feature */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Safe for Kids</h3>
              <Switch
                checked={safeForKids}
                onCheckedChange={setSafeForKids}
              />
            </div>
            <p className="text-sm text-gray-600">
              You will receive a message along with the rating if there is a major security concern.
            </p>
          </div>
          
          {/* Don't Wait Option */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Don't Wait Option</h3>
              <Switch
                checked={dontWait}
                onCheckedChange={setDontWait}
              />
            </div>
            <p className="text-sm text-gray-600">
              You will receive the notification shortly after the race. You will kind of spoil of existence of red flags.
            </p>
          </div>
          
          {/* Choose Other Competitions */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <h3 className="font-medium">Choose Other Competitions</h3>
            <p className="text-sm text-gray-600 mb-3">
              The system works for any competition. When available, you can opt in for motoGP or IndyCar.
            </p>
            <div className="flex flex-wrap gap-2">
              {["MotoGP", "IndyCar", "Formula E"].map(comp => (
                <div 
                  key={comp}
                  onClick={() => handleCompetitionToggle(comp)}
                  className={`px-3 py-1.5 text-sm rounded-full cursor-pointer border transition-colors ${
                    competitions.includes(comp) 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {comp}
                </div>
              ))}
            </div>
          </div>
          
          {/* Boring Moments to Skip */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Boring Moments to Skip</h3>
              <Switch
                checked={boringMomentsToSkip}
                onCheckedChange={setBoringMomentsToSkip}
              />
            </div>
            <p className="text-sm text-gray-600">
              If and only if the race is less than great, you will receive some parts you can skip. Typically between 15th and 45th lap.
            </p>
            {boringMomentsToSkip && (
              <div className="pt-2">
                <Select value={skipLevel} onValueChange={setSkipLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boring">Boring parts</SelectItem>
                    <SelectItem value="good">Good parts</SelectItem>
                    <SelectItem value="great">Great parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Fan Mode */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <h3 className="font-medium">Fan Mode</h3>
            <p className="text-sm text-gray-600 mb-3">
              If one of these pilots wins, the race is great by default. Never miss your favorite winning a race!
            </p>
            <div className="max-h-40 overflow-y-auto pr-2 flex flex-wrap gap-2">
              {pilots2025.map(pilot => (
                <div 
                  key={pilot}
                  onClick={() => handlePilotToggle(pilot)}
                  className={`px-3 py-1.5 text-sm rounded-full cursor-pointer border transition-colors ${
                    selectedPilots.includes(pilot) 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pilot}
                </div>
              ))}
            </div>
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
