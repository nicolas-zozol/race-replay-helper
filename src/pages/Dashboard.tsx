
import { Share, Flag, MessageSquare, Sliders, Crown, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define pilot type with nationality
interface Pilot {
  name: string;
  lastName: string;
  nationality: string;
}

const pilots2025: Pilot[] = [
  { name: "Alexander Albon", lastName: "Albon", nationality: "TH" },
  { name: "Carlos Sainz", lastName: "Sainz", nationality: "ES" },
  { name: "Charles Leclerc", lastName: "Leclerc", nationality: "MC" },
  { name: "Esteban Ocon", lastName: "Ocon", nationality: "FR" },
  { name: "Fernando Alonso", lastName: "Alonso", nationality: "ES" },
  { name: "George Russell", lastName: "Russell", nationality: "GB" },
  { name: "Lance Stroll", lastName: "Stroll", nationality: "CA" },
  { name: "Lando Norris", lastName: "Norris", nationality: "GB" },
  { name: "Lewis Hamilton", lastName: "Hamilton", nationality: "GB" },
  { name: "Max Verstappen", lastName: "Verstappen", nationality: "NL" },
  { name: "Oscar Piastri", lastName: "Piastri", nationality: "AU" },
  { name: "Pierre Gasly", lastName: "Gasly", nationality: "FR" },
  { name: "Sergio Perez", lastName: "Perez", nationality: "MX" },
  { name: "Valtteri Bottas", lastName: "Bottas", nationality: "FI" },
  { name: "Yuki Tsunoda", lastName: "Tsunoda", nationality: "JP" },
  { name: "Zhou Guanyu", lastName: "Zhou", nationality: "CN" }
];

// Sort pilots by last name
const sortedPilots = [...pilots2025].sort((a, b) => a.lastName.localeCompare(b.lastName));

const Dashboard = () => {
  const [rating, setRating] = useState(5);
  const [lowerThreshold, setLowerThreshold] = useState(5);
  const [upperThreshold, setUpperThreshold] = useState(7);
  const [badMessage, setBadMessage] = useState("the race sucks");
  const [okMessage, setOkMessage] = useState("the race is good enough");
  const [greatMessage, setGreatMessage] = useState("it's great");
  const [useDualSliders, setUseDualSliders] = useState(false);
  
  // Feature states
  const [safeForKids, setSafeForKids] = useState(false);
  const [dontWait, setDontWait] = useState(false);
  const [boringMomentsToSkip, setBoringMomentsToSkip] = useState(false);
  const [skipLevel, setSkipLevel] = useState("boring");
  const [selectedPilots, setSelectedPilots] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [haterModeEnabled, setHaterModeEnabled] = useState(false);
  const [haterModeLevel, setHaterModeLevel] = useState("good");
  
  // SMS & Telegram states
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");

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

  const handlePilotToggle = (pilotName: string) => {
    setSelectedPilots(prev => 
      prev.includes(pilotName) 
        ? prev.filter(p => p !== pilotName) 
        : [...prev, pilotName]
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
      <Tabs defaultValue="sms-telegram" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="sms-telegram" className="flex flex-col items-center gap-1 py-3">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">SMS & Telegram</span>
          </TabsTrigger>
          <TabsTrigger value="rating-settings" className="flex flex-col items-center gap-1 py-3">
            <Sliders className="h-4 w-4" />
            <span className="text-xs">Rating Settings</span>
          </TabsTrigger>
          <TabsTrigger value="season-pro" className="flex flex-col items-center gap-1 py-3">
            <Crown className="h-4 w-4" />
            <span className="text-xs">Season Pro</span>
          </TabsTrigger>
          <TabsTrigger value="race-history" className="flex flex-col items-center gap-1 py-3">
            <History className="h-4 w-4" />
            <span className="text-xs">Race History</span>
          </TabsTrigger>
        </TabsList>

        {/* SMS & Telegram Tab */}
        <TabsContent value="sms-telegram" className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <p className="text-sm text-gray-600">
              Configure how you receive notifications about races.
            </p>
            
            <div className="space-y-6">
              {/* SMS Notifications */}
              <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">SMS Notifications</h3>
                  <Switch
                    checked={smsEnabled}
                    onCheckedChange={setSmsEnabled}
                  />
                </div>
                <p className="text-sm text-gray-600">Receive race updates via SMS</p>
                
                {smsEnabled && (
                  <div className="pt-3">
                    <Label htmlFor="phone-number" className="text-sm font-medium mb-1.5 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone-number"
                      placeholder="+1 234 567 8901"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Enter your number with country code
                    </p>
                  </div>
                )}
              </div>
              
              {/* Telegram Notifications */}
              <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Telegram Notifications</h3>
                  <Switch
                    checked={telegramEnabled}
                    onCheckedChange={setTelegramEnabled}
                  />
                </div>
                <p className="text-sm text-gray-600">Receive race updates via Telegram</p>
                
                {telegramEnabled && (
                  <div className="pt-3">
                    <Label htmlFor="telegram-handle" className="text-sm font-medium mb-1.5 block">
                      Telegram Username
                    </Label>
                    <Input
                      id="telegram-handle"
                      placeholder="@yourusername"
                      value={telegramHandle}
                      onChange={(e) => setTelegramHandle(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Enter your Telegram username without @
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Rating Settings Tab */}
        <TabsContent value="rating-settings" className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
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
        </TabsContent>

        {/* Season Pro Tab */}
        <TabsContent value="season-pro" className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold">Season Pro Features</h2>
            <p className="text-sm text-gray-600 mb-4">
              Premium features available with your Season Pro subscription.
            </p>
            
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
                {sortedPilots.map(pilot => (
                  <div 
                    key={pilot.name}
                    onClick={() => handlePilotToggle(pilot.name)}
                    className={`px-3 py-1.5 text-sm rounded-full cursor-pointer border transition-colors flex items-center gap-1.5 ${
                      selectedPilots.includes(pilot.name) 
                        ? "bg-primary text-white border-primary" 
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs">{pilot.nationality}</span>
                    <Flag className="w-3.5 h-3.5" />
                    {pilot.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hater Mode */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Hater Mode</h3>
                <Switch
                  checked={haterModeEnabled}
                  onCheckedChange={setHaterModeEnabled}
                />
              </div>
              <p className="text-sm text-gray-600">
                If none of these drivers win, consider the race as at least Good/Great.
              </p>
              {haterModeEnabled && (
                <div className="pt-2">
                  <Select value={haterModeLevel} onValueChange={setHaterModeLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select rating level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="great">Great</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Race History Tab */}
        <TabsContent value="race-history" className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Race History</h2>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {["Miami Grand Prix", "Monaco Grand Prix", "Spanish Grand Prix"][index]}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      [7, 9, 4][index] > upperThreshold 
                        ? "bg-green-100 text-green-800" 
                        : [7, 9, 4][index] > lowerThreshold 
                          ? "bg-orange-100 text-orange-800" 
                          : "bg-red-100 text-red-800"
                    }`}>
                      Rating: {[7, 9, 4][index]}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {["Great race with exciting battles throughout.", "An instant classic with multiple lead changes!", "A bit dull, mostly processional."][index]}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                    <span>Date: {["May 7, 2023", "May 28, 2023", "June 4, 2023"][index]}</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
